import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import TopTabs from './components/TopTabs';
import NetWorthCard from './components/NetWorthCard';
import CompareToggle from './components/CompareToggle';
import DistributionCard from './components/DistributionCard';
import BottomNavigation from './components/BottomNavigation';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <TopTabs />
        <NetWorthCard />
        <CompareToggle />
        <DistributionCard />
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
