import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {Category, Group, RankRequest, RankResult} from '../models/Ranking';
import {RankingService} from '../services/RankingService';
import {useProfile} from './ProfileContext';
import {Percentiles} from "../data/DataFile";

interface RankingContextType {
  rank: RankResult | undefined;
  distributionData: Percentiles | null;
  category: Category;
  setCategory: (category: Category) => void;
  refreshRanking: () => void;
}

const RankingContext = createContext<RankingContextType | undefined>(undefined);

interface RankingProviderProps {
  children: ReactNode;
}

export function RankingProvider({children}: RankingProviderProps): React.JSX.Element {
  const {profile} = useProfile();
  const [rank, setRank] = useState<RankResult>();
  const [category, setCategory] = useState<Category>(Category.NET_WORTH);
  const [distributionData, setDistributionData] = useState<Percentiles | null>(null);

  useEffect(() => {
    refreshRanking();
  }, [profile, category]);

  const refreshRanking = () => {
    // Create rank request with current rankType
    const rankRequest: RankRequest = {
      type: {
        group: Group.ALL,
        category: category
      },
      userProfile: profile,
    };

    // Calculate ranking based on rank request
    const rankResult = RankingService.calculateRanks(rankRequest);
    setRank(rankResult);
    setDistributionData(rankResult.all.data.percentiles);
  };

  return (
      <RankingContext.Provider
          value={{
            rank: rank,
            distributionData,
            category,
            setCategory,
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
