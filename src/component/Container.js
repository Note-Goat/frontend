import Header from "./Header";
import AuthedNav from "../app/nav/AuthedNav";
import UnAuthedNav from "../app/nav/UnAuthedNav";
import Footer from "./Footer";
import {useAuth} from "../hook/auth";

export default function Container({ showNavigation, title, children }) {
  const { loggedIn } = useAuth();

  return (
    <div className="App">
      <Header title={title} />
      <div className="container">
        {(showNavigation || showNavigation === undefined) && (
          <div className="left-column">
            { loggedIn ? <AuthedNav /> : <UnAuthedNav /> }
          </div>
        )}
        <div className="right-column" style={{width: showNavigation ? "80%" : "100%"}}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
