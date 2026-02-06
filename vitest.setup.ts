/* eslint-disable ts/ban-ts-comment */

import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// React Native libraries sometimes expect these globals in test environments.
// @ts-expect-error
globalThis.window = globalThis;

// Used by some components to pick a "non-native" presentation in test.
process.env.NODE_ENV = 'test';

// React Native core ships Flow syntax that doesn't run in Node.
// For unit tests, `react-native-web` is sufficient (and much easier to execute).
vi.mock('react-native', async () => await import('react-native-web'));

vi.mock('uniwind', () => ({
  __esModule: true,
  withUniwind: (Component: any) => Component,
  useUniwind: () => ({ theme: 'light' }),
  Uniwind: {
    setTheme: () => {},
  },
}));

// HeroUI Native ships React Native-focused code (and depends on RN internals) that
// doesn't execute in a plain Node/jsdom environment. For this template we stub
// the primitives used by our thin wrapper components.
vi.mock('heroui-native/provider', async () => {
  const React = await import('react');
  return {
    __esModule: true,
    HeroUINativeProvider: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
  };
});

vi.mock('heroui-native/button', async () => {
  const React = await import('react');

  const Button = ({
    children,
    testID,
    isDisabled,
    onPress,
    // HeroUI-specific props we don't want to forward to DOM
    isIconOnly: _isIconOnly,
    variant: _variant,
    size: _size,
    className: _className,
    ...props
  }: any) =>
    React.createElement(
      'button',
      {
        'type': 'button',
        'data-testid': testID,
        'disabled': Boolean(isDisabled),
        'onClick': onPress,
        ...props,
      },
      children,
    );

  (Button as any).Label = ({ children }: any) =>
    React.createElement('span', null, children);

  return { __esModule: true, Button };
});

vi.mock('heroui-native/text-field', async () => {
  const React = await import('react');
  return {
    __esModule: true,
    TextField: ({ children }: any) =>
      React.createElement('div', null, children),
  };
});

vi.mock('heroui-native/label', async () => {
  const React = await import('react');
  return {
    __esModule: true,
    Label: ({ children, testID, ...props }: any) =>
      React.createElement(
        'label',
        { 'data-testid': testID, ...props },
        children,
      ),
  };
});

vi.mock('heroui-native/field-error', async () => {
  const React = await import('react');
  return {
    __esModule: true,
    FieldError: ({ children, testID, isInvalid: _isInvalid, ...props }: any) =>
      React.createElement(
        'div',
        { 'data-testid': testID, ...props },
        children,
      ),
  };
});

vi.mock('heroui-native/input', async () => {
  const React = await import('react');

  const Input = (allProps: any) => {
    const {
      ref,
      testID,
      editable = true,
      onChangeText,
      onBlur,
      onFocus,
      value,
      secureTextEntry: _secureTextEntry,
      ...props
    } = allProps;

    const domProps: any = {
      ref,
      'data-testid': testID,
      'disabled': editable === false,
      'onChange': (e: any) => onChangeText?.(e.target.value),
      onBlur,
      onFocus,
      ...props,
    };

    // Only control the input when `value` is explicitly provided.
    if (value !== undefined)
      domProps.value = value;

    return React.createElement('input', domProps);
  };

  return { __esModule: true, Input };
});

vi.mock('react-native-svg', async () => {
  const React = await import('react');

  const mk = (tag: string) =>
    function SvgElement({ children, testID, ...props }: any) {
      return React.createElement(
        tag,
        { 'data-testid': testID, ...props },
        children,
      );
    };

  // Default export is `Svg`
  const Svg = mk('svg');

  return {
    __esModule: true,
    default: Svg,
    Svg,
    Path: mk('path'),
    G: mk('g'),
    Defs: mk('defs'),
    ClipPath: mk('clipPath'),
    Circle: mk('circle'),
    Text: mk('text'),
    TSpan: mk('tspan'),
  };
});

vi.mock('heroui-native/select', async () => {
  const React = await import('react');

  const Ctx = React.createContext<any>(null);

  function Select({ children, onValueChange }: any) {
    const [open, setOpen] = React.useState(false);
    const ctx = { open, setOpen, onValueChange };
    return React.createElement(Ctx.Provider, { value: ctx }, children);
  }

  function SelectTrigger({ children, testID, ...props }: any) {
    const ctx = React.use(Ctx);
    return React.createElement(
      'button',
      {
        'type': 'button',
        'data-testid': testID,
        'onClick': () => ctx?.setOpen?.(!ctx.open),
        ...props,
      },
      children,
    );
  }
  Select.Trigger = SelectTrigger;

  Select.Value = ({ placeholder }: any) =>
    React.createElement('span', null, placeholder ?? '');

  Select.Portal = ({ children }: any) =>
    React.createElement(React.Fragment, null, children);
  Select.Overlay = () => null;

  function SelectContent({ children }: any) {
    const ctx = React.use(Ctx);
    if (!ctx?.open)
      return null;
    return React.createElement('div', null, children);
  }
  Select.Content = SelectContent;

  function SelectItem({ children, testID, value, label }: any) {
    const ctx = React.use(Ctx);
    return React.createElement(
      'button',
      {
        'type': 'button',
        'data-testid': testID,
        'onClick': () => {
          ctx?.onValueChange?.({ value, label });
          ctx?.setOpen?.(false);
        },
      },
      children ?? label,
    );
  }
  Select.Item = SelectItem;

  return { __esModule: true, Select };
});

