import Header from "./Header";
import {useContext} from "react";
import Context from "../Context";
import AuthedNav from "../app/nav/AuthedNav";
import UnAuthedNav from "../app/nav/UnAuthedNav";
import Footer from "./Footer";

export default function Container({ showNavigation, title, children }) {
  const { loggedIn } = useContext(Context);

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
