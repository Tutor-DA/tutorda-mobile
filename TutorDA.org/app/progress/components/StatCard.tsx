import React from 'react';
import { View, Text } from 'react-native';

export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <View
      style={{
        backgroundColor: '#F1F5F9',
        padding: 12,
        borderRadius: 8,
        width: '30%',
      }}
    >
      <Text style={{ fontSize: 14, color: '#64748B' }}>{title}</Text>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{value}</Text>
    </View>
  );
}
