import { useEffect, useState } from 'react';
import { getBlogs } from '../services/blogService';

const fallbackBlogs = [
  {
    _id: '1',
    title: 'The True Benefits of Choosing Organic for Your Family',
    content:
      'Organic farming protects your family from harmful residues while preserving soil vitality for long-term productivity. With better crop diversity and cleaner practices, farms can produce healthier food and stronger local ecosystems.',
    image:
      'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=1200&q=80',
    author: 'Agri Wellness Team',
  },
  {
    _id: '2',
    title: 'Bringing Traditional Farming Wisdom Into Modern Agriculture',
    content:
      'Blending age-old crop rotation, local seed knowledge, and modern data tools helps farmers reduce risk and increase yield stability. This approach keeps farming rooted in tradition while improving decisions with real-time insight.',
    image:
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
    author: 'Field Innovation Desk',
  },
  {
    _id: '3',
    title: 'Natural Pest Control That Protects Both Crops and Nature',
    content:
      'Natural pest management methods like trap crops, neem-based sprays, and biodiversity buffers reduce chemical dependence. They preserve beneficial insects and create a healthier balance between productivity and sustainability.',
    image:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    author: 'Eco Farming Council',
  },
  {
    _id: '4',
    title: 'A Complete Guide to Growing Seasonal Fruits and Vegetables',
    content:
      'Seasonal planning improves quality and market value while reducing input costs. Understanding local climate windows and market demand helps farmers decide what to plant, when to harvest, and where to sell for the best return.',
    image:
      'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=1200&q=80',
    author: 'Harvest Planning Team',
  },
  {
    _id: '5',
    title: 'Behind the Scenes: Ensuring Freshness from Farm to Your Home',
    content:
      'Fresh produce quality depends on efficient post-harvest handling, transport timing, and storage care. Small improvements in sorting, packaging, and dispatch can significantly reduce wastage and improve farmer income.',
    image:
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80',
    author: 'Supply Chain Team',
  },
  {
    _id: '6',
    title: 'Sustainable Farming Practices Every Small Farmer Should Know',
    content:
      'Water-smart irrigation, soil health monitoring, and low-input crop protection are practical steps that small farmers can adopt quickly. These methods increase resilience and support stable profits across changing seasons.',
    image:
      'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
    author: 'Rural Growth Lab',
  },
];

const PAGE_SIZE = 6;

const getPreview = (content, maxLength = 110) => {
  if (!content) return '';
  if (content.length <= maxLength) return content;
  return `${content.slice(0, maxLength).trim()}...`;
};

const getDelayClass = (index) => `fx-delay-${(index % 5) + 1}`;

const BlogsPage = () => {
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await getBlogs();
        if (data.length) {
          setBlogs(data);
        }
      } catch {
        setBlogs(fallbackBlogs);
      }
    };

    loadBlogs();
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setSelectedBlog(null);
      }
    };

    if (selectedBlog) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [selectedBlog]);

  const totalPages = Math.max(1, Math.ceil(blogs.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + PAGE_SIZE);

  const openBlogModal = (blog) => {
    setSelectedBlog(blog);
  };

  const closeBlogModal = () => {
    setSelectedBlog(null);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-amber-50/80 text-slate-900">
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        <div className="fx-reveal relative overflow-hidden rounded-[2rem]">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1800&q=80"
            alt="Farm background for blogs page"
            className="h-[250px] w-full object-cover md:h-[330px]"
          />
          <div className="absolute inset-0 bg-slate-950/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
            <p className="inline-flex rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
              Our Blog
            </p>
            <h1 className="mt-4 text-4xl font-bold md:text-6xl">Fresh stories from the field</h1>
            <p className="mt-3 text-sm text-white/90 md:text-base">Home / Blog</p>
          </div>
        </div>
      </section>

      <section className="fx-reveal mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedBlogs.map((blog, index) => (
            <article
              key={blog._id || blog.title}
              role="button"
              tabIndex={0}
              onClick={() => openBlogModal(blog)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openBlogModal(blog);
                }
              }}
              className={`fx-reveal ${getDelayClass(index)} fx-hover-lift fx-card-premium rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
            >
              <img src={blog.image} alt={blog.title} className="fx-card-image h-56 w-full object-cover" />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-slate-900">{blog.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{getPreview(blog.content)}</p>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    openBlogModal(blog);
                  }}
                  className="mt-5 w-full rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
                >
                  Read More
                </button>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="fx-reveal fx-delay-2 mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="h-9 w-9 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === currentPage;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => goToPage(pageNumber)}
                  className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-amber-400 text-slate-900'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-9 w-9 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ›
            </button>
          </div>
        )}
      </section>

      {selectedBlog && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4 py-8"
          onClick={closeBlogModal}
        >
          <div
            className="fx-reveal max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="h-64 w-full rounded-t-3xl object-cover md:h-80"
            />
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
                <span className="rounded-full bg-amber-100 px-3 py-1">Blog Detail</span>
                {selectedBlog.author && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{selectedBlog.author}</span>
                )}
                {selectedBlog.createdAt && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                    {new Date(selectedBlog.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              <h3 className="mt-5 text-3xl font-bold leading-tight text-slate-900">{selectedBlog.title}</h3>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-slate-700">
                {selectedBlog.content}
              </p>

              <button
                type="button"
                onClick={closeBlogModal}
                className="mt-7 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
