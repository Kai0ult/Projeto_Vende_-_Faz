export function logado(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Você não está logado!');
    res.redirect('/login');
}

export function logadoUsuario(req, res, next) {
    if (req.isAuthenticated() && req.user.tipo === 'usuario') {
        return next();
    }
    req.flash('error_msg', 'Acesso permitido apenas para usuários!');
    res.redirect('/usuario/login');
}

export function logadoAnunciante(req, res, next) {
    if (req.isAuthenticated() && req.user.tipo === 'anunciante') {
        return next();
    }
    req.flash('error_msg', 'Acesso permitido apenas para anunciantes!');
    res.redirect('/anunciante_empresa/login');
}