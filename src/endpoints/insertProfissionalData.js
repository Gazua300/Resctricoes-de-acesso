const con = require('../connection/connection')
const Authentication = require('../services/Authentication')


const insertProfissionalData = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)
        const { company, role, duration } = req.body
        const id = new Authentication().generateId()

        if(!token){
            statusCode = 401
            throw new Error('Token ausente, inválido ou expirado!')
        }


        if(!company || !role || !duration){
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


        await con('restrict_access_work').insert({
            id,
            company,
            role,
            duration,
            user_id: user.id
        })
                

        res.status(200).send(`Dados de ${company} salvos com sucesso`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = insertProfissionalData