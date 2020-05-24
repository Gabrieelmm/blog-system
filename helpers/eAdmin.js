module.exports = {
    eAdmin: function(req,res,next) {
        if(req.isAuthenticated() && req.user.admin === 1) {
            return next()
        }

        req.flash('error_msg','Você não tem permissão para entrar nessa rota.')
        res.redirect('/')
    }
}