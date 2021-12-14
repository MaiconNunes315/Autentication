const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {loginValidate, registerValidate} = require('./validate');
const { use } = require('../routes/userRouter');

const userController = {

    screenLogin: (req,res) =>{
        res.render('login');
    },

    screenRegister: (req,res) =>{
        res.render('register');
    },

    register: async function (req,res){

        const{error} = registerValidate(req.body)
        if(error) {
            return res.status(400).send(error.message);
        }

        const selectedUser = await User.findOne({email: req.body.email});
        if(selectedUser) return res.status(400).send('Email já cadastrado')

        const user = new User({
            name: req.body.name,
            email:req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })
        try{
            const savedUser = await user.save()
            res.render('login')

        }catch(error){
            res.status(400).send(error)
        }
    },

    login: async function (req, res){
            
            const{error} = loginValidate(req.body)
            if(error) {
                return res.status(400).send(error.message);
            }

        const selectedUser = await User.findOne({email: req.body.email});
        if(!selectedUser) return res.status(400).send('Email ou senha incorreto')
        
        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
        if(!passwordAndUserMatch) return res.status(400).send('Email ou senha incorreto')
        
        const token = jwt.sign({_id: selectedUser._id, admin: selectedUser.admin}, process.env.TOKEN_SECRET)

        res.header('authorization-token', token);
        res.render('home');
        
            
    }




}

module.exports = userController;