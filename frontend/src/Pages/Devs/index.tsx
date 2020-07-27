import React, { useState, useEffect } from 'react'
import Form from '../../Components/Form'
import './styles.scss'
import DevsList from '../../Components/DevsList'
import api from '../../services/apiConfig'

interface StateForm {
	github_username: string
	techs: string[]
	latitude: number
	longitude: number
}

const Devs = () => {
	const [devs, setDevs] = useState<any>([])
	const [form, setForm] = useState<StateForm>({
		github_username: '',
		techs: [],
		latitude: 0,
		longitude: 0
	})

	useEffect(() => {
		const loadDevs = async () => {
			const response = await api.get('/devs')

			setDevs(response.data)
		}
		loadDevs()
	}, [])

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords

				setForm({
					...form,
					latitude,
					longitude
				})
			},
			err => console.log(err),
			{ timeout: 30000, enableHighAccuracy: true }
		)
	}, [])

	const handleChange = (key: keyof StateForm) => (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setForm({
			...form,
			[key]: e.target.value
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const response = await api.post('/devs', form)
		if (response) {
			setForm({
				github_username: '',
				techs: [],
				latitude: 0,
				longitude: 0
			})
			setDevs([...devs, response.data])
		} else console.log('Falha na criação.')
	}
	return (
		<>
			<div className=''>
				<aside>
					<strong>Cadastrar</strong>
					<Form
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						stateForm={form}
					/>
				</aside>
			</div>
			<main>
				<ul>
					{devs.map(dev => (
						<DevsList
							key={dev._id}
							name={dev.name}
							bio={dev.bio}
							image={dev.avatar_url}
							link={dev.github_username}
							techs={dev.techs.join(', ')}
						/>
					))}
				</ul>
			</main>
		</>
	)
}

export default Devs
