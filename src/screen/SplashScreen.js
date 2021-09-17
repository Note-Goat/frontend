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
    <Container showNavigation={false} title="Note Goat: Home" style={{flex: 1}}>
      <div className="splash">
        <div className="splash-item">
          <div>
            <LockIcon fontSize="large" />
          </div>
          <p>Serious about security</p>
          <p>E2E encryption</p>
          <p>Own your data</p>
        </div>
        <div className="splash-item">
          <div>
            <DevicesIcon fontSize="large" />
          </div>
          <p>A pretty good UX</p>
          <p>Optimized for all devices</p>
          <p>Fast and responsive</p>
        </div>
        <div className="splash-item">
          <div>
            <NotesIcon fontSize="large" />
          </div>
          <p>Helpful features</p>
          <p>Keep lists in notes</p>
          <p>Organize notes with tags</p>
        </div>
      </div>
      <div style={{width: "100%", textAlign: "center"}}>
        <p>
          <Button
            variant="outlined"
            color="secondary"
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
