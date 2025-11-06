import {Category, Group, Rank, RankRequest, RankResult, Type,} from '../models/Ranking';
import {
  DistributionDataFile,
  importDistributionDataFile,
  importPopulationDataFile,
  Percentiles,
  PopulationDataFile
} from "../data/DataFile";

const populationDataFile: PopulationDataFile = importPopulationDataFile();

export class RankingService {

  /**
   * Calculate ranking based on rank request
   * Selects appropriate dataset based on rankType
   */
  static calculateRanks(rankRequest: RankRequest): RankResult {
    const {type, userProfile} = rankRequest;
    const distributions = importDistributionDataFile(type)

    // Always calculate overall ranking
    const userNumber = type.category === Category.INCOME ? userProfile.income : userProfile.netWorth;
    const distributionForAll = RankingService.findDistribution(distributions, Group.ALL)
    const allType: Type = {
      category: type.category,
      group: Group.ALL
    }
    const overallRank: Rank = this.calculateRank(distributionForAll, allType, userNumber);

    // TODO: calculate other requests based on rank Request

    return {
      all: overallRank,
      others: []
    }
  }

  static findDistribution(distributions: DistributionDataFile, group: Group): Percentiles {
    const distributionGroups = distributions.distributions

    for (const distributionGroup of distributionGroups) {
      if (distributionGroup.group === group) {
        return distributionGroup.percentiles
      }
    }

    return {}
  }

  static getPopulation(group: Group): number {
    const populationGroups = populationDataFile.populations

    for (const populationGroup of populationGroups) {
      if (populationGroup.group === group) {
        return populationGroup.population
      }
    }
    return 0
  }

  static calculateRank(percentiles: Percentiles, type: Type, userNumber?: number): Rank {
    const population = RankingService.getPopulation(type.group);

    let rank: number | undefined;
    let rankPercentile: number | undefined;

    if (userNumber !== undefined) {
      // Calculate percentile using linear interpolation
      rankPercentile = this.calculatePercentile(percentiles, userNumber);
      // Calculate rank from percentile
      rank = Math.round((100 - rankPercentile) / 100 * population);
    }

    return {
      type: type,
      metadata: {},
      data: {
        percentiles,
        population,
        rank,
        rankPercentile,
      }
    };
  }

  /**
   * Calculate percentile for a given value using linear interpolation
   */
  private static calculatePercentile(percentiles: Percentiles, userValue: number): number {
    // Convert percentiles object to sorted array of [percentile, value] pairs
    const entries = Object.entries(percentiles)
      .map(([p, val]) => [parseFloat(p), val as number])
      .sort((a, b) => a[0] - b[0]);

    // Handle edge cases
    if (userValue <= entries[0][1]) {
      return entries[0][0];
    }
    if (userValue >= entries[entries.length - 1][1]) {
      return entries[entries.length - 1][0];
    }

    // Find the two percentiles that bracket the user value
    for (let i = 0; i < entries.length - 1; i++) {
      const [p1, value1] = entries[i];
      const [p2, value2] = entries[i + 1];

      if (userValue >= value1 && userValue <= value2) {
        // Linear interpolation
        const percentile = p1 + ((userValue - value1) / (value2 - value1)) * (p2 - p1);
        return percentile;
      }
    }

    return 50; // Fallback to median
  }

  /**
   * Format large numbers with commas
   * Helper method for display
   */
  static formatNumber(num: number): string {
    return num.toLocaleString('en-US');
  }
}
