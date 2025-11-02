import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function NetWorthCard() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>📈</Text>
      </View>

      <Text style={styles.title}>NET WORTH RANKING</Text>

      <Text style={styles.ranking}>1234567th</Text>

      <Text style={styles.subtitle}>
        out of <Text style={styles.total}>300,000,000</Text>
      </Text>
    </View>
  );
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
