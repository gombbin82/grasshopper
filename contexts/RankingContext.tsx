import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OverallRanking, DistributionData } from '../models/Ranking';
import { RankingService } from '../services/RankingService';
import { useProfile } from './ProfileContext';

interface RankingContextType {
  ranking: OverallRanking;
  distributionData: DistributionData | null;
  comparisonType: 'median' | 'average';
  setComparisonType: (type: 'median' | 'average') => void;
  refreshRanking: () => void;
}

const RankingContext = createContext<RankingContextType | undefined>(undefined);

interface RankingProviderProps {
  children: ReactNode;
}

export function RankingProvider({ children }: RankingProviderProps): React.JSX.Element {
  const { profile } = useProfile();
  const [ranking, setRanking] = useState<OverallRanking>({});
  const [comparisonType, setComparisonType] = useState<'median' | 'average'>('median');
  const [distributionData, setDistributionData] = useState<DistributionData | null>(null);

  useEffect(() => {
    refreshRanking();
  }, [profile, comparisonType]);

  const refreshRanking = () => {
    // Calculate overall ranking based on profile
    const newRanking = RankingService.calculateOverallRanking(profile);
    setRanking(newRanking);

    // Get distribution data if we have net worth
    if (profile.netWorth !== undefined) {
      const distribution = RankingService.getDistributionData(profile, comparisonType);
      setDistributionData(distribution);
    } else {
      setDistributionData(null);
    }
  };

  return (
    <RankingContext.Provider
      value={{
        ranking,
        distributionData,
        comparisonType,
        setComparisonType,
        refreshRanking,
      }}
    >
      {children}
    </RankingContext.Provider>
  );
}

export function useRanking(): RankingContextType {
  const context = useContext(RankingContext);
  if (context === undefined) {
    throw new Error('useRanking must be used within a RankingProvider');
  }
  return context;
}
