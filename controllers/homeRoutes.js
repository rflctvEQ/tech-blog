const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blog posts and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ],
    });

    // Serialize data so the template can read it
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
    console.log('==============');
    console.log(blogPosts);
    console.log('==============');

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogPosts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/blog/:id', async (req, res) => {
  try {
    // debugger
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['id', 'content', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['name']
          }
        }
      ],
    });
    // debugger
    const blogPost = blogPostData.get({ plain: true });
    //console.log(blogPost);
    // debugger
    res.render('blogPost', {
      ...blogPost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/edit/:id', withAuth, async (req, res) => {
  try {
    // debugger
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['id', 'content', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['name']
          }
        }
      ],
    });
    // debugger
    const editBlogPost = blogPostData.get({ plain: true });
    //console.log(blogPost);
    // debugger
    res.render('editPost', {
      ...editBlogPost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    console.log('==========')
    console.log('logged in')
    res.redirect('/profile');
    return;
  }
  console.log('=========')
  console.log('NOT logged in')
  res.render('login');
});

module.exports = router;
