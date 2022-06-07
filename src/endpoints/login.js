const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const login = async(req, res)=>{
    var statusCode = 400
    try{

        const { email, password } = req.body
        const auth = new Authentication()

        if(!email || !password){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const [user] = await con('restrict_access_users').where({
            email
        })

        if(!user){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }

        if(!auth.compare(password, user.password)){
            statusCode = 404
            throw new Error('Usuário não encontrado')
        }


        res.status(200).send(auth.token(user.id))
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = login