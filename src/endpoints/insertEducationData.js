const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const insertEducationData = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)
        const { trainingArea, institution, situation } = req.body
        const id = new Authentication().generateId()
        

        if(!token){
            statusCode = 401
            throw new Error('Token ausente, inválido ou expirado!')
        }

        if(!trainingArea || !institution || !situation){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [user] = await con('restrict_access_users').where({
            id: tokenData.payload
        })

        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }

      
        await con('restrict_access_education').insert({
            id,
            training_area: trainingArea,
            institution,
            situation,
            user_id: user.id        
        })      


        res.status(200).send('Informações salvas')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = insertEducationData