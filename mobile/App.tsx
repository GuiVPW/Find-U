import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Main from './src/pages/Main'
import { StatusBar } from 'expo-status-bar'
import Profile from './src/pages/Profile'

const Stack = createStackNavigator()

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					options={{
						headerTitle: 'DevRadar',
						headerBackTitleVisible: false,
						headerTitleStyle: { alignSelf: 'center', color: '#FFF' },
						headerStyle: {
							backgroundColor: '#7D40E7'
						}
					}}
					name='Home'
					component={Main}
				/>
				<Stack.Screen
					options={{
						headerTitle: 'Perfil',
						headerBackTitleVisible: false,
						headerTitleStyle: { alignSelf: 'center', color: '#FFF' },
						headerStyle: {
							backgroundColor: '#7D40E7'
						}
					}}
					name='Profile'
					component={Profile}
				/>
			</Stack.Navigator>
			<StatusBar translucent backgroundColor='#7D40E7' />
		</NavigationContainer>
	)
}

export default App
