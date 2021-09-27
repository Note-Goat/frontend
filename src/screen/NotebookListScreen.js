import {useContext} from "react";
import {useHistory} from "react-router-dom";
import Container from "../component/Container";
import Context from "../Context";
import {useAuth} from "../hook/auth";
import {DataGrid} from "@mui/x-data-grid";
import NoteIcon from "@material-ui/icons/Book";
import Button from "../component/Button";

export default function NotebookListScreen() {
  const { notebooks } = useContext(Context);
  const history = useHistory();

  useAuth();

  const onClickNewNotebook = () => {
    history.push("/new-notebook");
  };

  if (!notebooks) {
    return <div />
  }

  return (
    <Container title="My Notebooks">
      <div className="inner-container">
        <div style={{paddingBottom: 10}}>
          <Button
            icon={<NoteIcon />}
            title="Start New Notebook"
            onClick={onClickNewNotebook}
            color="primary"
          />
        </div>
        <DataGrid
          columns={[{
            field: "name",
            headerName: "Name",
            width: 750,
          }, {
            field: "created",
            headerName: "Created",
            width: 350,
            valueGetter: (data) => new Date(data.row.created).toDateString(),
            sortComparator: (v1, v2, param1, param2) =>
              new Date(param1.api.getCellValue(param1.id, 'created')) -
              new Date(param2.api.getCellValue(param2.id, 'created')),
          }]}
          rows={notebooks}
          getRowId={(row) => row.uuid}
          onCellClick={(data) => {
            history.push(`/notebook/${data.row.uuid}`)
          }}
          style={{height: 640, cursor: "pointer"}}
        />
      </div>
    </Container>
  )
}
