import type { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from '@/components/ui';
import { tr } from '@/i18n/tr';
import { useTheme } from '@/theme/theme';
import { border, fonts, palette, radius, space } from '@/theme/tokens';

type BottomTabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const tabs: Record<string, { label: string; icon: IconName }> = {
  index: { label: tr.tabs.home, icon: 'home' },
  explore: { label: tr.tabs.explore, icon: 'compass' },
  tell: { label: tr.tabs.tell, icon: 'mic' },
  matches: { label: tr.tabs.matches, icon: 'people' },
  profile: { label: tr.tabs.profile, icon: 'person' },
};

/**
 * Docked bar from the references (pins 01, 29): outlined round icon buttons; the active tab becomes
 * a purple rounded square with its name under it. "Anlat" stays lime as the one main action.
 */
export function TabBar({ state, navigation, descriptors }: BottomTabBarProps) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { backgroundColor: c.navBg, borderTopColor: c.line, paddingBottom: Math.max(insets.bottom, space.md) }]}>
      {state.routes.map((route, i) => {
        const meta = tabs[route.name];
        const options = descriptors[route.key].options as { href?: null };
        if (!meta || options.href === null) return null;
        const on = state.index === i;
        const main = route.name === 'tell';
        const press = () => {
          const e = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!on && !e.defaultPrevented) navigation.navigate(route.name);
        };
        const bg = on ? c.purple : main ? c.lime : 'transparent';
        const fg = on ? '#FFFFFF' : main ? palette.ink : c.text;
        // Equal slots: nothing moves when the active tab changes, so a tap always lands where it looks.
        return (
          <Pressable
            key={route.key}
            onPress={press}
            accessibilityRole="tab"
            accessibilityLabel={meta.label}
            accessibilityState={{ selected: on }}
            style={styles.slot}>
            <View style={[styles.item, { backgroundColor: bg, borderColor: c.line }, on && styles.active]}>
              <Icon name={meta.icon} size={on ? 24 : 22} color={fg} />
            </View>
            <Text style={[styles.label, { color: c.text, opacity: on ? 1 : 0 }]} numberOfLines={1}>
              {meta.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { width: '100%', maxWidth: 520, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', paddingHorizontal: space.sm, paddingTop: space.md, borderTopWidth: border },
  slot: { flex: 1, alignItems: 'center', gap: 4 },
  item: { height: 46, width: 46, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  active: { width: 64, borderRadius: radius.md },
  label: { fontFamily: fonts.bold, fontSize: 12 },
});
