export interface UserProfile {
  country: string;
  income?: number;
  netWorth?: number;
  age?: number;
  state?: string;
}

export const createEmptyProfile = (): UserProfile => ({
  country: "US",
  income: undefined,
  netWorth: undefined,
  age: undefined,
  state: undefined,
});
