import React from 'react'

const FormInput = ({ name, text, type, ...rest }) => {
	return (
		<>
			<label htmlFor={name}>{text}</label>
			<input type={type} name={name} id={name} required {...rest} />
		</>
	)
}

export default FormInput
