const con = require('../connection/connection')
const Authetication = require('../services/Authentication')


const editProfissionalData = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authetication().tokenData(token)
        const { company, role, duration } = req.body

        if(!token){
            statusCode = 401
            throw new Error('Token inválido, expirado ou ausente!')
        }

        if(!company || !role || !duration){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [user] = await con('restrict_access_work').where({
            user_id: tokenData.payload
        })

        if(!user){
            statusCode = 400
            throw new Error('Usuário não encontrado!')
        }


        await con('restrict_access_work').update({
            company,
            role,
            duration
        }).where({
            id: req.params.id
        })


        res.status(200).send('Alterações salvas')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = editProfissionalData
