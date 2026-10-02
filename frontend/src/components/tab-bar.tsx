import type { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from '@/components/ui';
import { tr } from '@/i18n/tr';
import { useTheme } from '@/theme/theme';
import { border, fonts, palette, radius } from '@/theme/tokens';

type BottomTabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const tabs: Record<string, { label: string; icon: IconName; iconOn: IconName }> = {
  index: { label: tr.tabs.home, icon: 'moon-outline', iconOn: 'moon' },
  explore: { label: tr.tabs.explore, icon: 'compass-outline', iconOn: 'compass' },
  tell: { label: tr.tabs.tell, icon: 'mic', iconOn: 'mic' },
  matches: { label: tr.tabs.matches, icon: 'people-outline', iconOn: 'people' },
  profile: { label: tr.tabs.profile, icon: 'person-outline', iconOn: 'person' },
};

/** Ink pill bar (pin 29); the active tab becomes a lime pill, "Anlat" is a raised lime button. */
export function TabBar({ state, navigation, descriptors }: BottomTabBarProps) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 12), pointerEvents: 'box-none' }]}>
      <View style={[styles.bar, { backgroundColor: c.navBg, borderColor: c.line, boxShadow: `4px 4px 0 ${c.shadow}` }]}>
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
          if (main) {
            return (
              <Pressable key={route.key} onPress={press} style={styles.item} accessibilityRole="tab" accessibilityLabel={meta.label} accessibilityState={{ selected: on }}>
                <View style={[styles.main, { backgroundColor: c.navActive, borderColor: palette.cream }]}>
                  <Icon name="mic" size={24} color={palette.ink} />
                </View>
              </Pressable>
            );
          }
          return (
            <Pressable key={route.key} onPress={press} style={styles.item} accessibilityRole="tab" accessibilityState={{ selected: on }}>
              <View style={[styles.pill, on && { backgroundColor: c.navActive }]}>
                <Icon name={on ? meta.iconOn : meta.icon} size={19} color={on ? palette.ink : 'rgba(255,246,230,0.6)'} />
              </View>
              <Text style={[styles.label, { color: on ? palette.cream : 'rgba(255,246,230,0.55)' }]}>{meta.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 16 },
  bar: { flexDirection: 'row', alignItems: 'center', borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: 6, borderWidth: border },
  item: { flex: 1, alignItems: 'center', gap: 2 },
  pill: { width: 44, height: 30, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  main: { width: 58, height: 58, borderRadius: 29, marginVertical: -14, alignItems: 'center', justifyContent: 'center', borderWidth: 3 },
  label: { fontFamily: fonts.bold, fontSize: 10 },
});
