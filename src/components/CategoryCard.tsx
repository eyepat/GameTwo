import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

type Props = {title: string; locked?: boolean; onPress: () => void};

export default function CategoryCard({title, locked, onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, locked && styles.locked]}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        {locked ? <Text style={styles.lock}>🔒</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  locked: {
    opacity: 0.8,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  title: {fontSize: 16, fontWeight: '500'},
  lock: {fontSize: 16},
});

