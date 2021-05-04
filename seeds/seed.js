const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogPost.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of blogData) {
    await BlogPost.create({
      ...post,
      // user_id: users[Math.floor(Math.random() * users.length)].id
    });
  };

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  };

  process.exit(0);
};

seedDatabase();
