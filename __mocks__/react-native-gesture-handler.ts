const React = require('react');
const { View } = require('react-native');

const rnghMocks = require('react-native-gesture-handler/lib/commonjs/mocks/mocks');

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

module.exports = {
  ...rnghMocks,

  GestureHandlerRootView: ({ children, ...props }: any) =>
    React.createElement(View, props, children),

  GestureDetector: ({ children }: any) =>
    React.createElement(React.Fragment, null, children),

  // Minimal v2 gesture API used by some libraries (e.g. HeroUI Native Toast).
  Gesture: {
    Pan: createGesture,
    Tap: createGesture,
    LongPress: createGesture,
    Race: () => createGesture(),
    Simultaneous: () => createGesture(),
    Exclusive: () => createGesture(),
  },
};
