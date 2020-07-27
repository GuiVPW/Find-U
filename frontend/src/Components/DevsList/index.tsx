import React from 'react'

import './style.scss'

const DevsList = ({ name, techs, image, bio, link }) => {
	return (
		<>
			<li className='dev-item'>
				<header>
					<img src={image} alt={`dev ${name}`} />
					<div className='user-info'>
						<strong>{name}</strong>
						<span>{techs}</span>
					</div>
				</header>
				<p>{bio}</p>
				<a href={`https://github.com/${link}`}>Acessar perfil no Github</a>
			</li>
		</>
	)
}

export default DevsList
