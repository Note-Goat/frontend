import {xhrDelete, xhrGet, xhrPost, xhrPut} from "../util/xhr";
import {useContext, useEffect, useState} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import NoteIcon from '@material-ui/icons/NoteAdd';
import {Link, useHistory, useParams} from "react-router-dom";
import {AppBar, Box, Tab, Tabs, Typography} from "@material-ui/core";
import EditorState from "draft-js/lib/EditorState";
import {convertToRaw} from "draft-js";
import { DataGrid } from '@mui/x-data-grid';
import Context from "../Context";
import Container from "../component/Container";
import {aesGcmDecrypt, aesGcmEncrypt} from "../util/crypto";
import Button from "../component/Button";
import {useAuth} from "../hook/auth";
import TextInput from "../component/TextInput";
import SaveIcon from "@material-ui/icons/Save";
import {getNoteName} from "../util/notebook";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function NotebookScreen() {
  const { notebookUuid } = useParams();
  const history = useHistory();
  const [notebookNotes, setNotebookNotes] = useState([]);
  const [tab, setTab] = useState(0);
  const [notebook, setNotebook] = useState({ name: "" });
  const [newNotebookName, setNewNotebookName] = useState("");
  const {
    notebooks,
    setNotebooks,
    notes,
    setNotes,
  } = useContext(Context);

  const { accessToken } = useAuth();

  const loadNotebook = async () => {
    const data = await xhrGet(`notebook/${notebookUuid}`, accessToken);
    notebooks.push(data);
    setNotebook(data);
    await reloadNotes();
  };

  useAuth();

  useEffect(() => {
    (async function() {
      const found = notebooks.find((n) => n.uuid === notebookUuid);
      if (!found) {
        await loadNotebook();
        return;
      }
      setNotebook(found);
      await reloadNotes();
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reloadNotes = async () => {
    if (notes[notebookUuid]) {
      setNotebookNotes(notes[notebookUuid]);
      return;
    }
    const data = await xhrGet(`notebook/${notebookUuid}/note`, accessToken);
    if (!data.notes) {
      return;
    }
    const decryptedData = [];
    const noteCount = data.notes.length;
    for (let i = 0; i < noteCount; i++) {
      const row = data.notes[i];
      try {
        const decrypted = await aesGcmDecrypt(row.message);
        decryptedData.push({
          ...row,
          message: decrypted,
        });
      } catch (e) {
        decryptedData.push({
          ...row,
          message: "(error decrypting note)",
          decryptionError: true,
        });
      }
    }
    notes[notebookUuid] = decryptedData;
    setNotebookNotes(decryptedData);
  };

  const onClickNewNote = async () => {
    const editorState = EditorState.createWithText("");
    const message = await aesGcmEncrypt(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    const response = await xhrPost(
      `notebook/${notebook.uuid}/note`, {
        message,
      }, accessToken);
    const data = await response.json();
    const updatedNotes = {...notes};
    data.message = await aesGcmDecrypt(message);
    updatedNotes[notebook.uuid] = [data, ...updatedNotes[notebook.uuid]];
    setNotes(updatedNotes);
    history.push(`/notebook/${notebook.uuid}/note/${data.uuid}`);
  };

  const onClickArchiveNotebook = async () => {
    const response = await xhrDelete(`notebook/${notebookUuid}`, accessToken);
    if (response.status === 200) {
      const updatedNotebooks = [...notebooks.filter((n) => n.uuid !== notebookUuid)];
      setNotebooks(updatedNotebooks);
      history.push("/notebook");
    }
  };

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const onClickRename = async () => {
    const response = await xhrPut(`notebook/${notebookUuid}`, {
      name: newNotebookName,
    }, accessToken);

    if (response.status === 200) {
      const notebook = notebooks.find((n) => n.uuid === notebookUuid);
      notebook.name = newNotebookName;
      history.push(`/notebook/${notebookUuid}`);
    }
  };

  return (
    <Container title={`Notebook: ${notebook.name}`}>
      <div style={{flexDirection: "row", width: "100%"}}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={tab}
            onChange={handleChange}
            aria-label={`All notes for notebook: ${notebook.name}`}
            indicatorColor="secondary"
            textColor="inherit"
          >
            <Tab label="Notes" />
            <Tab label="Rename Notebook" />
            <Tab label="Archive" />
          </Tabs>
        </AppBar>
        <TabPanel value={tab} index={0} padding={0}>
          <div style={{paddingBottom: 20}}>
            <Button
              icon={<NoteIcon />}
              title="Start New Note"
              onClick={onClickNewNote}
              color="primary"
            />
          </div>
          <DataGrid
            rows={notebookNotes}
            columns={[{
              field: "name",
              headerName: "Name",
              width: 550,
              valueGetter: (data) => data.row.decryptionError ? "(error decrypting message)" : getNoteName(data.row.message)
            }, {
              field: "created",
              headerName: "Created",
              width: 350,
              valueGetter: (data) => new Date(data.row.created).toDateString(),
              sortComparator: (v1, v2, param1, param2) =>
                new Date(param1.api.getCellValue(param1.id, 'created')) -
                new Date(param2.api.getCellValue(param2.id, 'created')),
            }]}
            getRowId={(row) => row.uuid}
            onCellClick={(data) => {
              history.push(`/notebook/${notebookUuid}/note/${data.row.uuid}`)
            }}
            style={{height: 540, cursor: "pointer"}}
            />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <TextInput
            label="Notebook Name"
            value={newNotebookName}
            onChange={(event) => setNewNotebookName(event.target.value)}
          />
          <Button
            title="Rename Notebook"
            onClick={onClickRename}
            color="primary"
            icon={<SaveIcon />}
          />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <p>Warning: this cannot be undone!</p>
          <Button
            icon={<DeleteIcon />}
            title="Archive Notebook"
            onClick={onClickArchiveNotebook}
            color="secondary"
          />
        </TabPanel>
      </div>
    </Container>
  );
}
