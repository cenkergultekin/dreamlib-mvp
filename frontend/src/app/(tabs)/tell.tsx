import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Lib } from '@/components/lib';
import { Button, Chip, Icon, Loading, Screen, Segmented, T, ToggleRow } from '@/components/ui';
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
    setBusy(true);
    reset();
    const res = await cleanDream(text, mood);
    update({ rawText: text, mood, cleanText: res.cleanText, tags: res.tags, analysisIndex: res.analysisIndex });
    setBusy(false);
    setText('');
    router.push('/flow/review');
  };

  if (busy) return <Screen scroll={false}><Loading label={tr.tell.cleaning} /></Screen>;

  return (
    <Screen inTabs footer={mode === 'write' ? <Button label={tr.tell.submit} onPress={submit} disabled={text.trim().length < 10} /> : undefined}>
      <View style={{ gap: 6, paddingTop: space.xl }}>
        <T v="hero">{tr.tell.title}</T>
        <T>{tr.tell.sub}</T>
      </View>

      {features.voice ? (
        <Segmented
          value={mode}
          onChange={setMode}
          options={[
            { key: 'voice', label: tr.tell.voice },
            { key: 'write', label: tr.tell.write },
          ]}
        />
      ) : null}

      {mode === 'voice' ? (
        <View style={styles.voice}>
          <Lib mood={recording ? 'wow' : 'happy'} size={110} bounce={recording} />
          <View style={styles.wave}>
            {Array.from({ length: 19 }, (_, i) => (
              <View
                key={i}
                style={{ width: 7, borderRadius: 4, borderWidth: 1.5, borderColor: c.line, backgroundColor: i % 2 ? palette.purple : palette.lime, height: recording ? 10 + Math.abs(Math.sin(tick * 0.7 + i * 0.8)) * 44 : 8 + (i % 3) * 4 }}
              />
            ))}
          </View>
          <Pressable onPress={toggleRecording} style={[styles.mic, { backgroundColor: recording ? palette.pink : palette.lime, borderColor: c.line, boxShadow: `5px 5px 0 ${c.shadow}` }]}>
            <Icon name={recording ? 'stop' : 'mic'} size={38} color={palette.ink} />
          </Pressable>
          <T v="label">{recording ? tr.tell.listening : tr.tell.tapToSpeak}</T>
        </View>
      ) : (
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder={tr.tell.placeholder}
          placeholderTextColor={c.faint}
          multiline
          style={[styles.input, { backgroundColor: c.card, color: c.text, borderColor: c.line, boxShadow: `4px 4px 0 ${c.shadow}` }]}
        />
      )}

      <Pressable onPress={() => setExtras((e) => !e)} style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
        <Icon name={extras ? 'chevron-down' : 'chevron-forward'} size={16} color={c.muted} />
        <T v="label" color={c.muted}>
          {tr.tell.extras}
        </T>
      </Pressable>

      {extras ? (
        <View style={{ gap: space.md }}>
          <T v="small" color={c.text}>
            {tr.tell.feeling}
          </T>
          <View style={styles.wrap}>
            {tr.tell.feelings.map((f) => (
              <Chip key={f} label={f} selected={mood.feeling === f} onPress={() => setMood((m) => ({ ...m, feeling: m.feeling === f ? undefined : f }))} />
            ))}
          </View>
          <T v="small" color={c.text}>
            {tr.tell.sleep}
          </T>
          <View style={styles.wrap}>
            {tr.tell.sleepOptions.map((s) => (
              <Chip key={s} label={s} selected={mood.sleep === s} onPress={() => setMood((m) => ({ ...m, sleep: s }))} />
            ))}
          </View>
          <ToggleRow label={tr.tell.lucid} value={!!mood.lucid} onChange={(v) => setMood((m) => ({ ...m, lucid: v }))} />
          <ToggleRow label={tr.tell.nightmare} value={!!mood.nightmare} onChange={(v) => setMood((m) => ({ ...m, nightmare: v }))} />
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  voice: { alignItems: 'center', gap: space.lg, paddingVertical: space.md },
  wave: { flexDirection: 'row', alignItems: 'center', gap: 4, height: 60 },
  mic: { width: 92, height: 92, borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 3 },
  input: { minHeight: 180, borderRadius: radius.lg, padding: space.lg, fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, textAlignVertical: 'top', borderWidth: border },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
});
