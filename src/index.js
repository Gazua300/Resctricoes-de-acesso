const express = require('express')
const cors = require('cors')

const signup = require('./endpoints/signup')
const login = require('./endpoints/login')
const getPersonalData = require('./endpoints/getPersonalData')
const getEducationData = require('./endpoints/getEducationData.js')
const insertEducationData = require('./endpoints/insertEducationData')
const editPersonalData = require('./endpoints/editPersonalData')
const editEducationData = require('./endpoints/editEducationData')
const editProfissionalData = require('./endpoints/editProfissionalData')
const insertProfissionalData = require('./endpoints/insertProfissionalData')
const getProfissionalData = require('./endpoints/getProfissionalData')
const delEducationData = require('./endpoints/delEducationData')
const delProfissionalData = require('./endpoints/delProfissionalData')


const app = express()
app.use(express.json())
app.use(cors())


app.post('/access_token/signup', signup)
app.post('/access_token/login', login)
app.post('/access_token/education_data', insertEducationData)
app.post('/access_token/profissional_data', insertProfissionalData)

app.get('/access_token/personal_data', getPersonalData)
app.get('/access_token/education_data', getEducationData)
app.get('/access_token/profissional_data', getProfissionalData)

app.put('/access_token/edit_data', editPersonalData)
app.put('/access_token/edit_education/:id', editEducationData)
app.put ('/access_token/edit_profissional/:id', editProfissionalData)

app.delete('/access_token/education_data/:id', delEducationData)
app.delete('/access_token/profissional_data/:id', delProfissionalData)


app.listen(process.env.PORT || 3003, ()=>{
    console.log(`Server running at http://localhost:3003`)
})