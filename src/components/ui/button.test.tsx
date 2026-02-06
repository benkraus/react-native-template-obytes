import * as React from 'react';
import { Text } from 'react-native';

import { cleanup, render, screen, setup } from '@/lib/test-utils';

import { Button } from './button';

afterEach(cleanup);

describe('button component ', () => {
  it('should render correctly ', () => {
    render(<Button testID="button" />);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });
  it('should render correctly if we add explicit child ', () => {
    render(
      <Button testID="button">
        <Text> Custom child </Text>
      </Button>,
    );
    expect(screen.getByText('Custom child')).toBeInTheDocument();
  });
  it('should render the label correctly', () => {
    render(<Button testID="button" label="Submit" />);
    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
  it('should render the loading indicator correctly', () => {
    render(<Button testID="button" loading={true} />);
    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByTestId('button-activity-indicator')).toBeInTheDocument();
  });
  it('should call onClick handler when clicked', async () => {
    const onClick = vi.fn();
    const { user } = setup(
      <Button testID="button" label="Click the button" onPress={onClick} />,
    );
    expect(screen.getByTestId('button')).toBeInTheDocument();
    await user.click(screen.getByTestId('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('should be disabled when loading', async () => {
    const onClick = vi.fn();
    const { user } = setup(
      <Button
        testID="button"
        loading={true}
        label="Click the button"
        onPress={onClick}
      />,
    );
    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByTestId('button-activity-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeDisabled();
    await user.click(screen.getByTestId('button'));
    expect(onClick).toHaveBeenCalledTimes(0);
  });
  it('should be disabled when disabled prop is true', () => {
    render(<Button testID="button" disabled={true} />);
    expect(screen.getByTestId('button')).toBeDisabled();
  });
  it('shouldn\'t call onClick when disabled', async () => {
    const onClick = vi.fn();
    const { user } = setup(
      <Button
        testID="button"
        label="Click the button"
        disabled={true}
        onPress={onClick}
        variant="secondary"
      />,
    );
    expect(screen.getByTestId('button')).toBeInTheDocument();
    await user.click(screen.getByTestId('button'));

    expect(screen.getByTestId('button')).toBeDisabled();

    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
