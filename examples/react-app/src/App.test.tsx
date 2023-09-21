import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders vscode buttons', () => {
  render(<App />);
  expect(screen.getByText('Primary button')).toBeInTheDocument();
  expect(screen.getByText('Secondary button')).toBeInTheDocument();
});
