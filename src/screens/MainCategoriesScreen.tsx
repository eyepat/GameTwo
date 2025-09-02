import React, {useLayoutEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {gameGroups} from '../games/groups';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import SettingsModal from '../components/SettingsModal';
import CategoryCard from '../components/CategoryCard';
import {groupIcons} from '../assets/icons';

type RootStackParamList = {
  PlayerSetup: undefined;
  MainCategories: undefined;
  GroupGames: {groupId: string};
  CategoryList: {gameId: string};
  Gameplay: {gameId: string; categoryId: string; title: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'MainCategories'>;

export default function MainCategoriesScreen({navigation}: Props) {
  const {t} = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const groups = useMemo(() => gameGroups, []);

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
      <Text style={styles.title}>{t('categoriesTitle')}</Text>
      <FlatList
        data={groups}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CategoryCard
            title={t(item.titleKey)}
            icon={groupIcons[item.id]?.emoji}
            color={groupIcons[item.id]?.color}
            onPress={() => navigation.navigate('GroupGames', {groupId: item.id})}
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
