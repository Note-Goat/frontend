import renderer from 'react-test-renderer';
import Footer from "./Footer";
import AppContainer from "../test/AppContainer";

test('Footer component snapshot', () => {
  const tree = renderer
    .create(<AppContainer><Footer /></AppContainer>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
