import * as React from 'react';

import { cleanup, fireEvent, render, screen, setup } from '@/lib/test-utils';

import { Input } from './input';

afterEach(cleanup);

describe('input component ', () => {
  it('renders correctly ', () => {
    render(<Input testID="input" />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('should render the placeholder correctly ', () => {
    render(<Input testID="input" placeholder="Enter your username" />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your username'),
    ).toBeInTheDocument();
  });

  it('should render the label correctly ', () => {
    render(<Input testID="input" label="Username" />);
    expect(screen.getByTestId('input')).toBeInTheDocument();

    expect(screen.getByTestId('input-label')).toHaveTextContent('Username');
  });

  it('should render the error message correctly ', () => {
    render(<Input testID="input" error="This is an error message" />);
    expect(screen.getByTestId('input')).toBeInTheDocument();

    expect(screen.getByTestId('input-error')).toHaveTextContent(
      'This is an error message',
    );
  });
  it('should render the label, error message & placeholder correctly ', () => {
    render(
      <Input
        testID="input"
        label="Username"
        placeholder="Enter your username"
        error="This is an error message"
      />,
    );
    expect(screen.getByTestId('input')).toBeInTheDocument();

    expect(screen.getByTestId('input-label')).toHaveTextContent('Username');
    expect(screen.getByTestId('input-error')).toBeInTheDocument();
    expect(screen.getByTestId('input-error')).toHaveTextContent(
      'This is an error message',
    );
    expect(
      screen.getByPlaceholderText('Enter your username'),
    ).toBeInTheDocument();
  });

  it('should trigger onFocus event correctly ', async () => {
    const onFocus = vi.fn();
    const { user } = setup(<Input testID="input" onFocus={onFocus} />);

    const input = screen.getByTestId('input');
    await user.type(input, 'test text');
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('should trigger onBlur event correctly ', async () => {
    const onBlur = vi.fn();
    const { user } = setup(<Input testID="input" onBlur={onBlur} />);

    const input = screen.getByTestId('input');
    await user.type(input, 'test text');
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
  it('should trigger onChangeText event correctly', async () => {
    const onChangeText = vi.fn();
    const { user } = setup(
      <Input testID="input" onChangeText={onChangeText} />,
    );

    const input = screen.getByTestId('input');
    await user.type(input, '123456789');
    expect(onChangeText).toHaveBeenCalled();
    expect(onChangeText).toHaveBeenLastCalledWith('123456789');
  });
  it('should be disabled when disabled prop is true', () => {
    render(<Input testID="input" disabled={true} />);

    expect(screen.getByTestId('input')).toBeDisabled();
  });
});
