const con = require('../connection/connection')
const Authentication = require('../services/Authentication')


const getProfissionalData = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)
        
        if(!token){
            statusCode = 401
            throw new Error('Token ausente, inválido ou expirado!')
        }


        const [user] = await con('restrict_access_work').where({
            user_id: tokenData.payload
        })

        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        const works = await con('restrict_access_work').where({
            user_id: tokenData.payload
        })

        
        res.status(200).send(works)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }    
}

module.exports = getProfissionalData