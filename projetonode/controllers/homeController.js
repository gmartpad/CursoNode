const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.userMiddleware = (req, res, next) => {
    let info = {name:'Gabriel', id:123}
    req.userInfo = info;
    next();
}

exports.index = async (req, res) => {    
    let responseJson = {
        pageTitle:"HOME",
        posts:[],
        tags:[]    
    }

    const tags = await Post.getTagsList();
    responseJson.tags = tags;

    console.log(tags);

    const posts = await Post.find();
    responseJson.posts = posts;

    res.render('home', responseJson);
};