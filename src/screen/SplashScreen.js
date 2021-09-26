import Container from "../component/Container";
import LockIcon from '@material-ui/icons/Lock';
import DevicesIcon from '@material-ui/icons/Devices';
import NotesIcon from '@material-ui/icons/Notes';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import {Button} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";

export default function SplashScreen() {
  const history = useHistory();

  const onClickGetGoat = () => {
    history.push("/signup");
  };

  return (
    <Container showSplash={true} title="Note Goat: Home" style={{flex: 1}}>
      <div style={{width: "100%", textAlign: "center"}}>
        <p>
          <Button
            variant="outlined"
            size="large"
            style={{ margin: 40 }}
            onClick={onClickGetGoat}
          >
            <EmojiEventsIcon fontSize="large" />
            Get the Goat
          </Button>
        </p>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </Container>
  );
}
