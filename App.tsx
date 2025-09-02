import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PlayerSetupScreen from './src/screens/PlayerSetupScreen';
import GameListScreen from './src/screens/GameListScreen';
import CategoryListScreen from './src/screens/CategoryListScreen';
import GameplayScreen from './src/screens/GameplayScreen';
import {initI18n} from './src/i18n/i18n';
import MainCategoriesScreen from './src/screens/MainCategoriesScreen';
import GroupGamesScreen from './src/screens/GroupGamesScreen';

initI18n();

export type RootStackParamList = {
  PlayerSetup: undefined;
  MainCategories: undefined;
  GroupGames: {groupId: string};
  GameList: undefined;
  CategoryList: {gameId: string};
  Gameplay: {gameId: string; categoryId: string; title: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PlayerSetup">
          <Stack.Screen name="PlayerSetup" component={PlayerSetupScreen} options={{title: ''}} />
          <Stack.Screen name="MainCategories" component={MainCategoriesScreen} options={{title: ''}} />
          <Stack.Screen name="GroupGames" component={GroupGamesScreen} options={{title: ''}} />
          <Stack.Screen name="GameList" component={GameListScreen} options={{title: ''}} />
          <Stack.Screen name="CategoryList" component={CategoryListScreen} options={{title: ''}} />
          <Stack.Screen name="Gameplay" component={GameplayScreen} options={{title: ''}} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
