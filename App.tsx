import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { AppProviders } from './providers/AppProviders';
import TopTabs from './components/TopTabs';
import BottomNavigation from './components/BottomNavigation';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

type Screen = 'networth' | 'income' | 'profile' | 'settings';

function AppContent(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<Screen>('networth');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'networth':
        return <HomeScreen />;
      case 'income':
        return <HomeScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return <HomeScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TopTabs />
      </View>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <BottomNavigation
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
      />
    </SafeAreaView>
  );
}

export default function App(): React.JSX.Element {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
});
