import { View } from 'react-native';

import { Lib } from '@/components/lib';
import { Button, Card, Icon, Screen, T, TopBar } from '@/components/ui';
import { tr } from '@/i18n/tr';
import { palette, space } from '@/theme/tokens';

// Payments come in Phase 2 (App Store subscriptions); this only shows the offer.
export default function Premium() {
  return (
    <Screen>
      <TopBar />
      <View style={{ gap: 6 }}>
        <Lib mood="wow" size={90} />
        <T v="h1">{tr.premium.title}</T>
        <T>{tr.premium.sub}</T>
      </View>
      {tr.premium.plans.map((p) => (
        <Card key={p.key} tone={p.key === 'premium' ? 'lime' : 'paper'} style={{ gap: space.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <T v="h1" color={palette.ink} style={{ flex: 1 }}>
              {p.name}
            </T>
            <T v="h3" color={palette.ink}>
              {p.price}
            </T>
          </View>
          {p.perks.map((perk) => (
            <View key={perk} style={{ flexDirection: 'row', gap: space.sm, alignItems: 'center' }}>
              <Icon name="checkmark-circle" size={18} color={palette.purple} />
              <T color={palette.ink}>{perk}</T>
            </View>
          ))}
          <Button label={tr.premium.cta} variant="secondary" onPress={() => {}} />
        </Card>
      ))}
    </Screen>
  );
}
