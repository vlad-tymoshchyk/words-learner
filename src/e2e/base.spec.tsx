import '../matchMediaMock';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { App } from '../App';

describe('Save string', () => {
  it('test', async () => {
    render(<App />);

    const input = screen.getByTestId<HTMLInputElement>('input');
    const button = screen.getByTestId('submit-button');

    const inputText = 'test-input';
    await userEvent.type(input, inputText);
    await userEvent.click(button);
    await waitFor(() => {
      expect(screen.getAllByTestId('result')).toHaveLength(1);
    });
    // expect(screen.getByTestId('result').textContent).toBe(
    //   `Result here: ${inputText}`
    // );
  });
});
