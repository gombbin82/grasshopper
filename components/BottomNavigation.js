import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function BottomNavigation() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.activeIcon}>🏠</Text>
        <Text style={styles.activeLabel}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.icon}>📊</Text>
        <Text style={styles.label}>Stats</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.icon}>⚙️</Text>
        <Text style={styles.label}>Settings</Text>
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
