import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useNetWorth } from '@/context/NetWorthContext';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function SettingsScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const themeColors = Colors[colorScheme];
    const { netWorth, income, age, setNetWorth, setIncome, setAge } = useNetWorth();
    const insets = useSafeAreaInsets();

    const [localNetWorth, setLocalNetWorth] = useState('');
    const [localIncome, setLocalIncome] = useState('');
    const [localAge, setLocalAge] = useState('');

    useEffect(() => {
        setLocalNetWorth(netWorth.toString());
        setLocalIncome(income.toString());
        setLocalAge(age.toString());
    }, [netWorth, income, age]);

    const handleSave = () => {
        const nw = parseFloat(localNetWorth);
        const inc = parseFloat(localIncome);
        const ag = parseFloat(localAge);

        if (!isNaN(nw)) {
            setNetWorth(nw);
        }
        if (!isNaN(inc)) {
            setIncome(inc);
        }
        if (!isNaN(ag)) {
            setAge(ag);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}>
                    <ThemedText type="title" style={styles.title}>Settings</ThemedText>

                    <View style={styles.sectionContainer}>
                        <ThemedText style={[styles.sectionHeader, { color: themeColors.subtleText }]}>FINANCIAL DATA</ThemedText>

                        <View style={[styles.card, { backgroundColor: themeColors.secondaryBackground }]}>
                            <View style={[styles.inputRow, { borderBottomColor: themeColors.background, borderBottomWidth: 1 }]}>
                                <View style={styles.iconContainer}>
                                    <IconSymbol name="dollarsign.circle.fill" size={22} color={themeColors.tint} />
                                </View>
                                <View style={styles.inputWrapper}>
                                    <ThemedText style={styles.label}>Net Worth</ThemedText>
                                    <TextInput
                                        style={[styles.input, { color: themeColors.text }]}
                                        value={localNetWorth}
                                        onChangeText={setLocalNetWorth}
                                        keyboardType="numeric"
                                        placeholder="0"
                                        placeholderTextColor={themeColors.subtleText}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputRow}>
                                <View style={styles.iconContainer}>
                                    <IconSymbol name="briefcase.fill" size={22} color={themeColors.tint} />
                                </View>
                                <View style={styles.inputWrapper}>
                                    <ThemedText style={styles.label}>Annual Income</ThemedText>
                                    <TextInput
                                        style={[styles.input, { color: themeColors.text }]}
                                        value={localIncome}
                                        onChangeText={setLocalIncome}
                                        keyboardType="numeric"
                                        placeholder="0"
                                        placeholderTextColor={themeColors.subtleText}
                                    />
                                </View>
                            </View>

                            <View style={[styles.inputRow, { borderTopColor: themeColors.background, borderTopWidth: 1 }]}>
                                <View style={styles.iconContainer}>
                                    <IconSymbol name="calendar" size={22} color={themeColors.tint} />
                                </View>
                                <View style={styles.inputWrapper}>
                                    <ThemedText style={styles.label}>Age</ThemedText>
                                    <TextInput
                                        style={[styles.input, { color: themeColors.text }]}
                                        value={localAge}
                                        onChangeText={setLocalAge}
                                        keyboardType="numeric"
                                        placeholder="0"
                                        placeholderTextColor={themeColors.subtleText}
                                    />
                                </View>
                            </View>
                        </View>

                        <ThemedText style={[styles.helperText, { color: themeColors.subtleText }]}>
                            These values are used to calculate your percentile rank and compare you with others.
                        </ThemedText>
                    </View>

                    <TouchableOpacity
                        style={[styles.saveButton, { backgroundColor: themeColors.tint }]}
                        onPress={handleSave}
                        activeOpacity={0.8}
                    >
                        <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    sectionContainer: {
        marginBottom: 30,
    },
    sectionHeader: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 10,
        marginLeft: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    card: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    iconContainer: {
        width: 30,
        alignItems: 'center',
        marginRight: 12,
    },
    inputWrapper: {
        flex: 1,
    },
    label: {
        fontSize: 13,
        marginBottom: 4,
        fontWeight: '500',
    },
    input: {
        fontSize: 17,
        fontWeight: '400',
        padding: 0,
    },
    helperText: {
        fontSize: 13,
        marginTop: 10,
        marginLeft: 10,
        lineHeight: 18,
    },
    saveButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
    },
});
