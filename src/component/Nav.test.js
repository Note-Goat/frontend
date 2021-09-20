import renderer from 'react-test-renderer';
import Nav from "./Nav";
import AppContainer from "../test/AppContainer";

test('Nav component snapshot', () => {
  const tree = renderer
    .create(<AppContainer><Nav /></AppContainer>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