vi.mock('heroui-native/checkbox', async () => {
  const React = await import('react');
  return {
    __esModule: true,
    Checkbox: ({ testID, isSelected = false, onSelectedChange }: any) =>
      React.createElement(
        'button',
        {
          'type': 'button',
          'data-testid': testID,
          'aria-checked': Boolean(isSelected),
          'onClick': () => onSelectedChange?.(!isSelected),
        },
        'checkbox',
      ),
  };
});

vi.mock('heroui-native/switch', async () => {
  const React = await import('react');
  return {
    __esModule: true,
    Switch: ({ testID, isSelected = false, onSelectedChange }: any) =>
      React.createElement(
        'button',
        {
          'type': 'button',
          'data-testid': testID,
          'aria-checked': Boolean(isSelected),
          'onClick': () => onSelectedChange?.(!isSelected),
        },
        'switch',
      ),
  };
});

vi.mock('heroui-native/radio-group', async () => {
  const React = await import('react');
  const Ctx = React.createContext<any>(null);

  function RadioGroup({ children, value, onValueChange, testID }: any) {
    return React.createElement(
      'div',
      { 'data-testid': testID },
      React.createElement(Ctx.Provider, { value: { value, onValueChange } }, children),
    );
  }

  function RadioGroupItem({ children, value, testID }: any) {
    const ctx = React.use(Ctx);
    return React.createElement(
      'button',
      {
        'type': 'button',
        'data-testid': testID,
        'aria-checked': ctx?.value === value,
        'onClick': () => ctx?.onValueChange?.(value),
      },
      children,
    );
  }

  RadioGroup.Item = RadioGroupItem;

  return { __esModule: true, RadioGroup };
});

vi.mock('react-native-worklets', () => ({
  __esModule: true,
  default: {},
}));

