class userController {
    static async handleRegisterCust(req, res, next){
        try {
            if (!req.body) {
             throw {name: `Invalid Input`}   
            }
            const data = await User.create({
                ...req.body,
                role: `customer`
            })
            res.status(201).json({
                msg: `User has been created`
            })
        } catch (err) {
            next(err)
        }
    }

    static async handleRegisterSeller(req, res, next){
        try {
            if (!req.body) {
             throw {name: `Invalid Input`}   
            }
            const data = await User.create({
                ...req.body,
                role: `seller`
            })
            res.status(201).json({
                msg: `User has been created`
            })
        } catch (err) {
            next(err)
        }
    }

    static async handleRegisterAdmin(req, res, next){
        try {
            if (!req.body) {
             throw {name: `Invalid Input`}   
            }
            const data = await User.create({
                ...req.body,
                role: `admin`
            })
            res.status(201).json({
                msg: `User has been created`
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next){
        try {
            const {email, password} = req.body
            const data = await User.findOne({
                where: {
                    [Op.or]: {
                        email,
                        username: email
                    } 
                }
            })
            if (!data) {
                throw {msg: `Email or Username and Password is Invalid`}
            }
            const validPass = bcrypt.compareSync(password, data.password)
            if (!validPass) {
                throw {msg: `Email or Username and Password is Invalid`}
            }
            const payload = {
                id: data.id,
                email: data.email,
                role: data.role
            }
            const access_token = jwt.sign(payload, process.env.SECRET)
            res.status(200).json({
                access_token,
                username: data.username
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = userController