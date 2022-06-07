const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const signup = async(req, res)=>{
    var statusCode = 400
    try{

        const {
            name, email, password, checkPass,
            genre, address, initialDate
        } = req.body
        const arrayDate = initialDate.split('/')
        const birthdate = `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`
        const auth = new Authentication()
        const id = auth.generateId()

        if(
            !name || !email || !password || !checkPass ||
            !genre || !address || !birthdate
        ){
            statusCode = 401
            throw new Error('Preencha os campos')
        }

        const hash = auth.hash(password)
        
        const [user] = await con('restrict_access_users').where({
            email
        })


        if(user){
            statusCode = 403
            throw new Error('Este email já está sendo usado em outra conta!')
        }

        if(password !== checkPass){
            statusCode = 403
            throw new Error('As senhas não conferem')
        }


        await con('restrict_access_users').insert({
            id,
            name,
            email,
            password: hash,
            genre,
            address,
            birthdate
        })


        res.status(200).send(auth.token(id))
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = signup