const Blog = require('../models/Blog');

const fallbackBlogs = [
  {
    title: 'How technology is transforming agriculture',
    content:
      'Digital tools, satellite imaging, and smart analytics are enabling farmers to make better production and selling decisions.',
    image:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80',
    author: 'Agri Insights Team',
  },
  {
    title: 'Understanding mandi price fluctuations',
    content:
      'Seasonal demand, weather, supply chain disruptions, and local market dynamics cause mandi prices to vary widely.',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80',
    author: 'Market Research Desk',
  },
  {
    title: 'Smart selling strategies for farmers',
    content:
      'Compare multiple mandis, estimate logistics, and time your sale to improve net profits consistently.',
    image:
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900&q=80',
    author: 'Rural Growth Lab',
  },
];

const getBlogs = async (_req, res) => {
  try {
    let blogs = await Blog.find().sort({ createdAt: -1 });

    if (!blogs.length) {
      blogs = await Blog.insertMany(fallbackBlogs);
    }

    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
  }
};

module.exports = {
  getBlogs,
};