vi.mock('react-native-reanimated', async () => {
  const ReactNative = await import('react-native');
  const View = ReactNative.View;

  // Some libraries (including HeroUI Native) rely on chained animation builders:
  // `FadeIn.delay(50).duration(200)` etc. This keeps those calls from crashing in tests.
  const chainable = () => {
    const obj: any = {};
    obj.duration = vi.fn(() => obj);
    obj.delay = vi.fn(() => obj);
    obj.springify = vi.fn(() => obj);
    obj.easing = vi.fn(() => obj);
    obj.withInitialValues = vi.fn(() => obj);
    obj.damping = vi.fn(() => obj);
    obj.stiffness = vi.fn(() => obj);
    obj.mass = vi.fn(() => obj);
    return obj;
  };

  const sharedValue = (initialValue: any) => {
    const obj: any = { value: initialValue };
    obj.get = () => obj.value;
    obj.set = (v: any) => {
      obj.value = v;
    };
    return obj;
  };

  return {
    __esModule: true,
    default: {
      View,
      ScrollView: View,
      createAnimatedComponent: (component: any) => component,
    },
    useSharedValue: vi.fn((initialValue: any = 0) => sharedValue(initialValue)),
    useAnimatedStyle: vi.fn((fn: any) => (typeof fn === 'function' ? fn() : fn)),
    useReducedMotion: vi.fn(() => false),
    useDerivedValue: vi.fn((fn: any) =>
      sharedValue(typeof fn === 'function' ? fn() : fn),
    ),
    useAnimatedProps: vi.fn((fn: any) => (typeof fn === 'function' ? fn() : fn)),
    useAnimatedReaction: vi.fn(),
    useAnimatedGestureHandler: vi.fn(),
    useAnimatedScrollHandler: vi.fn(),
    useAnimatedRef: vi.fn(() => ({ current: null })),
    runOnJS: (fn: any) => fn,
    runOnUI: (fn: any) => fn,
    interpolate: vi.fn((value: any) => value),
    Extrapolation: { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' },
    withTiming: vi.fn((value: any) => value),
    withSpring: vi.fn((value: any) => value),
    withDecay: vi.fn((value: any) => value),
    withDelay: vi.fn((_delay: any, value: any) => value),
    withRepeat: vi.fn((value: any) => value),
    withSequence: vi.fn((...values: any[]) => values[0]),
    cancelAnimation: vi.fn(),
    Easing: {
      linear: vi.fn(),
      ease: vi.fn(),
      quad: vi.fn(),
      cubic: vi.fn(),
      bezier: vi.fn(),
      in: vi.fn((fn: any) => fn),
      out: vi.fn((fn: any) => fn),
      inOut: vi.fn((fn: any) => fn),
    },
    FadeIn: chainable(),
    FadeOut: chainable(),
    FadeInDown: chainable(),
    FadeInUp: chainable(),
    FadeInLeft: chainable(),
    FadeInRight: chainable(),
    SlideInDown: chainable(),
    SlideInUp: chainable(),
    SlideInLeft: chainable(),
    SlideInRight: chainable(),
    LinearTransition: chainable(),
    Layout: chainable(),
    Keyframe: vi.fn(() => chainable()),
  };
});

vi.mock('expo-localization', () => ({
  getLocales: vi.fn(() => [
    {
      languageTag: 'en-US',
      languageCode: 'en',
      textDirection: 'ltr',
      digitGroupingSeparator: ',',
      decimalSeparator: '.',
      measurementSystem: 'metric',
      currencyCode: 'USD',
      currencySymbol: '$',
      regionCode: 'US',
    },
  ]),
}));

vi.mock('react-native-mmkv', () => ({
  MMKV: vi.fn(() => ({
    set: vi.fn(),
    getString: vi.fn(),
    getNumber: vi.fn(),
    getBoolean: vi.fn(),
    delete: vi.fn(),
    clearAll: vi.fn(),
    getAllKeys: vi.fn(() => []),
  })),
  useMMKVString: vi.fn((_key: string) => [undefined, vi.fn()]),
  useMMKVNumber: vi.fn((_key: string) => [undefined, vi.fn()]),
  useMMKVBoolean: vi.fn((_key: string) => [undefined, vi.fn()]),
  useMMKVObject: vi.fn((_key: string) => [undefined, vi.fn()]),
  createMMKV: vi.fn(() => ({
    set: vi.fn(),
    getString: vi.fn(),
    getNumber: vi.fn(),
    getBoolean: vi.fn(),
    delete: vi.fn(),
    clearAll: vi.fn(),
    getAllKeys: vi.fn(() => []),
  })),
}));

vi.mock('react-native-restart', () => ({
  __esModule: true,
  default: {
    restart: () => {},
  },
}));

vi.mock('react-native-keyboard-controller', async () => {
  const React = await import('react');
  const ReactNative = await import('react-native');
  const View = ReactNative.View;

  const passthrough = ({ children, ...props }: any) =>
    React.createElement(View, props, children);

  return {
    __esModule: true,
    KeyboardAvoidingView: passthrough,
    KeyboardProvider: passthrough,
    KeyboardAwareScrollView: passthrough,
  };
});

vi.mock('@gorhom/bottom-sheet', async () => {
  const React = await import('react');
  return {
    __esModule: true,
    BottomSheetModalProvider: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
  };
});

vi.mock('@react-navigation/native', async () => {
  const React = await import('react');
  return {
    __esModule: true,
    NavigationContainer: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
    useIsFocused: () => true,
    DefaultTheme: { colors: {} },
    DarkTheme: { colors: {} },
  };
});

vi.mock('react-native-edge-to-edge', async () => {
  const React = await import('react');
  return {
    __esModule: true,
    SystemBars: (_props: any) => React.createElement(React.Fragment, null),
  };
});

vi.mock('react-native-gesture-handler', async () => {
  const React = await import('react');
  const ReactNative = await import('react-native');
  const View = ReactNative.View;

  function createGesture() {
    const g: any = {};
    const chain = () => g;
    g.enabled = chain;
    g.onBegin = chain;
    g.onStart = chain;
    g.onUpdate = chain;
    g.onChange = chain;
    g.onEnd = chain;
    g.onFinalize = chain;
    g.onTouchesDown = chain;
    g.onTouchesMove = chain;
    g.onTouchesUp = chain;
    g.onTouchesCancelled = chain;
    g.activeOffsetX = chain;
    g.activeOffsetY = chain;
    g.failOffsetX = chain;
    g.failOffsetY = chain;
    g.minDistance = chain;
    g.maxPointers = chain;
    g.minPointers = chain;
    g.withRef = chain;
    g.requireExternalGestureToFail = chain;
    g.simultaneousWithExternalGesture = chain;
    return g;
  }

  return {
    __esModule: true,
    GestureHandlerRootView: ({ children, ...props }: any) =>
      React.createElement(View, props, children),
    GestureDetector: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
    Gesture: {
      Pan: createGesture,
      Tap: createGesture,
      LongPress: createGesture,
      Race: () => createGesture(),
      Simultaneous: () => createGesture(),
      Exclusive: () => createGesture(),
    },
  };
});

vi.mock('moti', async () => {
  const ReactNative = await import('react-native');
  const View = ReactNative.View;
  return {
    __esModule: true,
    AnimatePresence: View,
    View,
    MotiView: View,
  };
});

// `@shopify/flash-list/jestSetup` is Jest-only; in unit tests we just need a safe stub.
vi.mock('@shopify/flash-list', async () => {
  const React = await import('react');
  const ReactNative = await import('react-native');
  const View = ReactNative.View;
  return {
    __esModule: true,
    FlashList: ({ children, ...props }: any) =>
      React.createElement(View, props, children),
  };
});
