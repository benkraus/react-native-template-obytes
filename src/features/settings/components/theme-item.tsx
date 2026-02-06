import type { ColorSchemeType } from '@/lib/hooks/use-selected-theme';
import { Select } from 'heroui-native/select';
import * as React from 'react';
import { useSelectedTheme } from '@/lib/hooks/use-selected-theme';
import { translate } from '@/lib/i18n';

import { SettingsItem } from './settings-item';

export function ThemeItem() {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();

  const themes = React.useMemo(
    () => [
      { label: `${translate('settings.theme.dark')} 🌙`, value: 'dark' },
      { label: `${translate('settings.theme.light')} 🌞`, value: 'light' },
      { label: `${translate('settings.theme.system')} ⚙️`, value: 'system' },
    ],
    [],
  );

  const theme = React.useMemo(
    () => themes.find(t => t.value === selectedTheme),
    [selectedTheme, themes],
  );

  return (
    <Select
      value={theme}
      onValueChange={(opt: any) => opt && setSelectedTheme(opt.value as ColorSchemeType)}
      presentation="bottom-sheet"
    >
      <Select.Trigger asChild>
        <SettingsItem text="settings.theme.title" value={theme?.label} />
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay />
        <Select.Content presentation="bottom-sheet" snapPoints={['35%']}>
          {themes.map(t => (
            <Select.Item
              key={`theme-${t.value}`}
              value={t.value}
              label={t.label}
            />
          ))}
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}
