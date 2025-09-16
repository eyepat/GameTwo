import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getCategoryContent} from '../games/content';
import {getCurrentPlayerName, usePlayerStore} from '../store/playerStore';
import {useTranslation} from 'react-i18next';
import SettingsModal from '../components/SettingsModal';

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

export default function GameplayScreen({route, navigation}: Props) {
  const {gameId, categoryId, title} = route.params;
  const {t} = useTranslation();
  const isMindful = gameId === 'mindfulTalk';
  const content = useMemo(
    () => (isMindful ? [] : getCategoryContent(gameId, categoryId)),
    [gameId, categoryId, isMindful, t],
  );
  const mindfulCategories = useMemo(
    () =>
      isMindful
        ? [
            {id: 'kanslor', label: 'Känslor'},
            {id: 'nyfikenhet', label: 'Nyfikenhet'},
            {id: 'mindfulness', label: 'Mindfulness'},
            {id: 'blandad', label: 'Blandad'},
          ]
        : [],
    [isMindful],
  );
  const mindfulContent = useMemo(() => {
    if (!isMindful) return {} as Record<string, string[]>;
    return mindfulCategories.reduce<Record<string, string[]>>((acc, cat) => {
      acc[cat.id] = getCategoryContent('mindfulTalk', cat.id);
      return acc;
    }, {});
  }, [isMindful, mindfulCategories, t]);
  const [remainingQuestions, setRemainingQuestions] = useState<Record<string, string[]>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [current, setCurrent] = useState<string | undefined>(() =>
    isMindful ? undefined : content.length ? getRandom(content) : undefined,
  );
  const nextPlayer = usePlayerStore(s => s.nextPlayer);
  const currentPlayer = getCurrentPlayerName();
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

  useEffect(() => {
    if (!isMindful && content?.length) {
      setCurrent(getRandom(content));
    }
  }, [content, isMindful]);

  useEffect(() => {
    if (isMindful) {
      const initial = mindfulCategories.reduce<Record<string, string[]>>((acc, cat) => {
        acc[cat.id] = [...(mindfulContent[cat.id] ?? [])];
        return acc;
      }, {});
      setRemainingQuestions(initial);
      setSelectedCategory(null);
      setCurrent(undefined);
    }
  }, [isMindful, mindfulCategories, mindfulContent]);

  function drawMindfulQuestion(category: string) {
    const source = remainingQuestions[category];
    const fullPool = mindfulContent[category] ?? [];
    const activePool = source && source.length ? source : [...fullPool];
    if (!activePool.length) {
      return;
    }
    const poolCopy = [...activePool];
    const index = Math.floor(Math.random() * poolCopy.length);
    const question = poolCopy.splice(index, 1)[0];
    setRemainingQuestions(prev => ({...prev, [category]: poolCopy}));
    setSelectedCategory(category);
    setCurrent(question);
  }

  function handleCategorySelect(category: string) {
    if (!isMindful) return;
    drawMindfulQuestion(category);
  }

  function handleAnother() {
    if (isMindful) {
      if (selectedCategory) {
        drawMindfulQuestion(selectedCategory);
      }
    } else {
      setCurrent(getRandom(content));
    }
  }

  function handleNext() {
    if (isMindful) {
      nextPlayer();
      setSelectedCategory(null);
      setCurrent(undefined);
    } else {
      setCurrent(getRandom(content));
      nextPlayer();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {isMindful ? (
        <>
          <Text style={styles.playerMessage}>
            {currentPlayer
              ? `${currentPlayer}s tur – välj en av kategorierna.`
              : t('currentPlayer', {name: '-'})}
          </Text>
          <View style={styles.categoryGrid}>
            {mindfulCategories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat.id && styles.categoryButtonActive,
                ]}
                onPress={() => handleCategorySelect(cat.id)}>
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === cat.id && styles.categoryButtonTextActive,
                  ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {current ? <Text style={styles.card}>{current}</Text> : null}
          {current ? (
            <View style={styles.row}>
              <Button title={t('another')} onPress={handleAnother} />
              <Button title={t('next')} onPress={handleNext} />
            </View>
          ) : null}
        </>
      ) : (
        <>
          {current ? <Text style={styles.card}>{current}</Text> : null}
          <Text style={styles.player}>{t('currentPlayer', {name: currentPlayer || '-'})}</Text>
          <View style={styles.row}>
            <Button title={t('another')} onPress={handleAnother} />
            <Button title={t('next')} onPress={handleNext} />
          </View>
        </>
      )}
      <SettingsModal visible={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, gap: 12},
  title: {fontSize: 22, fontWeight: '700'},
  card: {marginTop: 8, fontSize: 18},
  player: {marginTop: 12, fontStyle: 'italic'},
  row: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 16},
  playerMessage: {marginTop: 12, fontSize: 16},
  categoryGrid: {marginTop: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 12},
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
  },
  categoryButtonActive: {backgroundColor: '#111827'},
  categoryButtonText: {fontSize: 16, fontWeight: '600'},
  categoryButtonTextActive: {color: '#FFFFFF'},
});
