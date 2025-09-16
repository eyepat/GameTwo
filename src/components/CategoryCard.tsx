import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

type Props = {title: string; locked?: boolean; onPress: () => void; icon?: string; color?: string};

export default function CategoryCard({title, locked, onPress, icon, color}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, locked && styles.locked]}>
      <View style={styles.row}>
        <View style={[styles.iconWrap, {backgroundColor: color || '#374151'}]}>
          <Text style={styles.iconText}>{icon ?? '🎲'}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        {locked ? <Text style={styles.lock}>🔒</Text> : <View style={{width: 48}} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 14,
    marginVertical: 10,
    backgroundColor: '#1F2937',
  },
  locked: {opacity: 0.7},
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12},
  iconWrap: {width: 48, height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center'},
  iconText: {fontSize: 24, color: '#F9FAFB'},
  title: {fontSize: 18, fontWeight: '700', flex: 1, textAlign: 'center', color: '#F9FAFB'},
  lock: {fontSize: 16, color: '#F9FAFB'},
});
