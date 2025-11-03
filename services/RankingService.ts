import { UserProfile } from '../models/UserProfile';
import {
  OverallRanking,
  NetWorthRanking,
  IncomeRanking,
  AgeGroupRanking,
  StateRanking,
  DistributionData,
} from '../models/Ranking';

export class RankingService {
  /**
   * Calculate overall ranking based on user profile
   * Returns rankings for all available data points
   */
  static calculateOverallRanking(profile: UserProfile): OverallRanking {
    const ranking: OverallRanking = {};

    if (profile.netWorth !== undefined) {
      ranking.netWorth = this.calculateNetWorthRanking(profile.netWorth);
    }

    if (profile.income !== undefined) {
      ranking.income = this.calculateIncomeRanking(profile.income);
    }

    if (profile.age !== undefined) {
      ranking.ageGroup = this.calculateAgeGroupRanking(profile.age);
    }

    if (profile.state !== undefined) {
      ranking.state = this.calculateStateRanking(profile.state, profile.netWorth);
    }

    return ranking;
  }

  /**
   * Calculate net worth ranking
   * TODO: Implement actual ranking logic
   */
  static calculateNetWorthRanking(netWorth: number): NetWorthRanking {
    // Placeholder implementation
    return {
      netWorth,
      rank: 1234567,
      totalPopulation: 300000000,
      percentile: 78.5,
    };
  }

  /**
   * Calculate income ranking
   * TODO: Implement actual ranking logic
   */
  static calculateIncomeRanking(income: number): IncomeRanking {
    // Placeholder implementation
    return {
      income,
      rank: 5000000,
      totalPopulation: 300000000,
      percentile: 65.0,
    };
  }

  /**
   * Calculate age group ranking
   * TODO: Implement actual ranking logic
   */
  static calculateAgeGroupRanking(age: number): AgeGroupRanking {
    // Placeholder implementation
    const ageGroup = this.determineAgeGroup(age);
    return {
      age,
      ageGroup,
      rank: 2000000,
      totalPopulation: 300000000,
      percentile: 72.0,
    };
  }

  /**
   * Calculate state-specific ranking
   * TODO: Implement actual ranking logic
   */
  static calculateStateRanking(state: string, netWorth?: number): StateRanking {
    // Placeholder implementation
    return {
      state,
      rank: 50000,
      totalPopulation: 10000000,
      statePopulation: 10000000,
      percentile: 80.0,
    };
  }

  /**
   * Get distribution data for visualization
   * TODO: Implement actual distribution calculation
   */
  static getDistributionData(
    profile: UserProfile,
    comparisonType: 'median' | 'average'
  ): DistributionData {
    // Placeholder implementation
    return {
      percentile: 21.5,
      comparisonType,
      chartData: [10, 20, 40, 80, 100, 80, 40, 20, 10],
    };
  }

  /**
   * Determine age group from age
   * Helper method for age-based rankings
   */
  private static determineAgeGroup(age: number): string {
    if (age < 25) return '18-24';
    if (age < 35) return '25-34';
    if (age < 45) return '35-44';
    if (age < 55) return '45-54';
    if (age < 65) return '55-64';
    return '65+';
  }

  /**
   * Format ranking as ordinal string (e.g., "1st", "2nd", "3rd")
   * Helper method for display
   */
  static formatRankOrdinal(rank: number): string {
    const j = rank % 10;
    const k = rank % 100;

    if (j === 1 && k !== 11) {
      return `${rank}st`;
    }
    if (j === 2 && k !== 12) {
      return `${rank}nd`;
    }
    if (j === 3 && k !== 13) {
      return `${rank}rd`;
    }
    return `${rank}th`;
  }

  /**
   * Format large numbers with commas
   * Helper method for display
   */
  static formatNumber(num: number): string {
    return num.toLocaleString('en-US');
  }
}
