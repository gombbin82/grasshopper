export interface RankingResult {
  rank: number;
  totalPopulation: number;
  percentile: number;
}

export interface NetWorthRanking extends RankingResult {
  netWorth: number;
}

export interface IncomeRanking extends RankingResult {
  income: number;
}

export interface AgeGroupRanking extends RankingResult {
  age: number;
  ageGroup: string;
}

export interface StateRanking extends RankingResult {
  state: string;
  statePopulation: number;
}

export interface OverallRanking {
  netWorth?: NetWorthRanking;
  income?: IncomeRanking;
  ageGroup?: AgeGroupRanking;
  state?: StateRanking;
}

export interface DistributionData {
  percentile: number;
  comparisonType: 'median' | 'average';
  chartData: number[];
}

// Always