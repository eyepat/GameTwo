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
  const doodles = useMemo(
    () => [
      {id: 'd1', icon: '🦋', position: styles.mindfulDoodleTopLeft},
      {id: 'd2', icon: '🍦', position: styles.mindfulDoodleTopRight},
      {id: 'd3', icon: '❤️', position: styles.mindfulDoodleBottomLeft},
      {id: 'd4', icon: '⭐', position: styles.mindfulDoodleBottomRight},
      {id: 'd5', icon: '🦄', position: styles.mindfulDoodleMidLeft},
      {id: 'd6', icon: '🌟', position: styles.mindfulDoodleMidRight},
      {id: 'd7', icon: '🍭', position: styles.mindfulDoodleMidTop},
      {id: 'd8', icon: '🎈', position: styles.mindfulDoodleMidBottom},
      {id: 'd9', icon: '✨', position: styles.mindfulDoodleNearBadge},
    ],
    [],
  );

  const mindfulPreview = useMemo(
    () => (
      <View style={styles.mindfulCanvas}>
        {doodles.map(d => (
          <Text key={d.id} style={[styles.mindfulDoodle, d.position]}>{d.icon}</Text>
        ))}
        <View style={styles.mindfulBadgeGrid}>
          {[
            {id: 'kanslor', key: 'mindfulCategories.kanslor', color: '#FECACA'},
            {id: 'nyfikenhet', key: 'mindfulCategories.nyfikenhet', color: '#FEF08A'},
            {id: 'mindfulness', key: 'mindfulCategories.mindfulness', color: '#BFDBFE'},
            {id: 'blandad', key: 'mindfulCategories.blandad', color: '#EDE9FE'},
          ].map(cat => (
            <View key={cat.id} style={[styles.mindfulBadge, {backgroundColor: cat.color}]}> 
              <Text style={styles.mindfulBadgeText}>{t(cat.key)}</Text>
            </View>
          ))}
        </View>
      </View>
    ),
    [t, doodles],
  );

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
            preview={item.id === 'mindfulTalk' ? mindfulPreview : undefined}
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
  container: {flex: 1, padding: 16, backgroundColor: '#111827'},
  title: {fontSize: 22, fontWeight: '700', marginBottom: 8, color: '#F9FAFB'},
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
  mindfulCanvas: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#FEF3C7',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  mindfulBadgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 10,
    rowGap: 10,
  },
  mindfulBadge: {
    flexBasis: '46%',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  mindfulBadgeText: {fontSize: 12, fontWeight: '700', color: '#111827', textAlign: 'center'},
  mindfulDoodle: {
    position: 'absolute',
    fontSize: 18,
    opacity: 0.8,
  },
  mindfulDoodleTopLeft: {top: 6, left: 10},
  mindfulDoodleTopRight: {top: 10, right: 12},
  mindfulDoodleBottomLeft: {bottom: 12, left: 14},
  mindfulDoodleBottomRight: {bottom: 14, right: 12},
  mindfulDoodleMidLeft: {top: '20%', left: 6},
  mindfulDoodleMidRight: {top: '78%', right: 6},
  mindfulDoodleMidTop: {top: '35%', left: '18%'},
  mindfulDoodleMidBottom: {top: '55%', right: '20%'},
  mindfulDoodleNearBadge: {top: '68%', left: '60%'},
});
