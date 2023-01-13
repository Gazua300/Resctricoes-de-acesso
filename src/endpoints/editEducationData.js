const con = require('../connection/connection')
const Authentication = require('../services/Authentication')


const editEducationData = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)
        const { trainingArea, institution, situation } = req.body
        

        if(!token){
            statusCode = 401
            throw new Error('Token ausente, inválido ou ausente!')
        }

        if(!trainingArea || !institution || !situation){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [user] = await con('restrict_access_education').where({
            user_id: tokenData.payload
        })

        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        const [area] = await con('restrict_access_education').where({
            id: req.params.id
        })

        if(!area){
            statusCode = 404
            throw new Error('Curso não encontrado')
        }


        await con('restrict_access_education').update({
            training_area: trainingArea,
            institution,
            situation
        }).where({
            id: req.params.id
        })


        res.status(statusCode).send('Alterações salvas')
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = editEducationData