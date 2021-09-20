import Container from "../component/Container";
import {Link} from "react-router-dom";
import {useContext} from "react";
import Context from "../Context";
import useAuthHook from "../hook/useAuthHook";

export default function AccountScreen() {
  const { appLoaded, loggedIn } = useContext(Context);

  useAuthHook(appLoaded, loggedIn);
  return (
    <Container title="My Account">
      <div className="account">
        <p>
          <Link to="/account/key">View/Update Cryptographic Key</Link>
        </p>
        <p>
          <Link to="/account/password-reset">Reset Password</Link>
        </p>
        <p>
          <Link to="/logout">Logout</Link>
        </p>
      </div>
    </Container>
  );
}
