import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AuthContext, { AuthProvider } from './src/context/auth';
import { AccountScreen } from './src/screens/AccountScreen'
import { CreateScreen } from './src/screens/CreateScreen'
import { SigninScreen } from './src/screens/SigninScreen'
import { SignupScreen } from './src/screens/SignupScreen'
import { TrackDetailScreen } from './src/screens/TrackDetailScreen'
import { TrackListScreen } from './src/screens/TrackListScreen'
import { 
  AuthStackParamList, 
  MainTabsParamList, 
  RootDrawerParamList, 
  TracksStackParamList 
} from './src/types/Navigation'
import { Text } from 'react-native';

const Root = createDrawerNavigator<RootDrawerParamList>()
const Auth = createStackNavigator<AuthStackParamList>()
const Main = createBottomTabNavigator<MainTabsParamList>()
const Tracks = createStackNavigator<TracksStackParamList>()

const AuthStackScreen = () => {
  return (
    <Auth.Navigator initialRouteName='SignIn'>
      <Auth.Screen name="SignIn" component={SigninScreen} options={{ headerShown: false }}></Auth.Screen>
      <Auth.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }}></Auth.Screen>
    </Auth.Navigator>
  )
}


const MainTabsScreen = () => {
  return (
    <Main.Navigator>
      <Main.Screen name="Account" component={AccountScreen}></Main.Screen>
      <Main.Screen name="CreateTrack" component={CreateScreen}></Main.Screen>
      <Main.Screen name="Tracks" component={TracksStackScreen}></Main.Screen>
    </Main.Navigator>
  )
}

const TracksStackScreen = () => {
  return (
    <Tracks.Navigator>
      <Tracks.Screen name="TrackDetail" component={TrackDetailScreen}></Tracks.Screen>
      <Tracks.Screen name="TrackList" component={TrackListScreen}></Tracks.Screen>
    </Tracks.Navigator>
  )
}

const App = () => {
  const { state } = useContext(AuthContext)

  return (
    <NavigationContainer>
      <Root.Navigator>
        {!state.token ? (
          <Root.Screen name="Auth" component={AuthStackScreen}></Root.Screen>
        ) : (
          <Root.Screen name="Main" component={MainTabsScreen}></Root.Screen>
        )}
      </Root.Navigator>
    </NavigationContainer>
  )
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
)