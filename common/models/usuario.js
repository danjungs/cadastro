'use strict';

module.exports = function(Usuario) {
    Usuario.auth = function(req, cb) {
        
        Usuario.login(req, 'user', function(err, token) {
            if (err) {
              cb('Erro, Cadastro não encontrado', { //render view named 'response.ejs'
                title: 'Login failed',
                content: err,
                redirectTo: '/',
                redirectToLinkText: 'Try again'
              });
              return;
            }
            cb(null,{ //login user and render 'home' view
                username: req.username,
                accessToken: token.id
            });
        });
    };
      Usuario.remoteMethod('auth', {
        accepts: [{
            arg: 'login', type: 'object'
        }],
        returns: {arg: 'success', type: 'string'},
        http: {path:'/auth', verb: 'post'}
    });
};
