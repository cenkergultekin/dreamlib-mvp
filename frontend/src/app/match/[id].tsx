import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip, IconButton, T, TopBar } from '@/components/ui';
import { useAsync } from '@/hooks/use-async';
import { tr } from '@/i18n/tr';
import { getMatch, listMessages, sendMessage } from '@/services/api';
import type { Message } from '@/services/types';
import { useTheme } from '@/theme/theme';
import { border, fonts, radius, space } from '@/theme/tokens';

export default function Chat() {
  const { c } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const match = useAsync(() => getMatch(id), id);
  const initial = useAsync(() => listMessages(id), id);
  const [sent, setSent] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const msgs = [...(initial.data ?? []).filter((m) => !sent.some((s) => s.id === m.id)), ...sent];

  const send = async () => {
    const body = text.trim();
    if (!body) return;
    setText('');
    const m = await sendMessage(id, body);
    setSent((x) => [...x, m]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{ paddingHorizontal: space.xl, gap: space.sm }}>
          <TopBar title={match.data ? `@${match.data.username}` : ''} />
          {match.data ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, paddingBottom: space.sm }}>
              <Chip label={tr.matches.similar(match.data.similarity)} tone="lime" />
              {match.data.sharedSymbols.map((s) => (
                <Chip key={s} label={`#${s}`} />
              ))}
            </View>
          ) : null}
        </View>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: space.xl, gap: space.md }}>
          {msgs.map((m) => (
            <View
              key={m.id}
              style={[styles.bubble, { borderColor: c.line }, m.fromMe ? { alignSelf: 'flex-end', backgroundColor: c.purple } : { alignSelf: 'flex-start', backgroundColor: c.card }]}>
              <T color={m.fromMe ? '#FFFFFF' : c.text}>{m.text}</T>
              <T v="small" color={m.fromMe ? '#FFFFFF' : c.body} style={{ fontSize: 12 }}>
                {m.time}
              </T>
            </View>
          ))}
          <T v="small" style={{ textAlign: 'center', paddingTop: space.md }}>
            {tr.matches.quota}
          </T>
        </ScrollView>
        <View style={[styles.inputRow, { borderTopColor: c.line, backgroundColor: c.bg }]}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={tr.matches.placeholder}
            placeholderTextColor={c.placeholder}
            style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line }]}
            onSubmitEditing={send}
          />
          <IconButton name="arrow-up" tone="lime" size={52} onPress={send} label="Gönder" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bubble: { maxWidth: '82%', borderRadius: radius.md, paddingHorizontal: space.lg, paddingVertical: space.md, gap: 4, borderWidth: border },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: space.md, padding: space.lg, borderTopWidth: border },
  input: { flex: 1, borderRadius: radius.pill, paddingHorizontal: space.xl, paddingVertical: 14, fontFamily: fonts.regular, fontSize: 17, borderWidth: border },
});
