const _ = require("lodash");

// eslint-disable-next-line no-unused-vars
const dummy = (_blogs) => 1;

const totalLikes = (blogs) => (_.isEmpty(blogs) ? 0 : _(blogs).sumBy("likes"));

const favoriteBlog = (blogs) =>
  _.isEmpty(blogs) ? null : _(blogs).maxBy((blog) => blog.likes);

const mostBlogs = (blogs) => {
  const authorWithMostBlogs = _(blogs)
    .groupBy("author")
    .map((blogList, author) => ({
      author,
      blogs: blogList.length,
    }))
    .maxBy("blogs");

  return _.isEmpty(blogs) ? null : authorWithMostBlogs;
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
