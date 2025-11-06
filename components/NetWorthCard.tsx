import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRanking } from '../contexts/RankingContext';
import { Category } from '../models/Ranking';
import { RankingService } from '../services/RankingService';

export default function NetWorthCard(): React.JSX.Element {
  const { rank, category } = useRanking();

  const title = category === Category.NET_WORTH ? 'NET WORTH RANKING' : 'INCOME RANKING';
  const icon = category === Category.NET_WORTH ? '💰' : '📈';

  const rankNumber = rank?.all.data.rank;
  const population = rank?.all.data.population;

  const formattedRank = rankNumber ? formatRankOrdinal(rankNumber) : '—';
  const formattedPopulation = population ? RankingService.formatNumber(population) : '—';

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.ranking}>{formattedRank}</Text>

      <Text style={styles.subtitle}>
        out of <Text style={styles.total}>{formattedPopulation}</Text>
      </Text>
    </View>
  );
}

function formatRankOrdinal(rank: number): string {
  const j = rank % 10;
  const k = rank % 100;

  if (j === 1 && k !== 11) {
    return `${RankingService.formatNumber(rank)}st`;
  }
  if (j === 2 && k !== 12) {
    return `${RankingService.formatNumber(rank)}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${RankingService.formatNumber(rank)}rd`;
  }
  return `${RankingService.formatNumber(rank)}th`;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E2A5E',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    fontSize: 13,
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 15,
    fontWeight: '600',
  },
  ranking: {
    fontSize: 64,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAACC',
  },
  total: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
