// app/(tabs)/index.tsx

import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, useColorScheme } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import the theme components and Colors
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import YouTag from '@/components/you-tag';
import { Colors } from '@/constants/theme';
import { useNetWorth } from '@/context/NetWorthContext';
import SCF_DATA from '@/data/scf_2023.json';
const NET_WORTH_DATA = SCF_DATA.networth;

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  const { netWorth, income } = useNetWorth();
  const [calculationMode, setCalculationMode] = React.useState<'median' | 'average'>('median');
  const [activeTab, setActiveTab] = React.useState<'netWorth' | 'income'>('netWorth');

  // Generate chart data from real SCF 2023 data
  // We select 10 points: 10th, 20th, ..., 90th, 99th percentiles
  const chartPoints = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.99];
  const chartData = chartPoints.map(p => {
    const item = NET_WORTH_DATA.find(d => d.pct === p);
    return item ? item.x : 0;
  });

  const maxValue = Math.max(...chartData);

  // Calculate Median (50th percentile)
  const medianValue = NET_WORTH_DATA.find(d => d.pct === 0.5)?.x || 0;

  // Calculate Average (Mean) - Approximate using trapezoidal rule integration
  const averageValue = React.useMemo(() => {
    let sum = 0;
    let prevPct = 0;
    // We'll assume the value is constant for the interval (Left Riemann sum) or use Trapezoidal
    // Given the data is percentiles, Trapezoidal is better.
    // We need to handle the start (0 to 0.005). Let's assume it matches 0.005 value or linear from min?
    // Let's just iterate through the data points.
    let prevVal = NET_WORTH_DATA[0].x;

    // Add the first chunk (0 to 0.005) assuming it's roughly the same as the first point
    sum += NET_WORTH_DATA[0].x * NET_WORTH_DATA[0].pct;
    prevPct = NET_WORTH_DATA[0].pct;

    for (let i = 1; i < NET_WORTH_DATA.length; i++) {
      const current = NET_WORTH_DATA[i];
      const width = current.pct - prevPct;
      const avgHeight = (prevVal + current.x) / 2;
      sum += avgHeight * width;

      prevPct = current.pct;
      prevVal = current.x;
    }

    // Add the last chunk (0.995 to 1.0). This is the heavy tail.
    // We don't have data for 1.0. It's likely much higher.
    // For now, we'll just extend the last value (conservative estimate)
    sum += prevVal * (1 - prevPct);

    return sum;
  }, []);

  // Calculate user's percentile
  const calculatePercentile = (value: number) => {
    if (value <= NET_WORTH_DATA[0].x) return 0;
    if (value >= NET_WORTH_DATA[NET_WORTH_DATA.length - 1].x) return 99.9;

    for (let i = 0; i < NET_WORTH_DATA.length - 1; i++) {
      if (value >= NET_WORTH_DATA[i].x && value < NET_WORTH_DATA[i + 1].x) {
        return NET_WORTH_DATA[i].pct * 100;
      }
    }
    return 0;
  };

  // Format currency values
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    if (value < 0) {
      return `-$${Math.abs(value).toFixed(0)}`;
    }
    return `$${value.toFixed(0)}`;
  };

  const userValue = activeTab === 'netWorth' ? netWorth : income; // TODO: Add income data
  const userPercentile = calculatePercentile(userValue);

  // Calculate "You" position
  const getExactIndex = (pct: number) => {
    if (pct >= 99) return 9;
    if (pct <= 10) return 0;
    return (pct - 10) / 10;
  };

  const youBarIndex = getExactIndex(userPercentile);

  // Interpolate value for pointer height
  const lowerIndex = Math.floor(youBarIndex);
  const upperIndex = Math.ceil(youBarIndex);
  const fraction = youBarIndex - lowerIndex;
  const valLower = chartData[lowerIndex] || 0;
  const valUpper = chartData[upperIndex] || valLower;
  const youBarValue = valLower + (valUpper - valLower) * fraction;

  const chartHeight = 220;
  const chartWidth = screenWidth - 80;

  // Calculate pointer height to touch the top of the bar
  // The chart drawing area is roughly height * 0.85 (leaving room for labels)
  // With fromZero, the bar starts at bottom.
  // We need to experiment with the factor.
  const drawingHeight = chartHeight * 0.95; // Increased usage of height
  const barHeight = (youBarValue / maxValue) * drawingHeight;
  const tagTop = 0;
  const pointerHeight = (chartHeight - barHeight) - 25; // -25 to account for tag height/padding

  const chartConfig = {
    backgroundColor: themeColors.secondaryBackground,
    backgroundGradientFrom: themeColors.secondaryBackground,
    backgroundGradientTo: themeColors.secondaryBackground,
    decimalPlaces: 0,
    color: (opacity = 1) => themeColors.tint,
    labelColor: (opacity = 1) => themeColors.subtleText,
    style: { borderRadius: 0 },
    barPercentage: 0.95,
    propsForBackgroundLines: { strokeWidth: "0" },
    fillShadowGradientFrom: themeColors.tint,
    fillShadowGradientTo: themeColors.tint,
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
  };

  const insets = useSafeAreaInsets();

  const population = SCF_DATA.population;
  // Calculate ranking (1 is top, population is bottom)
  // If percentile is 99, you are in top 1%, so rank is roughly population * 0.01
  // If percentile is 0, you are bottom, so rank is population
  const ranking = Math.max(1, Math.round(population * (1 - userPercentile / 100)));

  return (
    // This ThemedView is the main container, set to flex: 1
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Navigation Tabs (Net Worth, Income) */}
      <View style={[styles.navTabs, { borderBottomColor: themeColors.buttonBackground }]}>
        <TouchableOpacity
          style={[activeTab === 'netWorth' ? styles.navTabActive : styles.navTab, activeTab === 'netWorth' && { borderBottomColor: themeColors.tint }]}
          onPress={() => setActiveTab('netWorth')}
        >
          <ThemedText style={activeTab === 'netWorth' ? styles.navTabTextActive : { color: themeColors.subtleText, fontSize: 16, fontWeight: '500' }}>
            Net Worth
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[activeTab === 'income' ? styles.navTabActive : styles.navTab, activeTab === 'income' && { borderBottomColor: themeColors.tint }]}
          onPress={() => setActiveTab('income')}
        >
          <ThemedText style={activeTab === 'income' ? styles.navTabTextActive : { color: themeColors.subtleText, fontSize: 16, fontWeight: '500' }}>
            Income
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* The ScrollView renders directly after the tabs */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {/* Ranking Card */}
        <ThemedView style={[styles.card, { backgroundColor: themeColors.secondaryBackground }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
            <ThemedText style={[styles.rankingNumber, { color: themeColors.tint }]}>
              {ranking.toLocaleString()}
            </ThemedText>
            <ThemedText style={[styles.rankingTh, { color: themeColors.tint, marginTop: 10 }]}>th</ThemedText>
          </View>
          <ThemedText style={[styles.rankingTotal, { color: themeColors.subtleText }]}>
            out of {population.toLocaleString()}
          </ThemedText>
        </ThemedView>
        {/* Distribution Card */}
        <ThemedView style={[styles.card, { backgroundColor: themeColors.secondaryBackground }]}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Distribution</ThemedText>
          <ThemedText style={[styles.cardSubtitle, { color: themeColors.subtleText }]}>
            Population by {activeTab === 'netWorth' ? 'net worth' : 'income'}.
          </ThemedText>

          <View style={styles.chartContainer}>
            <View style={{ width: chartWidth, alignSelf: 'center' }}>
              <BarChart
                data={{
                  labels: ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "99%"],
                  datasets: [{
                    data: chartData,
                  }],
                }}
                width={chartWidth}
                height={chartHeight}
                yAxisLabel=""
                yAxisSuffix=""
                withInnerLines={false}
                showValuesOnTopOfBars={false}
                chartConfig={chartConfig}
                style={{
                  borderRadius: 10,
                  paddingRight: 0,
                  paddingTop: 10,
                }}
                fromZero
                withHorizontalLabels={false}
              />

              {/* "You" Indicator positioned dynamically above a bar */}
              <YouTag
                youBarIndex={youBarIndex}
                numberOfBars={10}
                chartWidth={chartWidth}
                tagTop={tagTop}
                pointerHeight={pointerHeight}
                barPercentage={0.95}
              />
            </View>
          </View>
        </ThemedView>

        {/* Top 15% Card */}
        <ThemedView style={[styles.card, { backgroundColor: themeColors.secondaryBackground }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
                {userPercentile >= 50
                  ? `Top ${Math.max(1, 100 - userPercentile).toFixed(0)}%`
                  : `Bottom ${userPercentile.toFixed(0)}%`}
              </ThemedText>
              <ThemedText style={[styles.cardSubtitle, { color: themeColors.subtleText }]}>Your percentile rank.</ThemedText>
            </View>
            <View style={[styles.percentileControls, { backgroundColor: themeColors.buttonBackground, marginBottom: 0 }]}>
              <TouchableOpacity
                style={[
                  calculationMode === 'median' ? styles.percentileButtonActive : styles.percentileButton,
                  calculationMode === 'median' && { backgroundColor: themeColors.tint }
                ]}
                onPress={() => setCalculationMode('median')}
              >
                <ThemedText style={styles.percentileButtonText}>Median</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  calculationMode === 'average' ? styles.percentileButtonActive : styles.percentileButton,
                  calculationMode === 'average' && { backgroundColor: themeColors.tint }
                ]}
                onPress={() => setCalculationMode('average')}
              >
                <ThemedText style={styles.percentileButtonText}>Average</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.progressBarContainer, { backgroundColor: themeColors.progressBarBackground, marginTop: 15 }]}>
            <View style={[styles.progressBarFill, { backgroundColor: themeColors.tint, width: `${userPercentile}%` }]} />
            <View style={[styles.progressBarThumb, { backgroundColor: themeColors.tint, borderColor: themeColors.text, left: `${userPercentile}%` }]} />
          </View>
          <View style={styles.progressBarLabels}>
            <ThemedText style={[styles.progressBarLabel, { color: themeColors.subtleText }]}>Bottom 0%</ThemedText>
            <ThemedText style={[styles.progressBarLabel, { color: themeColors.subtleText }]}>Top 100%</ThemedText>
          </View>
        </ThemedView>

        {/* Net Worth / Income Details Card */}
        <ThemedView style={[styles.card, { backgroundColor: themeColors.secondaryBackground, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          <ThemedText style={styles.detailLabel}>
            {activeTab === 'netWorth' ? 'Your Net Worth' : 'Your Annual Income'}
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.detailValue}>
            {(activeTab === 'netWorth' ? netWorth : income).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
          </ThemedText>
        </ThemedView>

        {/* Percentile Rank Card */}
        <ThemedView style={[styles.card, { backgroundColor: themeColors.secondaryBackground, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          <ThemedText style={styles.detailLabel}>Percentile Rank</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.detailValue}>{userPercentile.toFixed(1)}<ThemedText style={styles.detailValueSmall}>th</ThemedText></ThemedText>
        </ThemedView>

        {/* Median/Average Net Worth Card */}
        <TouchableOpacity
          onPress={() => setCalculationMode(prev => prev === 'median' ? 'average' : 'median')}
          activeOpacity={0.8}
        >
          <ThemedView style={[styles.card, { backgroundColor: themeColors.secondaryBackground, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View>
              <ThemedText style={styles.detailLabel}>
                {calculationMode === 'median' ? 'Median Net Worth' : 'Average Net Worth'}
              </ThemedText>
              <ThemedText style={[styles.detailValueSmall, { color: themeColors.subtleText }]}>
                {calculationMode === 'median'
                  ? '(50th percentile)'
                  : `(${calculatePercentile(averageValue).toFixed(0)}th percentile)`}
              </ThemedText>
            </View>
            <ThemedText type="defaultSemiBold" style={[styles.detailValue, { textAlign: 'right' }]}>
              {calculationMode === 'median'
                ? formatCurrency(medianValue)
                : formatCurrency(averageValue)}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}
// These styles no longer contain ANY colors,
// as colors are now handled dynamically by the theme.
const styles = StyleSheet.create({
  container: {
    paddingTop: 0, // Removed hardcoded padding
    flex: 1,
  },
  navTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  navTab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  navTabActive: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
  },
  navTabTextActive: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 30, // Add some padding at the very bottom
  },
  card: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  rankingNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    lineHeight: 44,
  },
  rankingTh: {
    fontSize: 20,
    fontWeight: 'normal',
  },
  rankingTotal: {
    fontSize: 14,
    flexShrink: 1,
    textAlign: 'center',
    marginTop: 5,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  youIndicator: {
    backgroundColor: '#34C759',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    zIndex: 1,
  },
  youIndicatorLine: {
    width: 2,
    height: 150,
    backgroundColor: '#34C759',
    marginTop: -18,
  },
  percentileControls: {
    flexDirection: 'row',
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  percentileButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  percentileButtonActive: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  percentileButtonText: {
    fontSize: 14,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 5,
    position: 'relative',
  },
  progressBarFill: {
    width: '85%',
    height: '100%',
    borderRadius: 4,
  },
  progressBarThumb: {
    position: 'absolute',
    left: '85%',
    top: -5,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    transform: [{ translateX: -9 }],
  },
  progressBarLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBarLabel: {
    fontSize: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  detailLabel: {
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
  },
  detailValueSmall: {
    fontSize: 12,
    fontWeight: 'normal',
  },

  youText: {
    backgroundColor: '#34C759',
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    overflow: 'hidden',
  },
  youArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#34C759',
    marginTop: -1,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 5,
  }
});