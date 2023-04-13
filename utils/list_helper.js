// eslint-disable-next-line no-unused-vars
const dummy = (_blogs) => 1;

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0;
  }
  return blogs.map((b) => b.likes).reduce((a, b) => a + b, 0);
};

const favoriteBlog = (_blogs) => null;

module.exports = { dummy, totalLikes, favoriteBlog };
