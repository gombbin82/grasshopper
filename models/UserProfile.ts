export interface UserProfile {
  income?: number;
  netWorth?: number;
  age?: number;
  state?: string;
}

export const createEmptyProfile = (): UserProfile => ({
  income: undefined,
  netWorth: undefined,
  age: undefined,
  state: undefined,
});
