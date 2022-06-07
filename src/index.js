const express = require('express')
const cors = require('cors')
const signup = require('./endpoints/signup')
const login = require('./endpoints/login')
const getPersonalData = require('./endpoints/getPersonalData')
const getEducationData = require('./endpoints/getEducationData.js')
const insertEducationData = require('./endpoints/insertEducationData')
const editPersonalData = require('./endpoints/editPersonalData')
const editEducationData = require('./endpoints/editEducationData')


const app = express()
app.use(express.json())
app.use(cors())


app.post('/access_token/signup', signup)
app.post('/access_token/login', login)
app.post('/access_token/education_data', insertEducationData)
app.get('/access_token/personal_data', getPersonalData)
app.get('/access_token/education_data', getEducationData)
app.put('/access_token/edit_data', editPersonalData)
app.put('/access_token/edit_education/:id', editEducationData)


app.listen(process.env.PORT || 3003, ()=>{
    console.log(`Server running at http://localhost:3003`)
})