import renderer from 'react-test-renderer';
import HeaderButton from "./HeaderButton";
import AppContainer from "../test/AppContainer";

test('HeaderButton component snapshot', () => {
  const tree = renderer
    .create(<AppContainer><HeaderButton /></AppContainer>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
