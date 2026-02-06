import type { TextInputProps } from 'react-native';
import { FieldError } from 'heroui-native/field-error';
import { Input as HeroInput } from 'heroui-native/input';
import { Label } from 'heroui-native/label';
import { TextField } from 'heroui-native/text-field';
import * as React from 'react';
import { View } from 'react-native';

export type NInputProps = {
  label?: string;
  disabled?: boolean;
  error?: string;
} & TextInputProps;

export function Input({ ref, ...props }: NInputProps & { ref?: React.Ref<any> }) {
  const { label, error, testID, disabled, ...inputProps } = props;

  return (
    <View className="mb-2">
      <TextField isDisabled={Boolean(disabled)} isInvalid={Boolean(error)}>
        {label
          ? (
              <Label testID={testID ? `${testID}-label` : undefined}>{label}</Label>
            )
          : null}
        <HeroInput
          testID={testID}
          ref={ref}
          editable={disabled ? false : inputProps.editable}
          {...inputProps}
        />
        {error
          ? (
              <FieldError testID={testID ? `${testID}-error` : undefined}>
                {error}
              </FieldError>
            )
          : null}
      </TextField>
    </View>
  );
}
