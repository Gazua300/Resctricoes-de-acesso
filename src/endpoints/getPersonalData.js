const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const getPersonalData = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)
        
        if(!token){
            statusCode = 401
            throw new Error('Token ausente, inválido ou expirado!')
        }


        const [user] = await con('restrict_access_users').where({
            id: tokenData.payload
        })

        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        res.status(200).send(user)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = getPersonalData