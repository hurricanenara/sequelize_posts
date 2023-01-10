const express = require('express');

const router = express.Router();
const { Post, User, Like, Sequelize } = require('../models');
const {
  postCreateValidation,
  postUpdateValidation,
} = require('../validations');
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [
        'id',
        'title',
        'content',
        [Sequelize.fn('count', Sequelize.col('likes.id')), 'numOfLikes'],
      ],
      include: [
        { model: User, as: 'user', attributes: ['nickname'] },
        {
          model: Like,
          as: 'likes',
          attributes: [],
        },
      ],
      group: ['post.id'],
      order: [[Sequelize.literal('numOfLikes'), 'DESC']],
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: ['nickname'] }],
      attributes: { exclude: ['userId'] },
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { currentUser } = res.locals;
  const userId = currentUser.id;

  try {
    const { title, content } = await postCreateValidation.validateAsync(
      req.body
    );
    const post = await Post.create({
      title,
      content,
      userId,
    });
    res.json(post);
  } catch (err) {
    if (err.isJoi) {
      return res.status(422).json({ message: err.details[0].message });
    }

    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const fieldsToBeUpdated = await postUpdateValidation.validateAsync(
      req.body
    );
    const updatedPost = await Post.update(fieldsToBeUpdated, {
      where: { id },
    });
    res.json(updatedPost);
  } catch (err) {
    if (err.isJoi) {
      return res.status(422).json({ message: err.details[0].message });
    }

    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.destroy({ where: { id } });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/like', authMiddleware, async (req, res) => {
  const { id: postId } = req.params;
  const {
    currentUser: { id: userId },
  } = res.locals;

  try {
    const like = await Like.findOne({
      // null
      where: {
        userId,
        postId,
      },
    });

    const isLikedAlready = !!like;

    if (isLikedAlready) {
      const deletedLike = await Like.destroy({
        where: {
          userId,
          postId,
        },
      });
      res.json(deletedLike);
    } else {
      const postedLike = await Like.create({
        userId,
        postId,
      });
      res.json(postedLike);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
