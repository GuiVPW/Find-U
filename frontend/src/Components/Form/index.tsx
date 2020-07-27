import React from 'react'
import FormInput from '../FormInput'
import './styles.scss'

const Form = ({ handleSubmit, handleChange, stateForm }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className='input-block'>
				<FormInput
					text='Usuário do Github'
					name='github_username'
					type='text'
					value={stateForm.github_username}
					onChange={handleChange('github_username')}
				/>
			</div>
			<div className='input-block'>
				<FormInput
					text='Tecnologias'
					name='techs'
					type='text'
					value={stateForm.techs}
					onChange={handleChange('techs')}
				/>
			</div>
			<div className='input-group'>
				<div className='input-block'>
					<FormInput
						text='Latitude'
						name='latitude'
						type='number'
						value={stateForm.latitude}
						onChange={handleChange('latitude')}
					/>
				</div>
				<div className='input-block'>
					<FormInput
						text='Longitude'
						name='longitude'
						type='number'
						value={stateForm.longitude}
						onChange={handleChange('longitude')}
					/>
				</div>
			</div>
			<button type='submit'>Salvar</button>
		</form>
	)
}

export default Form
