import axios from "axios";

// Place your verified API key from newsapi.org here
const API_KEY = "28201f475c9e46569c232518cae590b0"; 
const BASE_URL = "https://newsapi.org/v2";

const newsClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

/**
 * 1. Home Tab: Fetches top trending global headlines
 */
export const fetchTopNews = async (page = 1) => {
  const response = await newsClient.get("/top-headlines", {
    params: { 
      country: "us", 
      page, 
      pageSize: 9 
    },
  });
  return response.data;
};

/**
 * 2. Different Category of News: Fetches top headlines matching a standard desk profile
 */
export const fetchByCategory = async (category, page = 1) => {
  const response = await newsClient.get("/top-headlines", {
    params: { 
      country: "us", 
      category, 
      page, 
      pageSize: 9 
    },
  });
  return response.data;
};

/**
 * 3. India State Wise: Searches across the entire global archive for 
 * articles combining the specific Indian state name with high-relevance terms.
 */
export const fetchIndiaStateNews = async (stateName, page = 1) => {
  const response = await newsClient.get("/everything", {
    params: { 
      q: `"${stateName}" AND India`, 
      sortBy: "publishedAt",
      language: "en",
      page, 
      pageSize: 9 
    },
  });
  return response.data;
};

/**
 * 4. Search Component: Core global standard free-form string query execution
 */
export const fetchBySearch = async (query, page = 1) => {
  const response = await newsClient.get("/everything", {
    params: { 
      q: query, 
      sortBy: "relevance",
      language: "en",
      page, 
      pageSize: 9 
    },
  });
  return response.data;
};