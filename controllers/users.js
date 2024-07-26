const userModel = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt)
            const user = new userModel({
                firstName: req.body.firstName.trim(),
                lastName: req.body.lastName.trim(),
                DOB:req.body.DOB.trim(),
                Sex:req.body.Sex.trim(),
                Phone: req.body.Phone.trim(),
                email: req.body.email.trim(),
                isAdmin: req.body.isAdmin,
                password: hash
            });

            await user.save();
            
            res.status(200).json({message: "registration successful"})
    } catch (error) {
        next(error)
        return res.status(500).json({
            message: "Internal server error: " + error.message,
        })
        
    };
}

const logIn = async (req, res) => {
    try {
            const { email, password } = req.body;
            const checkEmail = await userModel.findOne({ email: email.toLowerCase() });
            if (!checkEmail) {
                return res.status(404).json({
                    message: 'User not registered'
                });
            }
            const checkPassword = bcrypt.compareSync(password, checkEmail.password);
            if (!checkPassword) {
                return res.status(404).json({
                    message: "Password is incorrect"
                })
            }
            const token = jwt.sign({
                id: checkEmail._id,
                isAdmin: checkEmail.isAdmin
            }, process.env.secret_key, { expiresIn: "5h" });


            return res.status(200).json({
                message: "Login Successfully! Welcome " + checkEmail.firstName + " " + checkEmail.lastName,
                token: token
            })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error: " + error.message,
        });
    }
};

const getUsers = async(req, res)=>{
    try{
        const users = await userModel.find();
        res.status(200).json({data: users})
    }catch(err){
        return res.status(500).json({
            message: "Internal server error: " + error.message,
        });
    }
}



module.exports={
    signUp,
    logIn,
    getUsers
}