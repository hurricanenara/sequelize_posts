const express = require('express');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');
const { sequelize } = require('./models');

const app = express();

app.use(express.json());

app.use(authRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

app.listen(3000, async () => {
  console.log('server started!');
  await sequelize.authenticate();
  console.log('db authenticated!');
});
