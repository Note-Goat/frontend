import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Book from '@material-ui/icons/Book';
import Container from "../component/Container";
import Button from "../component/Button";
import TextInput from "../component/TextInput";
import Context from "../Context";
import {xhrPost} from "../util/xhr";
import {useAuth} from "../hook/auth";

export default function NewNotebookScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameIsEmptyError, setNameIsEmptyError] = useState(false);
  const { notebooks, setNotebooks, accessToken } = useContext(Context);
  const history = useHistory();

  useAuth();

  const onClick = async () => {
    if (!name) {
      setNameIsEmptyError(true);
      return;
    }
    setNameIsEmptyError(false);
    const response = await xhrPost(`notebook`, {
      name,
      description,
    }, accessToken);
    const data = await response.json();
    const newNotebooks = [...notebooks];
    newNotebooks.unshift(data);
    setNotebooks(newNotebooks);
    history.push(`/notebook/${data.uuid}`);
  };

  useEffect(() => {
    if (name && nameIsEmptyError) {
      setNameIsEmptyError(false);
    }
  }, [name]);

  return (
    <Container title="New Notebook">
      <div className="new-notebook">
        <TextInput
          label="Notebook Name"
          onChange={(event) => setName(event.target.value)}
          value={name}
          required={true}
          error={nameIsEmptyError}
          helperText={nameIsEmptyError ? "Cannot be empty" : ""}
        />
        <TextInput
          label="Description"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <Button
          title="Create New Notebook"
          onClick={onClick}
          color="primary"
          icon={<Book />}
        />
      </div>
    </Container>
  )
}
