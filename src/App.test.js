import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main app', () => {
  render(<App />);
  const linkElement = screen.getByText(/get the goat/i);
  expect(linkElement).toBeInTheDocument();
});
