// Features that exist in the UI but may stay closed at launch. Phase 1 shows everything.
export const features = {
  voice: true,
  bedtime: true,
  explore: true,
  matching: true,
  messages: true,
  avatar: true,
  knowledge: true,
  premium: true,
};

export type Feature = keyof typeof features;
