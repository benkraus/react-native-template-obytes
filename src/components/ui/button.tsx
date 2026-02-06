import type { PressableProps } from 'react-native';
import { Button as HeroButton } from 'heroui-native/button';
import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant
  = | 'default'
    | 'secondary'
    | 'outline'
    | 'destructive'
    | 'ghost'
    | 'link';

export type ButtonSize = 'default' | 'lg' | 'sm' | 'icon';

type Props = {
  label?: string;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
} & Omit<PressableProps, 'disabled' | 'children'>;

function mapVariant(variant: ButtonVariant): React.ComponentProps<typeof HeroButton>['variant'] {
  switch (variant) {
    case 'default':
      return 'primary';
    case 'secondary':
      return 'secondary';
    case 'outline':
      return 'outline';
    case 'destructive':
      return 'danger';
    case 'ghost':
      return 'ghost';
    case 'link':
      return 'tertiary';
    default:
      return 'primary';
  }
}

function mapSize(size: ButtonSize): React.ComponentProps<typeof HeroButton>['size'] {
  switch (size) {
    case 'sm':
      return 'sm';
    case 'lg':
      return 'lg';
    case 'icon':
      return 'md';
    case 'default':
    default:
      return 'md';
  }
}

export function Button({
  label,
  loading = false,
  variant = 'default',
  disabled = false,
  size = 'default',
  fullWidth = true,
  className = '',
  textClassName = '',
  testID,
  children,
  ...props
}: Props) {
  const isDisabled = disabled || loading;

  const rootClassName = React.useMemo(
    () =>
      twMerge(
        fullWidth ? 'w-full' : 'self-center',
        // "link" is a semantics-only variant in our wrapper; underline the label by default.
        variant === 'link' ? 'px-0' : '',
        className,
      ),
    [className, fullWidth, variant],
  );

  return (
    <HeroButton
      testID={testID}
      isDisabled={isDisabled}
      isIconOnly={size === 'icon'}
      size={mapSize(size)}
      variant={mapVariant(variant)}
      className={rootClassName}
      {...props}
    >
      {children ?? (
        <View className="flex-row items-center justify-center gap-2">
          {loading
            ? (
                <ActivityIndicator
                  testID={testID ? `${testID}-activity-indicator` : undefined}
                />
              )
            : null}
          <HeroButton.Label
            className={twMerge(
              variant === 'link' ? 'underline' : '',
              textClassName,
            )}
          >
            {label ?? ''}
          </HeroButton.Label>
        </View>
      )}
    </HeroButton>
  );
}
