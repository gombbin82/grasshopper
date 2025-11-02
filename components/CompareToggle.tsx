import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function CompareToggle(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Compare Against</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity style={[styles.option, styles.activeOption]}>
          <Text style={styles.activeOptionText}>Median</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Average</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  activeOption: {
    backgroundColor: '#00D4FF',
  },
  optionText: {
    fontSize: 15,
    color: '#666666',
    fontWeight: '500',
  },
  activeOptionText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
