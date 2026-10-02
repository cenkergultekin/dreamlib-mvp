import { Tabs } from 'expo-router';

import { TabBar } from '@/components/tab-bar';
import { features } from '@/config/features';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" options={{ href: features.explore ? undefined : null }} />
      <Tabs.Screen name="tell" />
      <Tabs.Screen name="matches" options={{ href: features.matching ? undefined : null }} />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
