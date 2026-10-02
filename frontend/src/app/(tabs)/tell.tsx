import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Lib } from '@/components/lib';
import { Button, Card, Chip, Icon, Loading, PressBox, Screen, Segmented, T, ToggleRow } from '@/components/ui';
import { features } from '@/config/features';
import { tr } from '@/i18n/tr';
import { cleanDream } from '@/services/api';
import type { Mood } from '@/services/types';
import { useDraft } from '@/state/draft';
import { useTheme } from '@/theme/theme';
import { border, fonts, palette, radius, space } from '@/theme/tokens';

// Phase 1: recording is simulated and drops a sample transcript into the text.
const sampleTranscript = 'Tamamı camdan bir şehrin üzerinde uçuyordum, her pencerede başka bir anı vardı, bazıları benim değildi.';

export default function Tell() {
  const { c } = useTheme();
  const { update, reset } = useDraft();
  const [mode, setMode] = useState<'voice' | 'write'>(features.voice ? 'voice' : 'write');
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const [tick, setTick] = useState(0);
  const [extras, setExtras] = useState(false);
  const [mood, setMood] = useState<Mood>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setTick((t) => t + 1), 160);
    return () => clearInterval(id);
  }, [recording]);

  const toggleRecording = () => {
    if (recording) {
      setText((t) => (t ? `${t} ` : '') + sampleTranscript);
      setMode('write');
    }
    setRecording((r) => !r);
  };

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    reset();
    const res = await cleanDream(text, mood);
    update({ rawText: text, mood, cleanText: res.cleanText, tags: res.tags, analysisIndex: res.analysisIndex });
    setText('');
    setMood({});
    setBusy(false);
    router.push('/flow/review');
  };

  if (busy)
    return (
      <Screen scroll={false}>
        <Loading label={tr.tell.cleaning} />
      </Screen>
    );

  return (
    <Screen footer={mode === 'write' ? <Button label={tr.tell.submit} onPress={submit} disabled={text.trim().length < 10} /> : undefined}>
      <View style={{ gap: space.sm }}>
        <T v="hero">{tr.tell.title}</T>
        <T>{tr.tell.sub}</T>
      </View>

      {features.voice ? (
        <Segmented
          value={mode}
          onChange={(m) => {
            setRecording(false);
            setMode(m);
          }}
          options={[
            { key: 'voice', label: tr.tell.voice },
            { key: 'write', label: tr.tell.write },
          ]}
        />
      ) : null}

      {mode === 'voice' ? (
        <View style={styles.voice}>
          <Lib mood={recording ? 'wow' : 'happy'} size={140} bounce={recording} />
          <View style={styles.wave}>
            {Array.from({ length: 15 }, (_, i) => (
              <View
                key={i}
                style={{
                  width: 9,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: c.line,
                  backgroundColor: c.purple,
                  height: recording ? 12 + Math.abs(Math.sin(tick * 0.7 + i * 0.8)) * 48 : 12,
                }}
              />
            ))}
          </View>
          <PressBox onPress={toggleRecording} label={recording ? tr.tell.listening : tr.tell.tapToSpeak} style={[styles.mic, { backgroundColor: recording ? c.purple : c.lime }]}>
            <Icon name={recording ? 'stop' : 'mic'} size={44} color={recording ? '#FFFFFF' : palette.ink} />
          </PressBox>
          <T v="h3">{recording ? tr.tell.listening : tr.tell.tapToSpeak}</T>
        </View>
      ) : (
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder={tr.tell.placeholder}
          placeholderTextColor={c.placeholder}
          multiline
          style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line, boxShadow: `4px 4px 0 ${c.shadow}` }]}
        />
      )}

      <Pressable onPress={() => setExtras((e) => !e)} style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }} hitSlop={8}>
        <Icon name={extras ? 'remove-circle' : 'add-circle'} size={26} color={c.purple} />
        <T v="h3">{tr.tell.extras}</T>
      </Pressable>

      {extras ? (
        <Card style={{ gap: space.lg }}>
          <T v="h3">{tr.tell.feeling}</T>
          <View style={styles.wrap}>
            {tr.tell.feelings.map((f) => (
              <Chip key={f} label={f} selected={mood.feeling === f} onPress={() => setMood((m) => ({ ...m, feeling: m.feeling === f ? undefined : f }))} />
            ))}
          </View>
          <T v="h3">{tr.tell.sleep}</T>
          <View style={styles.wrap}>
            {tr.tell.sleepOptions.map((s) => (
              <Chip key={s} label={s} selected={mood.sleep === s} onPress={() => setMood((m) => ({ ...m, sleep: m.sleep === s ? undefined : s }))} />
            ))}
          </View>
          <ToggleRow label={tr.tell.lucid} value={!!mood.lucid} onChange={(v) => setMood((m) => ({ ...m, lucid: v }))} />
          <ToggleRow label={tr.tell.nightmare} value={!!mood.nightmare} onChange={(v) => setMood((m) => ({ ...m, nightmare: v }))} />
        </Card>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  voice: { alignItems: 'center', gap: space.xl, paddingVertical: space.md },
  wave: { flexDirection: 'row', alignItems: 'center', gap: 5, height: 64 },
  mic: { width: 108, height: 108, borderRadius: 54, alignItems: 'center', justifyContent: 'center' },
  input: { minHeight: 200, borderRadius: radius.lg, padding: space.xl, fontFamily: fonts.regular, fontSize: 18, lineHeight: 27, textAlignVertical: 'top', borderWidth: border },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
});
