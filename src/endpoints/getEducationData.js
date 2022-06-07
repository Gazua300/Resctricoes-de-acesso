const con = require('../connection/connection')
const Authentication = require('../services/Authentication')


const getEducationData = async(req, res)=>{
    var statusCode = 400
    try{

        const token = req.headers.authorization
        const tokenData = new Authentication().tokenData(token)
        

        const educationData = await con('restrict_access_education').select(

        ).where({
            user_id: tokenData.payload
        })

                
        res.status(200).send(educationData)
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = getEducationData