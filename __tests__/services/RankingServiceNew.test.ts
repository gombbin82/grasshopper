import { RankingService } from '../../services/RankingService';
import { Category, Group, RankRequest } from '../../models/Ranking';
import { UserProfile } from '../../models/UserProfile';

describe('RankingService - New Implementation', () => {
  describe('calculateRanks with INCOME category', () => {
    it('should calculate global income ranking for 50th percentile ($58,000)', () => {
      const userProfile: UserProfile = {
        country: 'US',
        income: 58000,
      };

      const rankRequest: RankRequest = {
        type: {
          category: Category.INCOME,
          group: Group.ALL,
        },
        userProfile,
      };

      const result = RankingService.calculateRanks(rankRequest);

      expect(result.all).toBeDefined();
      expect(result.all.data.rank).toBeDefined();
      expect(result.all.data.rankPercentile).toBe(50);
      expect(result.all.data.population).toBe(8000000000); // Global population
      expect(result.all.data.rank).toBe(4000000000); // (100-50)/100 * 8B
    });

    it('should calculate global income ranking for 0th percentile ($0)', () => {
      const userProfile: UserProfile = {
        country: 'US',
        income: 0,
      };

      const rankRequest: RankRequest = {
        type: {
          category: Category.INCOME,
          group: Group.ALL,
        },
        userProfile,
      };

      const result = RankingService.calculateRanks(rankRequest);

      expect(result.all.data.rankPercentile).toBe(0);
      expect(result.all.data.rank).toBe(8000000000); // (100-0)/100 * 8B
    });

    it('should calculate global income ranking for 100th percentile ($500,000)', () => {
      const userProfile: UserProfile = {
        country: 'US',
        income: 500000,
      };

      const rankRequest: RankRequest = {
        type: {
          category: Category.INCOME,
          group: Group.ALL,
        },
        userProfile,
      };

      const result = RankingService.calculateRanks(rankRequest);

      expect(result.all.data.rankPercentile).toBe(100);
      expect(result.all.data.rank).toBe(0); // (100-100)/100 * 8B
    });

    it('should use linear interpolation for income between percentiles', () => {
      const userProfile: UserProfile = {
        country: 'US',
        income: 58700, // Between 50th ($58,000) and 51st ($59,400)
      };

      const rankRequest: RankRequest = {
        type: {
          category: Category.INCOME,
          group: Group.ALL,
        },
        userProfile,
      };

      const result = RankingService.calculateRanks(rankRequest);

      expect(result.all.data.rankPercentile).toBeCloseTo(50.5, 1);
      expect(result.all.data.rank).toBeCloseTo(3960000000, -7); // (100-50.5)/100 * 8B
    });

    it('should handle undefined income', () => {
      const userProfile: UserProfile = {
        country: 'US',
      };

      const rankRequest: RankRequest = {
        type: {
          category: Category.INCOME,
          group: Group.ALL,
        },
        userProfile,
      };

      const result = RankingService.calculateRanks(rankRequest);

      expect(result.all.data.rank).toBeUndefined();
      expect(result.all.data.rankPercentile).toBeUndefined();
      expect(result.all.data.percentiles).toBeDefined();
      expect(result.all.data.population).toBe(8000000000);
    });
  });

  describe('calculateRanks with NET_WORTH category', () => {
    it('should calculate global net worth ranking', () => {
      const userProfile: UserProfile = {
        country: 'US',
        netWorth: 58000,
      };

      const rankRequest: RankRequest = {
        type: {
          category: Category.NET_WORTH,
          group: Group.ALL,
        },
        userProfile,
      };

      const result = RankingService.calculateRanks(rankRequest);

      expect(result.all).toBeDefined();
      expect(result.all.data.rank).toBeDefined();
      expect(result.all.data.rankPercentile).toBe(50);
      expect(result.all.data.population).toBe(8000000000);
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(RankingService.formatNumber(1000)).toBe('1,000');
      expect(RankingService.formatNumber(1000000)).toBe('1,000,000');
      expect(RankingService.formatNumber(8000000000)).toBe('8,000,000,000');
    });
  });
});
