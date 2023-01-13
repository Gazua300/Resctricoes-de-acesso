const con = require('../connection/connection')
const Authentication = require('../services/Authentication')



const signup = async(req, res)=>{
    var statusCode = 400
    try{

        const {
            name, email, password, checkPass,
            genre, address, initialDate
        } = req.body

        if(
            !name || !email || !password || !checkPass ||
            !genre || !address || !initialDate
        ){
            statusCode = 401
            throw new Error('Preencha os campos')
        }


        const arrayDate = initialDate.split('/')
        const birthdate = new Date(`${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`)
        const auth = new Authentication()
        const id = auth.generateId()
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


        if(birthdate.getTime() > Date.now()){
            statusCode = 403
            throw new Error('Você colocou a data de nascimento superior a data atual')
        }


        await con('restrict_access_users').insert({
            id,
            name,
            email,
            password: hash,
            genre,
            address,
            birthdate: birthdate.toLocaleDateString()
        })


        res.status(200).send(auth.token(id))
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
}

module.exports = signup