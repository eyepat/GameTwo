import React, {useMemo, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getCategoryContent} from '../games/content';
import {getCurrentPlayerName, usePlayerStore} from '../store/playerStore';
import {useTranslation} from 'react-i18next';

type RootStackParamList = {
  PlayerSetup: undefined;
  GameList: undefined;
  CategoryList: {gameId: string};
  Gameplay: {gameId: string; categoryId: string; title: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Gameplay'>;

function getRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function GameplayScreen({route}: Props) {
  const {gameId, categoryId, title} = route.params;
  const {t} = useTranslation();
  const content = useMemo(() => getCategoryContent(gameId, categoryId), [gameId, categoryId]);
  const [current, setCurrent] = useState<string | undefined>(() => getRandom(content));
  const nextPlayer = usePlayerStore(s => s.nextPlayer);
  const currentPlayer = getCurrentPlayerName();

  function next() {
    setCurrent(getRandom(content));
    nextPlayer();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {current ? <Text style={styles.card}>{current}</Text> : null}
      <Text style={styles.player}>{t('currentPlayer', {name: currentPlayer || '-'})}</Text>
      <View style={styles.row}>
        <Button title={t('another')} onPress={() => setCurrent(getRandom(content))} />
        <Button title={t('next')} onPress={next} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, gap: 12},
  title: {fontSize: 22, fontWeight: '700'},
  card: {marginTop: 8, fontSize: 18},
  player: {marginTop: 12, fontStyle: 'italic'},
  row: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 16},
});

