import { FieldError } from 'heroui-native/field-error';
import { Label } from 'heroui-native/label';
import { Select as HeroSelect } from 'heroui-native/select';
import * as React from 'react';
import { Platform, View } from 'react-native';

import { CaretDown } from '@/components/ui/icons';

export type OptionType = { label: string; value: string | number };

export type SelectProps = {
  value?: string | number;
  label?: string;
  disabled?: boolean;
  error?: string;
  options?: OptionType[];
  onSelect?: (value: string | number) => void;
  placeholder?: string;
  testID?: string;
};

type HeroSelectOption = { value: any; label: string } | undefined;

export function Select(props: SelectProps) {
  const {
    label,
    value,
    error,
    options = [],
    placeholder = 'select...',
    disabled = false,
    onSelect,
    testID,
  } = props;

  const selectedOption = React.useMemo(() => {
    if (value === undefined)
      return undefined;
    const found = options.find(o => o.value === value);
    return found ? ({ value: found.value, label: found.label } as HeroSelectOption) : undefined;
  }, [options, value]);

  const isTestEnv = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';
  const presentation = isTestEnv
    ? 'dialog'
    : Platform.OS === 'web'
      ? 'popover'
      : 'bottom-sheet';

  return (
    <View className="mb-4">
      {label
        ? (
            <Label
              testID={testID ? `${testID}-label` : undefined}
              className={error ? 'text-danger' : 'text-foreground'}
            >
              {label}
            </Label>
          )
        : null}

      <HeroSelect
        value={selectedOption as any}
        onValueChange={(opt: any) => {
          if (opt?.value === undefined)
            return;
          onSelect?.(opt.value);
        }}
        isDisabled={disabled}
        presentation={presentation}
      >
        <HeroSelect.Trigger
          testID={testID ? `${testID}-trigger` : undefined}
          className={[
            'mt-2 rounded-xl border border-border bg-background p-3',
            error ? 'border-danger' : '',
            disabled ? 'opacity-60' : '',
          ].join(' ')}
        >
          <View className="flex-row items-center justify-between">
            <HeroSelect.Value
              placeholder={placeholder}
              className="flex-1 text-foreground"
            />
            <CaretDown />
          </View>
        </HeroSelect.Trigger>

        <HeroSelect.Portal>
          <HeroSelect.Overlay />
          <HeroSelect.Content
            presentation={presentation as any}
            {...(presentation === 'bottom-sheet' ? { snapPoints: ['35%'] } : {})}
            testID={testID ? `${testID}-content` : undefined}
          >
            {options.map(option => (
              <HeroSelect.Item
                key={`select-item-${option.value}`}
                value={option.value as any}
                label={option.label}
                testID={
                  testID ? `${testID}-item-${String(option.value)}` : undefined
                }
              />
            ))}
          </HeroSelect.Content>
        </HeroSelect.Portal>
      </HeroSelect>

      {error
        ? (
            <View testID={testID ? `${testID}-error` : undefined}>
              <FieldError isInvalid>{error}</FieldError>
            </View>
          )
        : null}
    </View>
  );
}
