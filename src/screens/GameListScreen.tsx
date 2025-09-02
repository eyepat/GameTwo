import React, {useLayoutEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {games} from '../games';
import GameCard from '../components/GameCard';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import SettingsModal from '../components/SettingsModal';

type RootStackParamList = {
  PlayerSetup: undefined;
  GameList: undefined;
  CategoryList: {gameId: string};
  Gameplay: {gameId: string; categoryId: string; title: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'GameList'>;

export default function GameListScreen({navigation}: Props) {
  const {t} = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setSettingsOpen(true)}>
          <Text style={{fontSize: 18}}>⚙️</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('gamesTitle')}</Text>
        <View style={styles.langRow} />
      </View>
      <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GameCard
            title={t(item.titleKey)}
            onPress={() => navigation.navigate('CategoryList', {gameId: item.id})}
          />
        )}
      />
      <SettingsModal visible={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 22, fontWeight: '700'},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8},
  langRow: {flexDirection: 'row', gap: 8},
});
