import React, {ReactNode} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  icon?: string;
  color?: string;
  style?: ViewStyle;
  preview?: ReactNode;
};

export default function GameCard({title, onPress, icon, color, style, preview}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}> 
      <View style={[styles.iconWrap, {backgroundColor: color || '#374151'}]}>
        {preview ? preview : <Text style={styles.iconText}>{icon ?? '🎮'}</Text>}
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 12,
    margin: 6,
    backgroundColor: '#1F2937',
    flex: 1,
  },
  iconWrap: {
    width: '100%',
    aspectRatio: 1.4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {fontSize: 28, color: '#F9FAFB'},
  title: {fontSize: 14, fontWeight: '600', marginTop: 8, color: '#F9FAFB', textAlign: 'center'},
});
