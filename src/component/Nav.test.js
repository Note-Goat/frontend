import renderer from 'react-test-renderer';
import Nav from "./Nav";
import {BrowserRouter} from "react-router-dom";

test('Nav component snapshot', () => {
  const tree = renderer
    .create(<BrowserRouter><Nav /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
