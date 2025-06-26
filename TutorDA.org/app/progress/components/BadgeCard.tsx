import React from 'react';
import { View, Text } from 'react-native';

export default function BadgeCard({ title }: { title: string }) {
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: '#D1FAE5',
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      <Text style={{ color: '#065F46', fontWeight: 'bold' }}>{title}</Text>
    </View>
  );
}
