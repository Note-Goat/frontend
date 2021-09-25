import Header from "./Header";
import Footer from "./Footer";
import LockIcon from "@material-ui/icons/Lock";
import DevicesIcon from "@material-ui/icons/Devices";
import NotesIcon from "@material-ui/icons/Notes";

export default function Container({ showSplash, title, children }) {
  return (
    <div className="App">
      <div className="header">
        <Header title={title} />
        <h1 className="header">{title}</h1>
      </div>
      { showSplash && (
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
      )}
      <div className="container">
        <div className="main">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
