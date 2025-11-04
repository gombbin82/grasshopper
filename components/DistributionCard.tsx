import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { netWorthData } from '../data/sampleData';
import { generateSkewedBellCurve } from '../src/functions/distributionUtils';

export default function DistributionCard(): React.JSX.Element {
  const userPercentile = ((netWorthData.totalUsers - netWorthData.userRank) / netWorthData.totalUsers * 100).toFixed(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distribution Analysis</Text>
      <Text style={styles.subtitle}>
        You're in the top <Text style={styles.percentage}>{userPercentile}%</Text>
      </Text>

      <View style={styles.chartContainer}>
        <Svg height="150" width="100%" viewBox="0 0 300 150">
          <Path
            d={generateSkewedBellCurve()}
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
