import type { OptionType } from '@/components/ui';

import * as React from 'react';
import { Checkbox, Input, RadioGroup, Select, Switch, Text, View } from '@/components/ui';

import { Title } from './title';

const options: OptionType[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export function Inputs() {
  const [value, setValue] = React.useState<string | number | undefined>();
  return (
    <>
      <Title text="Form" />
      <View>
        <Input label="Default" placeholder="Lorem ipsum dolor sit amet" />
        <Input label="Error" error="This is a message error" />
        <Input label="Focused" />
        <Select
          label="Select"
          options={options}
          value={value}
          onSelect={option => setValue(option)}
        />
        <CheckboxExample />
        <RadioExample />
        <SwitchExample />
      </View>
    </>
  );
}

function CheckboxExample() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className="flex-row items-center gap-2 pb-2">
      <Checkbox
        accessibilityLabel="accept terms of condition"
        isSelected={checked}
        onSelectedChange={setChecked}
      />
      <Text>checkbox</Text>
    </View>
  );
}

function RadioExample() {
  const [selected, setSelected] = React.useState<'on' | 'off'>('off');
  return (
    <RadioGroup value={selected} onValueChange={v => setSelected(v as any)} className="pb-2">
      <RadioGroup.Item value="off">Off</RadioGroup.Item>
      <RadioGroup.Item value="on">On</RadioGroup.Item>
    </RadioGroup>
  );
}

function SwitchExample() {
  const [active, setActive] = React.useState(false);
  return (
    <View className="flex-row items-center gap-2 pb-2">
      <Switch
        accessibilityLabel="switch"
        isSelected={active}
        onSelectedChange={setActive}
      />
      <Text>switch</Text>
    </View>
  );
}
