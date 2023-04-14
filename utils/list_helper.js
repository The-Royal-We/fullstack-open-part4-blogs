const _ = require("lodash");

// eslint-disable-next-line no-unused-vars
const dummy = (_blogs) => 1;

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0;
  }
  return blogs.map((b) => b.likes).reduce((a, b) => a + b, 0);
};

const favoriteBlog = (blogs) =>
  _.isEmpty(blogs) ? null : _(blogs).maxBy((blog) => blog.likes);

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  const blogAuthorSums = _(blogs)
    .groupBy("author")
    .mapValues((blogList) => blogList.length)
    .toPairs()
    .value();

  const [author, blogNumber] = _.maxBy(blogAuthorSums, (pair) => pair[1]);

  return {
    author,
    blogs: blogNumber,
  };
};
const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  const blogLikeTotals = _(blogs)
    .groupBy("author")
    .mapValues((blogList) =>
      _(blogList)
        .flatMap((blog) => blog.likes)
        .sum()
    )
    .toPairs()
    .value();

  const [author, likes] = _.maxBy(blogLikeTotals, (pair) => pair[1]);

  return {
    author,
    likes,
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
