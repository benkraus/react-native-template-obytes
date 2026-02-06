import type { OptionType } from './select';

import * as React from 'react';
import { cleanup, render, screen, setup } from '@/lib/test-utils';

import { Select } from './select';

afterEach(cleanup);

describe('select component ', () => {
  const options: OptionType[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  it('should render correctly ', () => {
    const onSelect = vi.fn();
    render(
      <Select
        label="Select options"
        options={options}
        onSelect={onSelect}
        testID="select"
      />,
    );
    expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('select-label')).toBeInTheDocument();
  });

  it('should render the label correctly ', () => {
    const onSelect = vi.fn();
    render(
      <Select
        label="Select"
        options={options}
        onSelect={onSelect}
        testID="select"
      />,
    );
    expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('select-label')).toBeInTheDocument();
    expect(screen.getByTestId('select-label')).toHaveTextContent('Select');
  });

  it('should render the error correctly ', () => {
    const onSelect = vi.fn();
    render(
      <Select
        label="Select"
        options={options}
        onSelect={onSelect}
        testID="select"
        error="Please select an option"
      />,
    );
    expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('select-error')).toBeInTheDocument();
    expect(screen.getByTestId('select-error')).toHaveTextContent(
      'Please select an option',
    );
  });

  it('should open options modal on press', async () => {
    const { user } = setup(
      <Select
        label="Select"
        options={options}
        testID="select"
        placeholder="Select an option"
      />,
    );

    const selectTrigger = screen.getByTestId('select-trigger');
    await user.click(selectTrigger);

    expect(screen.getByTestId('select-item-chocolate')).toBeInTheDocument();
    expect(screen.getByTestId('select-item-strawberry')).toBeInTheDocument();
    expect(screen.getByTestId('select-item-vanilla')).toBeInTheDocument();
  });

  it('should call onSelect on selecting an option', async () => {
    const onSelect = vi.fn();

    const { user } = setup(
      <Select options={options} onSelect={onSelect} testID="select" />,
    );

    const selectTrigger = screen.getByTestId('select-trigger');
    await user.click(selectTrigger);

    const optionItem1 = screen.getByTestId('select-item-chocolate');
    await user.click(optionItem1);

    expect(onSelect).toHaveBeenCalledWith(options[0].value);
  });
});
