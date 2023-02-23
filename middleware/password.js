const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(5)
.is().max(10)
.has().digits(1)
.has().not().spaces()

module.exports = (req, res, next) =>{
    if(passwordSchema.validate(req.body.password)){
        next();
    }else{
        return res
        .status(400)
        .json({error : `mot de passe pas assez fort ${passwordSchema.validate('req.body.password', { list: true })}` })
}
}