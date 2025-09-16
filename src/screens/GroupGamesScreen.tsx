import React, {useLayoutEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Modal} from 'react-native';
import {useTranslation} from 'react-i18next';
import {gameGroups} from '../games/groups';
import {games as allGames} from '../games';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import GameCard from '../components/GameCard';
import SettingsModal from '../components/SettingsModal';
import {gameIcons} from '../assets/icons';

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

  if (!group) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(group.titleKey)}</Text>
      <FlatList
        data={group.games}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({item}) => (
          <GameCard
            title={t(item.titleKey)}
            icon={gameIcons[item.id]?.emoji}
            color={gameIcons[item.id]?.color}
            style={{flexBasis: '48%'}}
            onPress={() => {
              const def = allGames.find(g => g.id === item.id);
              if (def && def.categories.length === 1) {
                const cat = def.categories[0] as any;
                const title = cat.titleKey ? t(cat.titleKey) : cat.title;
                const payload = {
                  gameId: def.id,
                  categoryId: cat.id,
                  title,
                };
                if (def.id === 'mindfulTalk') {
                  setPendingStart(payload);
                  setMindfulInfoVisible(true);
                } else {
                  navigation.navigate('Gameplay', payload);
                }
              } else {
                navigation.navigate('CategoryList', {gameId: item.id});
              }
            }}
          />
        )}
        columnWrapperStyle={{justifyContent: 'space-between'}}
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
            <Text style={styles.modalText}>
              Spelet har fem kategorier och deltagarna ska i rättordning få välja en kategori som de kommer att få en fråga ifrån där de läser högt för andra spelare och svara på.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                if (pendingStart) {
                  navigation.navigate('Gameplay', pendingStart);
                }
                setMindfulInfoVisible(false);
                setPendingStart(null);
              }}>
              <Text style={styles.modalButtonText}>OK!</Text>
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
