const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const editPersonalData = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)
        const { name, email, genre, address } = req.body

        if(!token){
            statusCode = 401
            throw new Error('Token ausente, inválido ou expriado!')
        }


        const [user] = await con('restrict_access_users').where({
            id: tokenData.payload
        })

        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        await con('restrict_access_users').update({
            name,
            email,
            genre,
            address
        }).where({
            id: tokenData.payload
        })


        res.status(200).send(`Alterações nos dados de ${user.name} realizadas com sucesso`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = editPersonalData