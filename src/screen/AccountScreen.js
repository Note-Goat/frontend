import Container from "../component/Container";
import {Link} from "react-router-dom";
import {useAuth} from "../hook/auth";

export default function AccountScreen() {

  useAuth();

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
