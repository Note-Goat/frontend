import {xhrDelete, xhrGet, xhrPost} from "../util/xhr";
import {useContext, useEffect, useState} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/NoteAdd';
import {Link, useHistory, useParams} from "react-router-dom";
import Context from "../Context";
import Container from "../component/Container";
import {aesGcmDecrypt, aesGcmEncrypt} from "../util/crypto";
import Button from "../component/Button";
import EditorState from "draft-js/lib/EditorState";
import {convertToRaw} from "draft-js";
import {getNoteName} from "../util/notebook";

export default function NotebookScreen() {
  const { notebookUuid } = useParams();
  const history = useHistory();
  const [notebookNotes, setNotebookNotes] = useState([]);
  const [notebook, setNotebook] = useState({ name: "" });
  const { notebooks, setNotebooks, notes, setNotes, accessToken } = useContext(Context);

  console.log("notebook screen");

  const loadNotebook = async () => {
    const data = await xhrGet(`notebook/${notebookUuid}`, accessToken);
    notebooks.push(data);
    setNotebook(data);
    await reloadNotes();
  };

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
    updatedNotes[notebook.uuid].unshift(data);
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

  const onClickRenameNotebook = () => {
    history.push(`/notebook/${notebookUuid}/rename`);
  };

  return (
    <Container title={`Notebook: ${notebook.name}`}>
      <div style={{flexDirection: "row"}}>
        <Button
          icon={<NoteIcon />}
          title="Start New Note"
          onClick={onClickNewNote}
          color="primary"
        />
        <Button
          icon={<CreateIcon />}
          title="Rename Notebook"
          onClick={onClickRenameNotebook}
          color="primary"
          />
        <Button
          icon={<DeleteIcon />}
          title="Archive Notebook"
          onClick={onClickArchiveNotebook}
          color="secondary"
        />
      </div>
      {notebookNotes.map((note) => (
        <div key={note.uuid} className="row">
          <Link to={`/notebook/${notebookUuid}/note/${note.uuid}`}>
            <p>{note.decryptionError ? note.message : getNoteName(note.message)}</p>
            <p className="created">{new Date(note.created).toDateString()}</p>
          </Link>
        </div>
      ))}
    </Container>
  );
}
