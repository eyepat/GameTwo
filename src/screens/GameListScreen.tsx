import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {games} from '../games';
import GameCard from '../components/GameCard';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import i18n from '../i18n/i18n';

type RootStackParamList = {
  PlayerSetup: undefined;
  GameList: undefined;
  CategoryList: {gameId: string};
  Gameplay: {gameId: string; categoryId: string; title: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'GameList'>;

const languages: {code: string; label: string}[] = [
  {code: 'en', label: 'EN'},
  {code: 'sv', label: 'SV'},
  {code: 'es', label: 'ES'},
];

export default function GameListScreen({navigation}: Props) {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('gamesTitle')}</Text>
        <View style={styles.langRow}>
          {languages.map(l => (
            <TouchableOpacity key={l.code} onPress={() => i18n.changeLanguage(l.code)}>
              <Text style={[styles.lang, i18n.language === l.code && styles.langActive]}>{l.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 22, fontWeight: '700'},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8},
  langRow: {flexDirection: 'row', gap: 8},
  lang: {paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: '#ddd', borderRadius: 6},
  langActive: {backgroundColor: '#eee', fontWeight: '700'},
});

