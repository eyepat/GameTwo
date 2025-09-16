import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  players: string[];
  onAdd: (name: string) => void;
  onRemove: (index: number) => void;
};

export default function PlayerInput({players, onAdd, onRemove}: Props) {
  const {t} = useTranslation();
  const [name, setName] = useState('');

  function add() {
    if (name.trim().length > 0) {
      onAdd(name.trim());
      setName('');
    }
  }

  return (
    <View>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder={t('enterPlayerName')}
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
        />
        <Button title={t('addPlayer')} onPress={add} />
      </View>
      <FlatList
        data={players}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({item, index}) => (
          <View style={styles.playerRow}>
            <Text style={styles.playerText}>{item}</Text>
            <TouchableOpacity onPress={() => onRemove(index)}>
              <Text style={styles.remove}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', gap: 8, alignItems: 'center'},
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4B5563',
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#1F2937',
    color: '#F9FAFB',
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  playerText: {fontSize: 16, color: '#F9FAFB'},
  remove: {fontSize: 18, color: '#F87171', paddingHorizontal: 8},
});
