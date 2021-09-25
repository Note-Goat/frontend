import {useContext} from "react";
import {Link} from "react-router-dom";
import Container from "../component/Container";
import Context from "../Context";
import {useAuth} from "../hook/auth";

export default function NotebookListScreen() {
  const { notebooks } = useContext(Context);

  useAuth();

  if (!notebooks) {
    return <div />
  }

  return (
    <Container title="My Notebooks">
      <div className="inner-container">
        { notebooks.map((notebook) => (
          <div key={notebook.uuid} className="row">
            <Link to={`/notebook/${notebook.uuid}`}>
              <p>{notebook.name}</p>
              <p className="created">{new Date(notebook.created).toDateString()}</p>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  )
}
