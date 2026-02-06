import * as React from 'react';

import { cleanup, screen, setup } from '@/lib/test-utils';

import { Checkbox, RadioGroup, Switch } from './checkbox';

afterEach(cleanup);

describe('heroui checkbox primitives', () => {
  it('<Checkbox /> toggles selection on press', async () => {
    const onSelectedChange = vi.fn();
    const { user } = setup(
      <Checkbox
        testID="checkbox"
        accessibilityLabel="agree"
        isSelected={false}
        onSelectedChange={onSelectedChange}
      />,
    );

    await user.click(screen.getByTestId('checkbox'));
    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });

  it('<Switch /> toggles selection on press', async () => {
    const onSelectedChange = vi.fn();
    const { user } = setup(
      <Switch
        testID="switch"
        accessibilityLabel="toggle"
        isSelected={false}
        onSelectedChange={onSelectedChange}
      />,
    );

    await user.click(screen.getByTestId('switch'));
    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });

  it('<RadioGroup /> changes value when pressing an item', async () => {
    const onValueChange = vi.fn();
    const { user } = setup(
      <RadioGroup value="a" onValueChange={onValueChange} testID="radio-group">
        <RadioGroup.Item value="a" testID="radio-a">
          A
        </RadioGroup.Item>
        <RadioGroup.Item value="b" testID="radio-b">
          B
        </RadioGroup.Item>
      </RadioGroup>,
    );

    await user.click(screen.getByTestId('radio-b'));
    expect(onValueChange).toHaveBeenCalledWith('b');
  });
});
