import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip, Icon, T, TopBar } from '@/components/ui';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { getMatch, listMessages, sendMessage } from '@/services/api';
import type { Message } from '@/services/types';
import { useTheme } from '@/theme/theme';
import { border, fonts, palette, radius, space } from '@/theme/tokens';

export default function Chat() {
  const { c } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const match = useAsync(() => getMatch(id), id);
  const initial = useAsync(() => listMessages(id), id);
  const [sent, setSent] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const msgs = [...(initial.data ?? []).filter((m) => !sent.some((s) => s.id === m.id)), ...sent];

  const send = async () => {
    if (!text.trim()) return;
    const m = await sendMessage(id, text.trim());
    setSent((x) => [...x, m]);
    setText('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{ paddingHorizontal: space.xl }}>
          <TopBar title={match.data ? `@${match.data.username}` : ''} />
          {match.data ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingBottom: space.sm }}>
              <T v="label" color={c.text}>
                %{match.data.similarity} {tr.matches.similarity}
              </T>
              {match.data.sharedSymbols.map((s) => (
                <Chip key={s} label={s} tone="lime" />
              ))}
            </View>
          ) : null}
        </View>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: space.xl, gap: space.sm }}>
          {msgs.map((m) => (
            <View key={m.id} style={[styles.bubble, m.fromMe ? { alignSelf: 'flex-end', backgroundColor: palette.lavender, borderColor: c.line } : { alignSelf: 'flex-start', backgroundColor: c.card, borderColor: c.line }]}>
              <T color={m.fromMe ? palette.ink : c.text}>{m.text}</T>
              <T v="label" color={m.fromMe ? palette.ink : c.faint} style={{ fontSize: 9 }}>
                {m.time}
              </T>
            </View>
          ))}
        </ScrollView>
        <T v="small" style={{ textAlign: 'center' }}>
          {tr.matches.quota}
        </T>
        <View style={[styles.inputRow, { borderTopColor: c.line }]}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={tr.matches.placeholder}
            placeholderTextColor={c.faint}
            style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line }]}
            onSubmitEditing={send}
          />
          <Pressable onPress={send} style={[styles.send, { backgroundColor: palette.lime, borderColor: c.line }]}>
            <Icon name="arrow-up" color={palette.ink} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bubble: { maxWidth: '82%', borderRadius: radius.md, paddingHorizontal: 14, paddingVertical: 10, gap: 4, borderWidth: border },
  inputRow: { flexDirection: 'row', gap: space.sm, padding: space.md, borderTopWidth: border },
  input: { flex: 1, borderRadius: radius.pill, paddingHorizontal: space.lg, paddingVertical: 12, fontFamily: fonts.regular, fontSize: 15, borderWidth: border },
  send: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', borderWidth: border },
});
