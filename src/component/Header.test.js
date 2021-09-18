import renderer from 'react-test-renderer';
import Header from "./Header";

test('Header component snapshot', () => {
  const tree = renderer
    .create(<Header />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
