import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';

interface YouTagProps {
  youBarIndex: number;
  numberOfBars: number;
  chartWidth: number;
  tagTop: number;
  pointerHeight: number;
  barPercentage?: number;
}

export default function YouTag({ youBarIndex, numberOfBars, chartWidth, tagTop, pointerHeight, barPercentage = 0.95 }: YouTagProps) {
  // Calculate the width of a single slot (bar + gap)
  const slotWidth = chartWidth / numberOfBars;

  // Calculate the actual width of the bar
  const actualBarWidth = slotWidth * barPercentage;

  // Calculate the gap on each side of the bar within the slot
  const gapWidth = (slotWidth - actualBarWidth) / 2;

  // Center of the target bar
  // Start of slot + gap + half bar width
  const youBarCenter = (youBarIndex * slotWidth) + gapWidth + (actualBarWidth / 2);

  return (
    <View
      style={[
        styles.youTagContainer,
        { left: youBarCenter, top: tagTop },
      ]}
    >
      <View style={styles.youTag}>
        <ThemedText style={styles.youTagText} numberOfLines={1}>You</ThemedText>
      </View>
      {/* Dashed line or solid line */}
      <View style={[styles.youPointer, { height: Math.max(10, pointerHeight) }]} />
      {/* Dot at the end */}
      <View style={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  youTagContainer: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: '-50%' }], // Center the container dynamically
    // width: 60, // Removed fixed width
    zIndex: 10,
  },
  youTag: {
    backgroundColor: '#34C759', // Green color
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  youTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  youPointer: {
    width: 2,
    backgroundColor: '#34C759',
    marginTop: -1, // Overlap slightly
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
    marginTop: -1,
  }
});
