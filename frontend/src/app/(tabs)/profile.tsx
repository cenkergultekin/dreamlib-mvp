import { router, type Href } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Art, Card, Chip, Icon, Screen, Section, T, type IconName } from '@/components/ui';
import { features, type Feature } from '@/config/features';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { getProfile } from '@/services/api';
import { art } from '@/services/mock-data';
import { useTheme } from '@/theme/theme';
import { palette, space } from '@/theme/tokens';

type Row = { key: keyof typeof tr.profile.rows; icon: IconName; href?: Href; feature?: Feature };

const rows: Row[] = [
  { key: 'library', icon: 'library-outline', href: '/library' },
  { key: 'avatar', icon: 'happy-outline', href: { pathname: '/soon', params: { title: tr.profile.rows.avatar } }, feature: 'avatar' },
  { key: 'knowledge', icon: 'book-outline', href: { pathname: '/soon', params: { title: tr.profile.rows.knowledge } }, feature: 'knowledge' },
  { key: 'premium', icon: 'diamond-outline', href: '/premium', feature: 'premium' },
  { key: 'theme', icon: 'contrast-outline' },
  { key: 'privacy', icon: 'lock-closed-outline', href: { pathname: '/soon', params: { title: tr.profile.rows.privacy } } },
  { key: 'notifications', icon: 'notifications-outline', href: { pathname: '/soon', params: { title: tr.profile.rows.notifications } } },
  { key: 'onboarding', icon: 'sparkles-outline', href: '/onboarding' },
  { key: 'signOut', icon: 'log-out-outline' },
];

export default function Profile() {
  const { c, scheme, toggle } = useTheme();
  const { data: p } = useAsync(getProfile);

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.lg, paddingTop: space.xl }}>
        <Art colors={art.glass} style={styles.avatar}>
          <T v="h1" color={palette.ink}>
            {p?.displayName.slice(0, 1) ?? ''}
          </T>
        </Art>
        <View style={{ flex: 1, gap: 2 }}>
          <T v="h2">{p?.displayName}</T>
          <T v="label">@{p?.username} · {p?.plan === 'free' ? 'ücretsiz plan' : p?.plan}</T>
        </View>
      </View>

      {p ? (
        <View style={{ flexDirection: 'row', gap: space.md }}>
          {[
            { label: tr.profile.dreams, value: p.dreamCount, tone: 'lavender' as const },
            { label: tr.profile.streak, value: p.streak, tone: 'yellow' as const },
            { label: 'XP', value: p.xp, tone: 'lime' as const },
          ].map((s) => (
            <Card key={s.label} tone={s.tone} style={{ flex: 1, alignItems: 'center' }}>
              <T v="h1" color={palette.ink}>{s.value}</T>
              <T v="label" color={palette.ink}>{s.label}</T>
            </Card>
          ))}
        </View>
      ) : null}

      {p ? (
        <Section title={tr.profile.badges}>
          <View style={styles.wrap}>
            {p.badges.map((b, i) => (
              <Chip key={b} label={b} tone={(['pink', 'sky', 'orange', 'lime'] as const)[i % 4]} />
            ))}
          </View>
        </Section>
      ) : null}

      <Card style={{ paddingVertical: space.xs }}>
        {rows
          .filter((r) => !r.feature || features[r.feature])
          .map((r, i) => (
            <Pressable
              key={r.key}
              onPress={() => (r.key === 'theme' ? toggle() : r.href ? router.push(r.href) : undefined)}
              style={[styles.row, i > 0 && { borderTopWidth: 2, borderTopColor: c.line }]}>
              <Icon name={r.icon} color={r.key === 'signOut' ? c.danger : c.muted} />
              <T color={r.key === 'signOut' ? c.danger : c.text} style={{ flex: 1 }}>
                {tr.profile.rows[r.key]}
              </T>
              {r.key === 'theme' ? <T v="label">{scheme === 'dark' ? 'Gece' : 'Gündüz'}</T> : <Icon name="chevron-forward" size={16} color={c.faint} />}
            </Pressable>
          ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center' },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md, paddingVertical: 14 },
});
