const User = require('../models/User');
const crypto = require('crypto');

exports.login = (req, res) => {
    res.render('login');
};

exports.loginAction = (req, res) => {
    const auth = User.authenticate();

    auth(req.body.email, req.body.password, (error, result) => {
        if(!result){
            req.flash('error', 'Seu e-mail e/ou senha estão errados!');
            res.redirect('/users/login');
            return;
        }

        req.login(result, ()=>{});

        req.flash('success', 'Você foi logado com sucesso!');
        res.redirect('/');
    });
};

exports.register = (req, res) => {
    res.render('register');
};

exports.registerAction = (req, res) => {
    const newUser = new User(req.body);
    User.register(newUser, req.body.password, (error)=>{
        if(error){
            req.flash('error', 'Ocorreu um erro, tente mais tarde.')
            res.redirect('/users/register');
            return;
        }

        req.flash('success', 'Registro efetuado com sucesso. Faça o login')
        res.redirect('/users/login');
    });

};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.profile = (req, res) => {
    res.render('profile');
}

exports.profileAction = async (req, res) => {
    try{
        const user = await User.findOneAndUpdate(
            { _id:req.user._id },
            { name:req.body.name, email:req.body.email },
            { new:true, runValidators:true }
        );
    } catch(e) {
        req.flash('error', 'Ocorreu algum erro:'+e.message);
        res.redirect('/profile');
    }

    req.flash('success', 'Dados atualizados com sucesso!');
    res.redirect('/profile');
}

exports.forget = (req, res) => {
    res.render('forget');
}

exports.forgetAction = async (req, res) => {
    // 1. Verificar se o usuário realmente existe.
    const user = await User.findOne({email:req.body.email}).exec();
    if(!user){
        req.flash('error', 'E-mail não cadastrado');
        res.redirect('/users/forget');
        return;
    }
    // 2. Gerar um token (com data de expiração) e salvar no banco
    
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

    await user.save();
    
    // 3. Gerar link (com token) para trocar a senha

    const resetLink = `http://${req.headers.host}/users/reset/${user.resetPasswordToken}`;

    req.flash('success', 'Te enviamos um e-mail com instruções. '+resetLink);
    res.redirect('/users/login');

    // 4. Enviar o link via e-mail para o usuário


    // 5. Usuário vai acessar o link e trocar a senha.



};

exports.forgetToken = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.body.token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if(!user){
        req.flash('error', 'Token Expirado!');
        res.redirect('/users/forget');
        return;
    }

    res.render('forgetPassword');
};