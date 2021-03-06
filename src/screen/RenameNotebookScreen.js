import {useHistory, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import SaveIcon from '@material-ui/icons/Save';
import Container from "../component/Container";
import Context from "../Context";
import TextInput from "../component/TextInput";
import Button from "../component/Button";
import {xhrPut} from "../util/xhr";
import {useAuth} from "../hook/auth";

export default function RenameNotebookScreen() {
  const { notebookUuid } = useParams();
  const [notebookName, setNotebookName] = useState("");
  const history = useHistory();
  const { notebooks } = useContext(Context);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async function () {
      const found = notebooks.find((n) => n.uuid === notebookUuid);
      if (found) {
        setNotebookName(found.name);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickRename = async () => {
    const response = await xhrPut(`notebook/${notebookUuid}`, {
      name: notebookName,
    }, accessToken);

    if (response.status === 200) {
      const notebook = notebooks.find((n) => n.uuid === notebookUuid);
      notebook.name = notebookName;
      history.push(`/notebook/${notebookUuid}`);
    }
  };

  return (
    <Container title="Rename Notebook">
      <TextInput
        label="Notebook Name"
        value={notebookName}
        onChange={(event) => setNotebookName(event.target.value)}
      />
      <Button
        title="Rename Notebook"
        onClick={onClickRename}
        color="primary"
        icon={<SaveIcon />}
      />
    </Container>
  );
}
