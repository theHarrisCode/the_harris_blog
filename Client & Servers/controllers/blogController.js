const Blog = require('../models/blogs');


// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // sorts blog from newest to oldest
    .then((result) => {
        res.render('blogs/index', {title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('blogs/details', { blog: result, title: "Blog Details" })
    })
    .catch((err) => {
        res.status(404).render('404', {title: 'Blog not found'}); 
    });
}

const blog_edit_get = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('blogs/edit', {blog: result, title: "Edit Blog"})
    })
    .then((data) => {
        res.json({redirect: '/'})
    })
    .catch((err) => {
        res.status(404).render('404', {title: 'Blog not found'}); 
    });
};

const blog_edit_put = async (req, res) => {
    const id = req.params.id

    try{
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {new: true})
        res.redirect(`blogs/${updateBlog._id}`);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error")
    }
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', {title: 'Create a new Blog'});
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            console.log("Blog Saved");
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
}


const blog_delete = (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect: '/blogs' })
    })
    .catch((err) => {
        console.log(err);
    })
}


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_edit_get,
    blog_edit_put
}