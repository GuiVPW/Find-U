import axios from 'axios'

const baseURL = 'https://findu-api.herokuapp.com'

const api = axios.create({
	baseURL,
	timeout: 10000
})

export default api
