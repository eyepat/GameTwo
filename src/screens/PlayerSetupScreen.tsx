import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import PlayerInput from '../components/PlayerInput';
import {usePlayerStore} from '../store/playerStore';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  PlayerSetup: undefined;
  MainCategories: undefined;
  GroupGames: {groupId: string};
  GameList: undefined;
  CategoryList: {gameId: string};
  Gameplay: {gameId: string; categoryId: string; title: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'PlayerSetup'>;

export default function PlayerSetupScreen({navigation}: Props) {
  const {t} = useTranslation();
  const {players, addPlayer, removePlayer} = usePlayerStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('playerSetupTitle')}</Text>
      <PlayerInput players={players} onAdd={addPlayer} onRemove={removePlayer} />
      <View style={{height: 16}} />
      <Button
        title={t('startGame')}
        onPress={() => navigation.replace('MainCategories')}
        disabled={players.length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, gap: 8, backgroundColor: '#111827'},
  title: {fontSize: 22, fontWeight: '700', marginBottom: 8, color: '#F9FAFB'},
});
