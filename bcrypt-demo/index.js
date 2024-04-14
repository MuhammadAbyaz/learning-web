const bcrypt = require("bcrypt")
const hashPassword = async (pwd)=>{
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(pwd,salt)
    console.log(hash)
}
const login = async(pw,hashed) =>{
    const result = await bcrypt.compare(pw,hashed)
    if(result) console.log("logging in")
    else console.log("Wrong credentials")
}
login("monkey","$2b$12$v9bIrdJ87jz1WEXKdnOzmOyJk9OPmg8LlVQkKCidehpUbB2okeV.O")