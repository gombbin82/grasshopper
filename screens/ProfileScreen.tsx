import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { useProfile } from '../contexts/ProfileContext';

export default function ProfileScreen(): React.JSX.Element {
  const { profile, updateProfile } = useProfile();

  const handleIncomeChange = (value: string) => {
    const numValue = value ? parseFloat(value) : undefined;
    updateProfile({ ...profile, income: numValue });
  };

  const handleNetWorthChange = (value: string) => {
    const numValue = value ? parseFloat(value) : undefined;
    updateProfile({ ...profile, netWorth: numValue });
  };

  const handleAgeChange = (value: string) => {
    const numValue = value ? parseInt(value, 10) : undefined;
    updateProfile({ ...profile, age: numValue });
  };

  const handleStateChange = (value: string) => {
    updateProfile({ ...profile, state: value || undefined });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Profile Information</Text>
        <Text style={styles.subtitle}>
          Fill in your information to see your ranking. All fields are optional.
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Annual Income</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your annual income"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            value={profile.income?.toString() || ''}
            onChangeText={handleIncomeChange}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Net Worth</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your net worth"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            value={profile.netWorth?.toString() || ''}
            onChangeText={handleNetWorthChange}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            value={profile.age?.toString() || ''}
            onChangeText={handleAgeChange}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your state (e.g., CA, NY)"
            placeholderTextColor="#999999"
            autoCapitalize="characters"
            maxLength={2}
            value={profile.state || ''}
            onChangeText={handleStateChange}
          />
        </View>
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
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 30,
    lineHeight: 20,
  },
  formGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});
