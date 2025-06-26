import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width - 32;

export default function ProgressChart() {
  return (
    <View>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: [20, 45, 28, 80, 99, 43, 50] }],
        }}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
          labelColor: () => '#334155',
        }}
        style={{ borderRadius: 8 }}
      />
    </View>
  );
}
