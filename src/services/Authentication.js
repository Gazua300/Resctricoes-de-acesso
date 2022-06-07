const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { config } = require('dotenv')

config()

class Authentication{
    generateId = ()=>{
        return uuid.v4()
    }

    token = (payload)=>{
        return jwt.sign(
            { payload },
            process.env.JWT_KEY,
            { expiresIn: '1h'}
        )
    }

    tokenData = (token)=>{
        return jwt.verify(
            token,
            process.env.JWT_KEY
        )
    }

    hash = (txt)=>{
        const rounds = 12
        const salt = bcrypt.genSaltSync(rounds)
        const cypher = bcrypt.hashSync(txt, salt)
  
        return cypher
    }

    compare = (txt, hash)=>{
        return bcrypt.compareSync(txt, hash)
    }
}

module.exports = Authentication
