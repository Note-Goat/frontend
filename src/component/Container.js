import Header from "./Header";
import Footer from "./Footer";

export default function Container({ showNavigation, title, children }) {
  return (
    <div className="App">
      <div className="header">
        <Header title={title} />
        <h1 className="header">{title}</h1>
      </div>
      <div className="container">
        <div className="right-column" style={{width: showNavigation ? "80%" : "100%"}}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
