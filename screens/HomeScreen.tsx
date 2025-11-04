import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import NetWorthCard from '../components/NetWorthCard';
import CompareToggle from '../components/CompareToggle';
import DistributionCard from '../components/DistributionCard';

export default function HomeScreen(): React.JSX.Element {
  const [comparisonType, setComparisonType] = useState<'median' | 'average'>('median');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <NetWorthCard />
        <CompareToggle onSelectionChange={setComparisonType} />
        <DistributionCard comparisonType={comparisonType} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    paddingHorizontal: 20,
  },
});
