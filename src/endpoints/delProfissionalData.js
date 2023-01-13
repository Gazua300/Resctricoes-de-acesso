const { send } = require('express/lib/response')
const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const delProfissionalData = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)

        if(!token){
            statusCode = 401
            throw new Error('Token inválido, expirado ou ausente!')
        }


        const [user] = await con('restrict_access_work').where({
            user_id: tokenData.payload
        })

        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        const [work] = await con('restrict_access_work').where({
            id: req.params.id
        })

        if(!work){
            statusCode = 404
            throw new Error('Profissão não encontrada')
        }


        await con('restrict_access_work').del().where({
            id: req.params.id
        })


        res.status(200).send(`${work.company} deletado`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = delProfissionalData
