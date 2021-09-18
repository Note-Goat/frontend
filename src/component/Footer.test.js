import renderer from 'react-test-renderer';
import Footer from "./Footer";
import {BrowserRouter} from "react-router-dom";

test('Footer component snapshot', () => {
  const tree = renderer
    .create(<BrowserRouter><Footer /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
