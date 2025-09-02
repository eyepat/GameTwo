import React, {useMemo, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {games} from '../games';
import CategoryCard from '../components/CategoryCard';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {categoryProductId, useGameStore} from '../store/gameStore';
import PurchaseModal from '../components/PurchaseModal';

type RootStackParamList = {
  PlayerSetup: undefined;
  GameList: undefined;
  CategoryList: {gameId: string};
  Gameplay: {gameId: string; categoryId: string; title: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryList'>;

export default function CategoryListScreen({route, navigation}: Props) {
  const {gameId} = route.params;
  const {t} = useTranslation();
  const game = useMemo(() => games.find(g => g.id === gameId), [gameId]);
  const isUnlocked = useGameStore(s => s.isUnlocked);
  const [modalState, setModalState] = useState<{productId: string; title: string} | null>(null);

  if (!game) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('categoriesTitle')}</Text>
      <FlatList
        data={game.categories}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const productId = categoryProductId(game.id, item.id);
          const locked = Boolean(item.premium) && !isUnlocked(productId);
          return (
            <CategoryCard
              title={item.title + (item.premium ? ` (${t('premium')})` : '')}
              locked={locked}
              onPress={() => {
                if (locked) {
                  setModalState({productId, title: item.title});
                } else {
                  navigation.navigate('Gameplay', {
                    gameId: game.id,
                    categoryId: item.id,
                    title: item.title,
                  });
                }
              }}
            />
          );
        }}
      />
      <PurchaseModal
        visible={!!modalState}
        productId={modalState?.productId ?? ''}
        title={modalState?.title}
        onClose={() => setModalState(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 22, fontWeight: '700', marginBottom: 8},
});

