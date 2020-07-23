module.exports.isLogged = (req, res, next) => {
    if(!req.user) {
        req.flash('error', 'Ops! Você não tem permissão para acessar esta página.');
        res.redirect('/users/login');
        return;
    }

    next();
};