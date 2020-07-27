const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', (_req, res) => {
	res.sendFile(path.join(__dirname, 'build/index.html'))
})

// app.use(apiProxy)

const port = 3030

app.listen(process.env.PORT || port, () => {
	console.log(`rodando na porta ${port}`)
})
