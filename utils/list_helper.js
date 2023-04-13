const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0;
  }
  return 1;
};

module.exports = { dummy, totalLikes };
