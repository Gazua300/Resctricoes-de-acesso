const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const delEducationData = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)


        const [user] = await con('restrict_access_education').where({
            user_id: tokenData.payload
        })

        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado!')
        }


        const [education] = await con('restrict_access_education').where({
            id: req.params.id
        })

        if(!education){
            statusCode = 404
            throw new Error('Curso não encontrado')
        }


        await con('restrict_access_education').del().where({
            id: req.params.id
        })


        res.status(200).send(`${education.training_area} deletado`)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = delEducationData