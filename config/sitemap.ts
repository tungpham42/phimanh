// Sitemap configuration
export const SITEMAP_CONFIG = {
  // Base URL for all sitemaps
  baseUrl: 'http://localhost:3001',
  
  // TMDB API configuration
  tmdb: {
    apiKey: 'fecb69b9d0ad64dbe0802939fafc338d',
    baseUrl: 'https://api.themoviedb.org/3',
  },
  
  // Batch configuration
  batches: {
    movies: {
      count: 15,           // Number of movie batches
      pagesPerBatch: 25,   // Pages per batch (25 * 20 = 500 items)
    },
    tvShows: {
      count: 5,            // Number of TV show batches  
      pagesPerBatch: 25,   // Pages per batch (25 * 20 = 500 items)
    },
  },
  
  // Cache settings
  cache: {
    revalidate: 3600, // 1 hour
    maxAge: 3600,     // 1 hour
  }
};

// Helper function to get base URL
export const getBaseUrl = () => SITEMAP_CONFIG.baseUrl;

// Helper function to get TMDB config
export const getTmdbConfig = () => SITEMAP_CONFIG.tmdb;

// Helper function to get batch config
export const getBatchConfig = () => SITEMAP_CONFIG.batches;