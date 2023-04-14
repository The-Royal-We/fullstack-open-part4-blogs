const _ = require("lodash");

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

  const blogAuthorGroups = _.groupBy(blogs, "author");

  const authorBlogLikes = _.mapValues(blogAuthorGroups, (blogList) =>
    _.sum(_.flatMap(blogList, (blog) => blog.likes))
  );

  const authorLikePairs = _.toPairs(authorBlogLikes);

  const [author, likes] = _.maxBy(authorLikePairs, (pair) => pair[1]);

  return {
    author,
    likes,
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
