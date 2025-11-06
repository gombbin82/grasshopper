import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { generateSkewedBellCurve } from '../src/functions/distributionUtils';
import { useRanking } from '../contexts/RankingContext';

interface DistributionCardProps {
  comparisonType?: 'median' | 'average';
}

export default function DistributionCard({ comparisonType = 'median' }: DistributionCardProps): React.JSX.Element {
  const { rank } = useRanking();

  // Calculate user percentile from rank data
  const userPercentile = rank?.all.data.rankPercentile?.toFixed(1);
  const hasData = rank && userPercentile !== undefined;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distribution Analysis</Text>
      {hasData ? (
        <Text style={styles.subtitle}>
          You're in the top <Text style={styles.percentage}>{100 - parseFloat(userPercentile)}%</Text>
        </Text>
      ) : (
        <Text style={styles.subtitle}>
          Enter your information in the Profile tab to see your ranking
        </Text>
      )}

      <View style={styles.chartContainer}>
        <Svg height="150" width="100%" viewBox="0 0 300 150">
          <Path
            d={generateSkewedBellCurve(comparisonType)}
            stroke="#00D4FF"
            strokeWidth="3"
            fill="rgba(0, 212, 255, 0.15)"
          />
        </Svg>

        <View style={styles.gridLines}>
          {[...Array(5)].map((_, i) => (
            <View key={i} style={styles.gridLine} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  percentage: {
    color: '#00D4FF',
    fontWeight: '600',
  },
  chartContainer: {
    height: 150,
    position: 'relative',
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  gridLine: {
    height: 1,
    backgroundColor: '#E0E0E0',
    opacity: 0.3,
  },
});
