import renderer from 'react-test-renderer';
import Container from "./Container";
import {BrowserRouter} from "react-router-dom";

it('Container component snapshot', () => {
  const tree = renderer
    .create(<BrowserRouter><Container /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Container without navigation component snapshot', () => {
  const tree = renderer
    .create(<BrowserRouter><Container showNavigation={false} /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Container with title component snapshot', () => {
  const tree = renderer
    .create(<BrowserRouter><Container title="This is a title" /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
