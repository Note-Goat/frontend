import Container from "../component/Container";
import Editor from '@draft-js-plugins/editor';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import createAutoListPlugin from 'draft-js-autolist-plugin';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  RichUtils,
  getDefaultKeyBinding,
} from 'draft-js';
import {useHistory, useParams} from "react-router-dom";
import {
  createRef,
  useContext,
  useEffect,
  useState,
} from "react";
import Context from "../Context";
import {xhrDelete, xhrGet, xhrPut} from "../util/xhr";
import {aesGcmDecrypt, aesGcmEncrypt} from "../util/crypto";
import 'draft-js/dist/Draft.css';
import Button from "../component/Button";
import {getNoteName} from "../util/notebook";
import useAuthHook from "../hook/useAuthHook";

let saveTimeout = null;
const listPlugin = createAutoListPlugin();
const plugins = [
  listPlugin,
];

const HEADING = 'header-one';

export default function NoteScreen() {
  const { noteUuid, notebookUuid } = useParams();
  const [isReady, setIsReady] = useState(false);
  const [editorState, setEditorState] = useState();
  const [decryptionError, setDecryptionError] = useState(false);
  const { notes, setNotes, accessToken, appLoaded, loggedIn } = useContext(Context);
  const editorRef = createRef();
  const history = useHistory();

  useAuthHook(appLoaded, loggedIn);

  const getEditorExport = (editorState) => JSON.stringify(convertToRaw(editorState.getCurrentContent()));
  const getEditorImport = (raw) => convertFromRaw(JSON.parse(raw))

  const updateNote = (editorState) => async () => {
    clearTimeout(saveTimeout);
    if (decryptionError) {
      return;
    }
    const raw = getEditorExport(editorState);
    const message = await aesGcmEncrypt(raw);
    await xhrPut(`note/${noteUuid}`, {
      message,
    }, accessToken);
  };

  const onEditorStateChange = (newState) => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(updateNote(newState), 3000);
    const currentContent = editorState.getCurrentContent();
    const firstBlockKey = currentContent.getBlockMap().first().getKey();
    const currentBlockKey = editorState.getSelection().getAnchorKey();
    const isFirstBlock = (currentBlockKey === firstBlockKey);
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);
    const isHeading = currentBlockType === HEADING;
    if (isFirstBlock !== isHeading) {
      setEditorState(RichUtils.toggleBlockType(editorState, HEADING));
      return;
    }
    setEditorState(newState);
  };

  const handleKeyBindings = (e) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 6);
      if (newEditorState !== editorState) {
        onEditorStateChange(newEditorState);
      }

      return
    }

    return getDefaultKeyBinding(e)
  }

  useEffect(() => {
    (async function() {
      const note = notes[notebookUuid] ? notes[notebookUuid].find((n) => n.uuid === noteUuid) : null;
      if (!note) {
        const data = await xhrGet(`note/${noteUuid}`, accessToken);
        try {
          const message = getEditorImport(await aesGcmDecrypt(data.message));
          setEditorState(EditorState.createWithContent(message));
          setIsReady(true);
        } catch (e) {
          setDecryptionError(true);
          setIsReady(true);
        }
        return;
      }
      if (note.decryptionError) {
        setDecryptionError(true);
        setIsReady(true);
        return;
      }
      setEditorState(EditorState.createWithContent(getEditorImport(note.message)));
      setIsReady(true);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!editorState || !notes[notebookUuid]) {
      return;
    }
    const updatedNotes = { ...notes };
    for (let i = 0; i < notes[notebookUuid].length; i++) {
      if (notes[notebookUuid][i].uuid === noteUuid) {
        updatedNotes[notebookUuid][i].message = getEditorExport(editorState);
        setNotes(updatedNotes);
        break;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef]);

  const onClickBack = () => {
    history.goBack();
  };

  const onClickDelete = async () => {
    const response = await xhrDelete(`note/${noteUuid}`, accessToken);
    if (response.status === 200) {
      const updatedNotes = { ...notes };
      updatedNotes[notebookUuid] = updatedNotes[notebookUuid].filter((note) => note.uuid !== noteUuid);
      setNotes(updatedNotes);
      history.goBack();
    }
  };

  if (!isReady) {
    return (
      <div />
    );
  }

  return (
    <Container title={`Note: ${decryptionError ? "error" : getNoteName(getEditorExport(editorState))}`}>
      <div style={{flexDirection: "row"}}>
        <Button
          title="Back"
          icon={<ArrowBack />}
          onClick={onClickBack}
          color="primary"
        />
        <Button
          title="Archive"
          icon={<DeleteIcon />}
          onClick={onClickDelete}
          color="secondary"
        />
      </div>
      <div className="editor">
        { decryptionError ? (
          <div>
            Error decrypting note!
          </div>
        ) : (
          <Editor
            editorState={editorState}
            onChange={onEditorStateChange}
            onTab={handleKeyBindings}
            ref={editorRef}
            plugins={plugins}
          />
        )}
      </div>
    </Container>
  );
}
