import renderer from 'react-test-renderer';
import Container from "./Container";
import {BrowserRouter} from "react-router-dom";
import AppContainer from "../test/AppContainer";

it('Container component snapshot', () => {
  const tree = renderer
    .create(<AppContainer><Container /></AppContainer>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Container without navigation component snapshot', () => {
  const tree = renderer
    .create(<AppContainer><Container showNavigation={false} /></AppContainer>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Container with title component snapshot', () => {
  const tree = renderer
    .create(<AppContainer><Container title="This is a title" /></AppContainer>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
