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
        tags:[] ,
        tag:''   
    };

    //console.log(req.user);

    responseJson.tag = req.query.t;
    const postFilter = (typeof responseJson.tag !== 'undefined') ? {tags:responseJson.tag} : {};

    const tagsPromise = Post.getTagsList();
    const postsPromise = Post.findPosts(postFilter);

    const [ tags, posts ] = await Promise.all([ tagsPromise, postsPromise ])

    for(i in tags){
        (tags[i]._id === responseJson.tag) ? tags[i].class = "selected" : null;
    }

    responseJson.tags = tags;
    responseJson.posts = posts;

    res.render('home', responseJson);
};