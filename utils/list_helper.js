// eslint-disable-next-line no-unused-vars
const dummy = (_blogs) => 1;

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0;
  }
  return blogs.map((b) => b.likes).reduce((a, b) => a + b, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }
  return blogs.reduce(
    (currentMostLiked, blog) =>
      blog.likes > currentMostLiked.likes ? blog : currentMostLiked,
    { likes: -1000 }
  );
};

module.exports = { dummy, totalLikes, favoriteBlog };
