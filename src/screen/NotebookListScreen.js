import {useContext} from "react";
import NotebookIcon from '@material-ui/icons/Book';
import {Link, useHistory} from "react-router-dom";
import Container from "../component/Container";
import Context from "../Context";
import Button from "../component/Button";
import useAuthHook from "../hook/useAuthHook";

export default function NotebookListScreen() {
  const { notebooks, appLoaded, loggedIn } = useContext(Context);
  const history = useHistory();

  useAuthHook(appLoaded, loggedIn);

  if (!notebooks) {
    return <div />
  }

  return (
    <Container title="My Notebooks">
      <Button
        icon={<NotebookIcon />}
        title="New Notebook"
        onClick={() => history.push("/new-notebook")}
        color="primary"
      />
      { notebooks.map((notebook) => (
        <div key={notebook.uuid} className="row">
          <Link to={`/notebook/${notebook.uuid}`}>
            <p>{notebook.name}</p>
            <p className="created">{new Date(notebook.created).toDateString()}</p>
          </Link>
        </div>
      ))}
    </Container>
  )
}
