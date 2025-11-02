import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function TopTabs(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backIcon: {
    fontSize: 24,
    color: '#333333',
    marginRight: 8,
  },
  backText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
});
