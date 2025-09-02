import React, {useLayoutEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {gameGroups} from '../games/groups';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import GameCard from '../components/GameCard';
import SettingsModal from '../components/SettingsModal';

type RootStackParamList = {
  PlayerSetup: undefined;
  MainCategories: undefined;
  GroupGames: {groupId: string};
  CategoryList: {gameId: string};
  Gameplay: {gameId: string; categoryId: string; title: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'GroupGames'>;

export default function GroupGamesScreen({route, navigation}: Props) {
  const {groupId} = route.params;
  const {t} = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const group = useMemo(() => gameGroups.find(g => g.id === groupId), [groupId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setSettingsOpen(true)}>
          <Text style={{fontSize: 18}}>⚙️</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (!group) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(group.titleKey)}</Text>
      <FlatList
        data={group.games}
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
  title: {fontSize: 22, fontWeight: '700', marginBottom: 8},
});

