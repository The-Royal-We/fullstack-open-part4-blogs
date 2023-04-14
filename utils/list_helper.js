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
  const authorWithMostLikes = _(blogs)
    .groupBy("author")
    .map((blogList, author) => ({
      author,
      likes: _.sumBy(blogList, "likes"),
    }))
    .maxBy("likes");

  return _.isEmpty(blogs) ? null : authorWithMostLikes;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
