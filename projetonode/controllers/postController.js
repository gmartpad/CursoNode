const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.add = (req, res) => {
    res.render('postAdd');
};

exports.addAction = async (req, res) => {
    const post = new Post(req.body);
    
    try{
        await post.save();
    } catch(error){
        req.flash('error', 'Erro: '+error.message)
        return res.redirect('/post/add');
        
    }

    req.flash('success', 'Post salvo com sucesso!');

    res.redirect('/');
};

exports.edit = async (req, res) => {
    // 1. Pegar as informações do post em questão.
    const post = await Post.findOne({ slug:req.params.slug });
    // 2. Carregar o formulário de edição.
    res.render('postEdit', { post });
};

exports.editAction = async (req, res) => {
    // Procutar o item enviado.
    // Pegar os dados e atualizar.
    const post = await Post.findOneAndUpdate(
        { slug:req.params.slug }, 
        req.body, 
        { 
            new:true, // Retornar NOVO item atualizado
            runValidators: true
        }
    );
    // Mostrar mensagem de sucesso e redirecionar para a home.

    req.flash('success', 'Post atualizado com sucesso!');
    
    res.redirect('/');
};