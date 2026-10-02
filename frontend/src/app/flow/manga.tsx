import { Redirect, router } from 'expo-router';
import { useEffect, useEffectEvent, useState } from 'react';

import { MangaPage } from '@/components/manga-page';
import { Button, Loading, Screen, Segmented, TopBar } from '@/components/ui';
import { tr } from '@/i18n/tr';
import { generateManga, saveDream } from '@/services/api';
import type { Visibility } from '@/services/types';
import { useDraft } from '@/state/draft';

export default function Manga() {
  const { draft, update, reset } = useDraft();
  const [saving, setSaving] = useState(false);
  const [round, setRound] = useState(0);
  const [drawnRound, setDrawnRound] = useState(-1);
  const draw = useEffectEvent(() => generateManga(draft.analysisIndex + round, draft.style, draft.panelCount, draft.withAvatar));

  useEffect(() => {
    let alive = true;
    draw().then((panels) => {
      if (!alive) return;
      update({ panels });
      setDrawnRound(round);
    });
    return () => {
      alive = false;
    };
    // update comes from context and changes every render; redraw only when round changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  if (!draft.analysis) return <Redirect href="/tell" />;
  if (drawnRound !== round)
    return (
      <Screen scroll={false}>
        <Loading label={tr.style.drawing} />
      </Screen>
    );

  const save = async () => {
    if (saving) return;
    setSaving(true);
    const dream = await saveDream({ rawText: draft.rawText, analysis: draft.analysis!, panels: draft.panels, style: draft.style, visibility: draft.visibility });
    reset();
    // Leave the flow: back to the tabs, then open the saved dream.
    router.dismissTo('/');
    router.push({ pathname: '/dream/[id]', params: { id: dream.id } });
  };

  return (
    <Screen
      footer={
        <>
          <Button label={tr.manga.save} icon="bookmark" onPress={save} loading={saving} />
          <Button label={tr.manga.regenerate} variant="ghost" icon="refresh" onPress={() => setRound((r) => r + 1)} />
        </>
      }>
      <TopBar title={draft.analysis.title} />
      <MangaPage panels={draft.panels} withAvatar={draft.withAvatar} />
      <Segmented<Visibility>
        value={draft.visibility}
        onChange={(v) => update({ visibility: v })}
        options={[
          { key: 'private', label: tr.manga.visibility.private },
          { key: 'public', label: tr.manga.visibility.public },
        ]}
      />
    </Screen>
  );
}
