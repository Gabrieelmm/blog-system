//Importações
    const express = require('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const admin = require('./routes/admin');
    const user = require('./routes/users');
    const path = require('path');
    const mongoose = require('mongoose');
    const session = require('express-session');
    const flash = require('connect-flash');
    const passport = require('passport');
    require('./config/auth')(passport)

    require('./models/Postagem');
    const Postagem = mongoose.model('postagens');

    require('./models/Categoria');
    const Categoria = mongoose.model('categorias');

    
    const app = express();

//Configurações
    //Sessão
        app.use(session({
            secret: "blog",
            resave: true,
            saveUninitialized: true
        }))

        app.use(passport.initialize())
        app.use(passport.session())
        
        app.use(flash())
    
    //Middleware
        app.use((req,res,next) => {
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            res.locals.error = req.flash('error')
            res.locals.user = req.user || null
            next()
        })
    
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

    //Handlebars
        app.engine('handlebars',handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');

    //Mongoose
        mongoose.Promise = global.Promise;
        //CONFIGURANDO O BANCO DE DADOS
        mongoose.connect('mongodb://localhost/blog',{useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
            console.log('Conectado ao MongoDB')
        }).catch((err) => {
            console.log('Erro ao tentar se conectar ao MongoDB \n' + err)
        })

    //Public
        app.use(express.static(path.join(__dirname,'public')))

//Rotas
    app.use('/admin',admin);

    app.get('/',(req,res) => {
        Postagem.find().populate('categoria').sort({dataOrder: 'desc'}).lean().then((postagens) => {
            res.render('index',{postagens: postagens})
        }).catch((err) => {
            req.flash('error_msg','Erro ao listar postagens.')
            res.redirect('/404')
        })
        
    })

    app.get('/postagem/:slug',(req,res) => {
        Postagem.findOne({slug: req.params.slug}).lean().then((postagem) => {
            if (postagem) {
                res.render('postagem/index',{postagem: postagem})
            } else {
                req.flash('error_msg','Essa postagem não existe')
                res.redirect('/')
            }
        }).catch((err) => {
            req.flash('error_msg','Erro interno');
            res.redirect('/')
        })
    })

    app.get('/categorias',(req,res) => {
        Categoria.find().lean().then((categorias) => {
            res.render('categorias/index',{categorias: categorias})
        }).catch((err) => {
            req.flash('error_msg','Erro ao listar categorias.')
        })
    })

    app.get('/categoria/:slug',(req,res) => {
        Categoria.findOne({slug:req.params.slug}).lean().then((categoria) => {
            if (categoria) {

                Postagem.find({categoria: categoria._id}).lean().then((postagens) => {
                    res.render('categorias/post',{postagens: postagens,categoria: categoria})
                }).catch((err) => {
                    req.flash('error_msg','Erro ao listar as postagens.')
                    res.redirect('/')
                })

            } else {
                req.flash('error_msg','Esta categoria não existe.')
                res.redirect('/')
            }
        }).catch((err) => {
            req.flash('error_msg','Erro ao acessar categoria.')
            res.redirect('/')
        })
    })


    app.use('/usuarios',user)


    app.get('/404',(req,res) => {
        res.send('Erro 404')
    })

//Outros
    const PORT = 8081; // http://localhost:8081/
    app.listen(PORT,() => {
        console.log('Server rodando!')
    })