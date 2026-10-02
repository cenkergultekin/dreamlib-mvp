import { router, type Href } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Lib } from '@/components/lib';
import { Card, Chip, Icon, Screen, Section, T, Toggle, type IconName } from '@/components/ui';
import { features, type Feature } from '@/config/features';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { getProfile } from '@/services/api';
import { useSession } from '@/state/session';
import { useTheme } from '@/theme/theme';
import { space } from '@/theme/tokens';

type Row = { key: keyof typeof tr.profile.rows; icon: IconName; href?: Href; feature?: Feature };

const soon = (title: string): Href => ({ pathname: '/soon', params: { title } });

const rows: Row[] = [
  { key: 'library', icon: 'library', href: '/library' },
  { key: 'premium', icon: 'diamond', href: '/premium', feature: 'premium' },
  { key: 'avatar', icon: 'happy', href: soon(tr.profile.rows.avatar), feature: 'avatar' },
  { key: 'knowledge', icon: 'book', href: soon(tr.profile.rows.knowledge), feature: 'knowledge' },
  { key: 'theme', icon: 'moon' },
  { key: 'privacy', icon: 'lock-closed', href: soon(tr.profile.rows.privacy) },
  { key: 'notifications', icon: 'notifications', href: soon(tr.profile.rows.notifications) },
  { key: 'onboarding', icon: 'sparkles' },
  { key: 'signOut', icon: 'log-out' },
];

export default function Profile() {
  const { c, scheme, toggle } = useTheme();
  const { signOut } = useSession();
  const { data: p } = useAsync(getProfile);

  const press = (r: Row) => {
    if (r.key === 'theme') return toggle();
    if (r.key === 'onboarding') return router.push('/onboarding');
    if (r.key === 'signOut') {
      signOut();
      return router.replace('/onboarding');
    }
    if (r.href) router.push(r.href);
  };

  return (
    <Screen>
      <Card tone="purple" style={{ flexDirection: 'row', alignItems: 'center', gap: space.lg }}>
        <Lib mood="happy" size={86} />
        <View style={{ flex: 1, gap: 2 }}>
          <T v="h1" color="#FFFFFF">
            {p?.displayName ?? ''}
          </T>
          <T color="#FFFFFF">@{p?.username}</T>
          {p ? (
            <View style={{ paddingTop: space.sm }}>
              <Chip label={tr.profile.plan[p.plan]} tone="lime" />
            </View>
          ) : null}
        </View>
      </Card>

      {p ? (
        <View style={{ flexDirection: 'row', gap: space.md }}>
          <Card style={{ flex: 1 }}>
            <T v="hero">{p.dreamCount}</T>
            <T>{tr.profile.dreams}</T>
          </Card>
          <Card style={{ flex: 1 }}>
            <T v="hero">{p.streak}</T>
            <T>{tr.profile.streak}</T>
          </Card>
        </View>
      ) : null}

      {p ? (
        <Section title={tr.profile.badges}>
          <View style={styles.wrap}>
            {p.badges.map((b) => (
              <Chip key={b} label={b} />
            ))}
          </View>
        </Section>
      ) : null}

      <Card style={{ paddingVertical: space.xs }}>
        {rows
          .filter((r) => !r.feature || features[r.feature])
          .map((r, i) => {
            const danger = r.key === 'signOut';
            return (
              <Pressable key={r.key} onPress={() => press(r)} style={[styles.row, i > 0 && { borderTopWidth: 2, borderTopColor: c.line }]}>
                <Icon name={r.icon} color={danger ? c.danger : c.purple} />
                <T v="h3" color={danger ? c.danger : c.text} style={{ flex: 1 }}>
                  {tr.profile.rows[r.key]}
                </T>
                {r.key === 'theme' ? (
                  <Toggle value={scheme === 'dark'} onChange={toggle} />
                ) : danger ? null : (
                  <Icon name="chevron-forward" size={20} />
                )}
              </Pressable>
            );
          })}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.lg, paddingVertical: space.lg },
});
