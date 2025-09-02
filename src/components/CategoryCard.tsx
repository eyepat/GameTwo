import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

type Props = {title: string; locked?: boolean; onPress: () => void; icon?: string; color?: string};

export default function CategoryCard({title, locked, onPress, icon, color}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, locked && styles.locked]}>
      <View style={styles.row}>
        <View style={[styles.iconWrap, {backgroundColor: color || '#F3F4F6'}]}>
          <Text style={styles.iconText}>{icon ?? '🎲'}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        {locked ? <Text style={styles.lock}>🔒</Text> : <View style={{width: 22}} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  locked: {opacity: 0.8},
  row: {flexDirection: 'row', alignItems: 'center', gap: 12},
  iconWrap: {width: 42, height: 42, borderRadius: 10, alignItems: 'center', justifyContent: 'center'},
  iconText: {fontSize: 22},
  title: {fontSize: 16, fontWeight: '600', flex: 1},
  lock: {fontSize: 16},
});

