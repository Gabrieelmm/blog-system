const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

require('../models/Usuario');
const Usuario = mongoose.model('usuarios');
const bcrypt = require('bcryptjs')

/*APAGUE ESSA LINHA PARA ATIVAR O SISTEMA DE REGISTRO
router.get('/registro',(req,res) => {
    res.render("usuarios/registro")
})

router.post('/registro',(req,res) => {
    var erros = []

    if(!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null) {
        erros.push({msg: 'Nome inválido'})
    }
    if(!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
        erros.push({msg: 'Email inválido'})
    }
    if(!req.body.senha1 || typeof req.body.senha1 === undefined || req.body.senha1 === null) {
        erros.push({msg: 'Senha inválida'})
    }
    if(req.body.senha1.length < 5) {
        erros.push({msg: 'Senha muito curta.'})
    }
    if(req.body.senha1 != req.body.senha2) {
        erros.push({msg: 'As senhas não são iguais!'})
    }
    if(erros.length > 0){
        res.render('usuarios/registro',{erros: erros})
    } else {
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if(usuario) {
                req.flash('error_msg','Já existe uma conta com esse Email.')
                res.redirect('/usuarios/registro')
            }else {
                const novoUsuario = new Usuario({
                    email: req.body.email,
                    nome: req.body.nome,
                    senha: req.body.senha1
                })

                bcrypt.genSalt(10,(erro,salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro,hash) => {
                        if(erro) {
                            req.flash('error_msg','Erro ao registrar o usuário.')
                            res.redirect('/')
                        }

                        novoUsuario.senha = hash

                        novoUsuario.save().then(() => {
                            req.flash('success_msg','Usuário registrado com sucesso, você já pode fazer login agora.')
                            res.redirect('/')
                        }).catch((err) => {
                            req.flash('error_msg','Erro ao registrar o usuário.')
                            res.redirect('/usuarios/registro')
                        })
                    })
                })
                
            }
        }).catch((err) => {
            req.flash('error_msg','Erro interno')
            res.redirect('/')
        })
    }
})
APAGUE ESSA LINHA PARA ATIVAR O SISTEMA DE REGISTRO*/


router.get('/login',(req,res) =>{
    res.render('usuarios/login')
})

router.post('/login/success',(req,res,next) => {
    
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuarios/login',
        failureFlash: true
    })(req,res,next)
    
    
})

router.get('/logout',(req,res) => {

    req.logOut()
    req.flash('success_msg','Deslogado com sucesso!')
    res.redirect('/')
})
module.exports = router