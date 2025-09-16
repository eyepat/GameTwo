import React, {useLayoutEffect, useMemo, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {useTranslation} from 'react-i18next';
import {games} from '../games';
import CategoryCard from '../components/CategoryCard';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {categoryProductId, useGameStore} from '../store/gameStore';
import PurchaseModal from '../components/PurchaseModal';
import SettingsModal from '../components/SettingsModal';

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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mindfulInfoVisible, setMindfulInfoVisible] = useState(false);
  const [pendingStart, setPendingStart] = useState<{
    gameId: string;
    categoryId: string;
    title: string;
  } | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setSettingsOpen(true)}>
          <Text style={{fontSize: 18}}>⚙️</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
          const displayTitle = item.titleKey ? t(item.titleKey) : item.title;
          return (
            <CategoryCard
              title={displayTitle + (item.premium ? ` (${t('premium')})` : '')}
              locked={locked}
              onPress={() => {
                if (locked) {
                  setModalState({productId, title: item.title});
                } else {
                  const payload = {
                    gameId: game.id,
                    categoryId: item.id,
                    title: displayTitle,
                  };
                  if (game.id === 'mindfulTalk') {
                    setPendingStart(payload);
                    setMindfulInfoVisible(true);
                  } else {
                    navigation.navigate('Gameplay', payload);
                  }
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
      <SettingsModal visible={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <Modal
        visible={mindfulInfoVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setMindfulInfoVisible(false);
          setPendingStart(null);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{t('mindfulTalkIntro')}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                if (pendingStart) {
                  navigation.navigate('Gameplay', pendingStart);
                }
                setMindfulInfoVisible(false);
                setPendingStart(null);
              }}>
              <Text style={styles.modalButtonText}>{t('ok')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 22, fontWeight: '700', marginBottom: 8},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 360,
  },
  modalText: {fontSize: 16, marginBottom: 16, textAlign: 'center'},
  modalButton: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#111827',
    borderRadius: 8,
  },
  modalButtonText: {color: '#fff', fontSize: 16, fontWeight: '700'},
});
