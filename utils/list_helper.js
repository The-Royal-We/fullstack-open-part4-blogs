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

  const blogAuthorGroups = _.groupBy(blogs, "author");

  return Object.keys(blogAuthorGroups).reduce(
    (currentMax, author) => {
      const blogList = blogAuthorGroups[author];
      const currentBlogListLength = blogList.length;
      if (currentBlogListLength > currentMax.blogs) {
        return {
          author,
          blogs: currentBlogListLength,
        };
      }
      return currentMax;
    },
    {
      author: "",
      blogs: -1,
    }
  );
};
const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  const blogAuthorGroups = _.groupBy(blogs, "author");

  return Object.keys(blogAuthorGroups).reduce(
    (currentMax, author) => {
      const blogList = blogAuthorGroups[author];
      const likes = blogList
        .map((blog) => blog.likes)
        .reduce((acc, numOfLikes) => acc + numOfLikes, 0);
      if (likes > currentMax.likes) {
        return {
          author,
          likes,
        };
      }
      return currentMax;
    },
    {
      author: "",
      likes: -1,
    }
  );
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
