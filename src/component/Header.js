import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {useState, Fragment} from "react";
import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';
import {useAuth} from "../hook/auth";
import {useHistory} from "react-router-dom";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { loggedIn } = useAuth();
  const history = useHistory();

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setShowMenu(!showMenu);
  };

  const unAuthList = () => (
    <List>
      <ListItem button key="Home" onClick={() => history.push("/")}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button key="Signup" onClick={() => history.push("/signup")}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Signup" />
      </ListItem>
      <ListItem button key="Login" onClick={() => history.push("/login")}>
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
    </List>
  );

  const authList = () => (
    <List>
      <ListItem button key="Notebooks" onClick={() => history.push("/notebook")}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Notebooks" />
      </ListItem>
      <ListItem button key="Account" onClick={() => history.push("/account")}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
    </List>
  );

  return (
    <div className="header-button">
      <Fragment key="left">
        <Button onClick={toggleDrawer}>
          <MenuIcon />
        </Button>
        <Drawer
          anchor={"left"}
          open={showMenu}
          onClose={toggleDrawer}
        >
          <Box
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            {loggedIn ? authList() : unAuthList()}
          </Box>
        </Drawer>
      </Fragment>
    </div>
  );
}
