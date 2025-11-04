import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface CompareToggleProps {
  onSelectionChange?: (selection: 'median' | 'average') => void;
}

export default function CompareToggle({ onSelectionChange }: CompareToggleProps): React.JSX.Element {
  const [selected, setSelected] = useState<'median' | 'average'>('median');

  const handleSelection = (option: 'median' | 'average') => {
    setSelected(option);
    onSelectionChange?.(option);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Compare Against</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.option, selected === 'median' && styles.activeOption]}
          onPress={() => handleSelection('median')}
        >
          <Text style={selected === 'median' ? styles.activeOptionText : styles.optionText}>
            Median
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.option, selected === 'average' && styles.activeOption]}
          onPress={() => handleSelection('average')}
        >
          <Text style={selected === 'average' ? styles.activeOptionText : styles.optionText}>
            Average
          </Text>
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
