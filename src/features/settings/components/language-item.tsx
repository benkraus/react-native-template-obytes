import type { Language } from '@/lib/i18n/resources';
import { Select } from 'heroui-native/select';
import * as React from 'react';
import { translate, useSelectedLanguage } from '@/lib/i18n';

import { SettingsItem } from './settings-item';

export function LanguageItem() {
  const { language, setLanguage } = useSelectedLanguage();

  const langs = React.useMemo(
    () => [
      { label: translate('settings.english'), value: 'en' },
      { label: translate('settings.arabic'), value: 'ar' },
    ],
    [],
  );

  const selectedLanguage = React.useMemo(
    () => langs.find(lang => lang.value === language),
    [language, langs],
  );

  return (
    <Select
      value={selectedLanguage}
      onValueChange={(opt: any) => opt && setLanguage(opt.value as Language)}
      presentation="bottom-sheet"
    >
      <Select.Trigger asChild>
        <SettingsItem text="settings.language" value={selectedLanguage?.label} />
      </Select.Trigger>
      <Select.Portal>
        <Select.Overlay />
        <Select.Content presentation="bottom-sheet" snapPoints={['35%']}>
          {langs.map(lang => (
            <Select.Item
              key={`lang-${lang.value}`}
              value={lang.value}
              label={lang.label}
            />
          ))}
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}
