const express = require ('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.get('/', auth, (req,res) =>{
    
    if(req.user.admin)
    res.send('este dado só pode ser visto por admin')
    else res.status(401).send('acesso negado')
});

router.get('/free', auth, (req,res)=>{
    res.send('Esse dado só pode ser visto por quem está logado')
})

module.exports = router;