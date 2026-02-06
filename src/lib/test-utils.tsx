/* eslint-disable react-refresh/only-export-components */
import type { RenderOptions } from '@testing-library/react';

import type { ReactElement } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeroUINativeProvider } from 'heroui-native/provider';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const heroConfig = {
  devInfo: { stylingPrinciples: false },
  toast: false,
} as const;

function createAppWrapper() {
  return ({ children }: { children: React.ReactNode }) => (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider config={heroConfig}>
        <BottomSheetModalProvider>
          <NavigationContainer>{children}</NavigationContainer>
        </BottomSheetModalProvider>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  const Wrapper = createAppWrapper(); // make sure we have a new wrapper for each render
  return render(ui, { wrapper: Wrapper, ...options });
}

// use this if you want to test user events
export function setup(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  const Wrapper = createAppWrapper();
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}

export * from '@testing-library/react';
export { customRender as render };
