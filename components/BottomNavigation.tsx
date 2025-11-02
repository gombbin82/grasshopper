import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

type Screen = 'networth' | 'income' | 'profile' | 'settings';

interface BottomNavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export default function BottomNavigation({ currentScreen, onScreenChange }: BottomNavigationProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onScreenChange('networth')}
      >
        <Text style={currentScreen === 'networth' ? styles.activeIcon : styles.icon}>💼</Text>
        <Text style={currentScreen === 'networth' ? styles.activeLabel : styles.label}>Net Worth</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onScreenChange('income')}
      >
        <Text style={currentScreen === 'income' ? styles.activeIcon : styles.icon}>📈</Text>
        <Text style={currentScreen === 'income' ? styles.activeLabel : styles.label}>Income</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onScreenChange('profile')}
      >
        <Text style={currentScreen === 'profile' ? styles.activeIcon : styles.icon}>👤</Text>
        <Text style={currentScreen === 'profile' ? styles.activeLabel : styles.label}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onScreenChange('settings')}
      >
        <Text style={currentScreen === 'settings' ? styles.activeIcon : styles.icon}>⚙️</Text>
        <Text style={currentScreen === 'settings' ? styles.activeLabel : styles.label}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.5,
  },
  activeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    color: '#999999',
    fontWeight: '500',
  },
  activeLabel: {
    fontSize: 11,
    color: '#00D4FF',
    fontWeight: '600',
  },
});
