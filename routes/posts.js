const express = require('express');

const router = express.Router();
const { Post, User } = require('../models');
const {
  postCreateValidation,
  postUpdateValidation,
} = require('../validations');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: 'user', attributes: ['nickname'] }],
      attributes: { exclude: ['userId'] },
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

router.post('/', async (req, res) => {
  try {
    const { title, content, userId } = await postCreateValidation.validateAsync(
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

module.exports = router;
