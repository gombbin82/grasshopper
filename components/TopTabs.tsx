import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function TopTabs(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.tab, styles.activeTab]}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>💼</Text>
        </View>
        <Text style={styles.activeTabText}>Net Worth</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>📈</Text>
        </View>
        <Text style={styles.tabText}>Income</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>🏦</Text>
        </View>
        <Text style={styles.tabText}>Savings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#00D4FF',
  },
  icon: {
    marginBottom: 5,
  },
  iconText: {
    fontSize: 20,
  },
  tabText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  activeTabText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
