import { useState } from 'react';
import { View } from 'react-native';

import { Lib } from '@/components/lib';
import { Button, Card, Icon, Screen, T, TopBar } from '@/components/ui';
import { tr } from '@/i18n/tr';
import { useTheme } from '@/theme/theme';
import { space } from '@/theme/tokens';

// Payments come in Phase 2 (App Store subscriptions); for now picking a plan only confirms the choice.
export default function Premium() {
  const { c } = useTheme();
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <Screen>
      <TopBar />
      <View style={{ alignItems: 'center' }}>
        <Lib mood="wow" size={130} />
      </View>
      <T v="hero">{tr.premium.title}</T>
      <T>{tr.premium.sub}</T>
      {tr.premium.plans.map((p) => {
        const best = p.key === 'premium';
        const fg = best ? '#FFFFFF' : undefined;
        return (
          <Card key={p.key} tone={best ? 'purple' : 'paper'} style={{ gap: space.md }}>
            <T v="h1" color={fg}>
              {p.name}
            </T>
            <T v="h3" color={fg}>
              {p.price}
            </T>
            {p.perks.map((perk) => (
              <View key={perk} style={{ flexDirection: 'row', gap: space.sm, alignItems: 'center' }}>
                <Icon name="checkmark-circle" size={22} color={best ? c.lime : c.purple} />
                <T color={fg ?? c.text}>{perk}</T>
              </View>
            ))}
            <Button label={tr.premium.cta} variant={best ? 'primary' : 'dark'} onPress={() => setPicked(p.key)} style={{ marginTop: space.sm }} />
            {picked === p.key ? (
              <T v="small" color={fg}>
                {tr.premium.picked}
              </T>
            ) : null}
          </Card>
        );
      })}
    </Screen>
  );
}
