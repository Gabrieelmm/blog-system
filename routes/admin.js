const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Categoria');
const Categoria = mongoose.model('categorias');

require('../models/Postagem');
const Postagem = mongoose.model('postagens');

const { eAdmin }= require('../helpers/eAdmin')


router.get('/', eAdmin,(req,res) => {
    res.render('admin/index')
})

router.get('/posts', eAdmin,(req,res) => {
    res.send('Pag.  Posts')
})

router.get('/categorias', eAdmin,(req,res) => {
    Categoria.find().lean().sort({dateOrder: 'desc'}).then((categorias) => {
        res.render('admin/categorias',{categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg','Erro ao listar categorias' + err)
        res.redirect('/admin')
    })
    
})

router.get('/categorias/add', eAdmin,(req,res) => {
    res.render('admin/addcategoria')
})

router.post('/categorias/nova', eAdmin,(req,res) => {

    var erros = [];

    if(!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null) {
        erros.push({
            msg: "Nome inválido"
        })
    }

    if(!req.body.slug || typeof req.body.slug === undefined || req.body.slug === null) {
        erros.push({
            msg: "Slug inválido"
        })
    }

    if(erros.length > 0) {
        res.render('admin/addcategoria', {erros: erros})
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(() => {
            req.flash('success_msg','Categoria criada com sucesso!')
            res.redirect('/admin/categorias')
        
        }).catch((err) => {
            req.flash('error_msg','Erro ao salvar categoria \n' + err)
            res.redirect('/admin')
        })

    }
    
})

router.get('/categoria/edit/:id', eAdmin,(req,res) => {
    Categoria.findOne({_id: req.params.id}).lean().then((categoria) => {
        res.render('admin/editcategoria',{categoria: categoria})
    }).catch((err) => {
        req.flash('error_msg','Categoria não encontrada.')
        res.redirect('/admin/categorias')
    })
    
})


router.post('/categorias/edit', eAdmin,(req,res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
        //validação
        categoria.nome = req.body.nome;
        categoria.slug = req.body.slug;
        categoria.save().then(() => {
            req.flash('success_msg','Categoria editada com sucesso.');
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash('error_msg','Erro ao salvar a edição.');
            res.redirect('/admin/categorias')
        })
    }).catch((err) => {
        req.flash('error_msg','Erro ao editar categoria.')
        res.redirect('/admin/categorias')
    })
})


router.post('/categorias/deletar', eAdmin,(req,res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash('success_msg','Categoria deletada com sucesso.');
        res.redirect('/admin/categorias')
    }).catch((err) => {
        req.flash('error_msg','Erro ao deletar categoria.');
        res.redirect('/admin/categorias')
    })
})


router.get('/postagens', eAdmin,(req,res) => {
    Postagem.find().populate('categoria').lean().sort({dateOrder: 'desc'}).then((postagens) => {
        res.render('admin/postagens',{postagens: postagens})
    }).catch((err) => {
        req.flash('error_msg','Erro ao listar postagens.')
        res.redirect('/admin')
    })
    
})

router.get('/postagens/add', eAdmin,(req,res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('admin/addpostagem',{categorias: categorias})
    }).catch((err) =>{
        req.flash('error_msg','Erro ao carregar o formulário.')
        res.redirect('/admin')
    })
    
})

router.post('/postagens/nova', eAdmin,(req,res) => {
    //Validação

    var erros = [];
    if (req.body.categoria === "0"){
        erros.push({msg: 'Categoria inválida.'})
    }
    if (erros.length > 0) {
        res.render('admin/addpostagens',{erros: erros})
    } else {
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            slug: req.body.slug,
            categoria: req.body.categoria
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash('success_msg','Postagem criada com sucesso!')
            res.redirect('/admin/postagens')
        }).catch((err) => {
            req.flash('error_msg','Erro ao criar postagem.')
            res.redirect('/admin/postagens')
        })
    }

})


router.get('/postagens/edit/:id', eAdmin,(req,res) => {

    Postagem.findOne({_id: req.params.id}).lean().then((postagem) => {
        Categoria.find().lean().then((categorias) => {
            res.render('admin/editpostagem',{categorias:categorias, postagem: postagem})
        }).catch((err) => {
            req.flash('error_msg','Houve um erro ao listar a postagem.')
            res.redirect('/admin/postagens')
        })

    }).catch((err) => {
        req.flash('error_msg','Erro ao carregar o formulário de edição.')
        res.redirect('/admin/postagens')
    })
    
})


router.post('/postagem/edit', eAdmin,(req,res) => {
    //Validação
    
    Postagem.findOne({_id: req.body.id}).then((postagem) => {
        
        postagem.titulo = req.body.titulo;
        postagem.slug = req.body.slug;
        postagem.descricao = req.body.descricao;
        postagem.conteudo = req.body.conteudo;
        postagem.categoria = req.body.categoria;
        
        postagem.save().then(() => {
            req.flash('success_msg','Postagem editada com sucesso!')
            res.redirect('/admin/postagens')
        }).catch((err) => {
            req.flash('Erro interno.')
            res.redirect('/admin/postagens')
        })
    }).catch((err) => {
        req.flash('error_msg','Erro ao salvar a postagem.')
        res.redirect('/admin/postagens')
        
    })
})

router.post('/postagens/deletar', eAdmin,(req,res) => {
    Postagem.deleteOne({_id: req.body.id}).then(() => {
        req.flash('success_msg','Postagem deletada com sucesso!')
        res.redirect('/admin/postagens')
    }).catch((err) => {
        req.flash('error_msg','Erro ao deletar postagem.')
        res.redirect('/admin/postagens')
    })
})

//NÃO SEGURA:
/*
router.get('/postagens/deletar/:id',(req,res) => {
    Postagem.remove({_id: req.params.id}).then(() => {
        MSG DE SUCESSO
        res.redirect('/admin/postagens')
    }).cath((err) => {
        MSG DE ERRO E REDIRECT
    })
})
*/

module.exports = router