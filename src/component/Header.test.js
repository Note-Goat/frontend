import renderer from 'react-test-renderer';
import Header from "./Header";
import AppContainer from "../test/AppContainer";

test('Header component snapshot', () => {
  const tree = renderer
    .create(<AppContainer><Header /></AppContainer>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
