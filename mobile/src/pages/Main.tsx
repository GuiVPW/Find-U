import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import {
	TextInput,
	TouchableNativeFeedback,
	TouchableOpacity
} from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/apiConfig'

interface Location {
	latitude: number
	longitude: number
	latitudeDelta: number
	longitudeDelta: number
}

const Main = ({ navigation }) => {
	const [devs, setDevs] = useState<any>([])
	const [techs, setTechs] = useState('')
	const [currentRegion, setCurrentRegion] = useState<Location>({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0,
		longitudeDelta: 0
	})

	useEffect(() => {
		const loadPosition = async () => {
			const { granted } = await requestPermissionsAsync()
			if (granted) {
				const { coords } = await getCurrentPositionAsync({
					enableHighAccuracy: true
				})

				const { latitude, longitude } = coords
				setCurrentRegion({
					latitude,
					longitude,
					latitudeDelta: 0.04,
					longitudeDelta: 0.04
				})
			}
		}
		loadPosition()
	}, [])

	const loadDevs = async () => {
		const { latitude, longitude } = currentRegion

		const response = await api.get('/search', {
			params: {
				latitude,
				longitude,
				techs
			}
		})
		setDevs(response.data.devs)
	}

	const handleRegionChange = region => {
		setCurrentRegion(region)
	}

	if (!currentRegion) return null

	return (
		<>
			<MapView
				onRegionChangeComplete={handleRegionChange}
				style={styles.map}
				initialRegion={currentRegion}
			>
				{devs.map(dev => (
					<Marker
						key={dev._id}
						coordinate={{
							longitude: dev.location.coordinates[0],
							latitude: dev.location.coordinates[1]
						}}
					>
						<Image source={{ uri: dev.avatar_url }} />
						<Callout
							onPress={() => {
								navigation.navigate('Profile', {
									github_username: dev.github_username
								})
							}}
						>
							<View style={styles.callout}>
								<Text style={styles.devName}>{dev.name}</Text>
								<Text style={styles.devBio}>{dev.bio}</Text>
								<Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>
			<View style={styles.searchForm}>
				<TextInput
					style={styles.searchInput}
					placeholder='Buscar devs por techs...'
					placeholderTextColor='#999'
					autoCapitalize='words'
					autoCorrect={false}
					value={techs}
					onChangeText={setTechs}
				/>
				<TouchableOpacity style={styles.loadButton} onPress={loadDevs}>
					<MaterialIcons name='my-location' size={20} color='#fff' />
				</TouchableOpacity>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	map: {
		flex: 1
	},
	avatar: {
		width: 54,
		height: 54,
		borderRadius: 4,
		borderWidth: 4,
		borderColor: '#fff'
	},
	callout: {
		width: 260
	},
	devName: {
		fontWeight: 'bold',
		fontSize: 16
	},
	devBio: {
		color: '#666',
		marginTop: 5
	},
	devTechs: {
		marginTop: 5
	},
	searchForm: {
		position: 'absolute',
		top: 20,
		left: 20,
		right: 20,
		zIndex: 5,
		flexDirection: 'row'
	},
	searchInput: {
		flex: 1,
		height: 50,
		backgroundColor: '#FFF',
		color: '#333',
		borderRadius: 25,
		paddingHorizontal: 20,
		fontSize: 16,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 4,
			height: 4
		},
		elevation: 2
	},
	loadButton: {
		width: 50,
		height: 50,
		backgroundColor: '#8E4DFF',
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 15
	}
})

export default Main
