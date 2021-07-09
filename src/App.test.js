import { render, screen } from '@testing-library/react';
import App from './App';

test('renders button', () => {
  render(<App />);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});


test('renders logo', () => {
  render(<App />);
  const logo = screen.getByRole('img');
  expect(logo).toBeInTheDocument();
});

test('renders input', () => {
  render(<App />);
  const inputs = document.querySelectorAll("input[type=text]");
  expect(inputs).toHaveLength(3);
});

test('renders radio group', () => {
  render(<App />);
  const radios = screen.getAllByRole('radio');
  expect(radios).toHaveLength(3);
});

test('renders TipText', () => {
  render(<App />);
  const tipText = screen.getByText('Wprowadź dane pacjenta');
  expect(tipText).toBeInTheDocument();
});