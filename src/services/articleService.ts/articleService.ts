import { Article } from '../../types/Article';
import { articles as initialArticles } from '../../data/articles'; // Import the sample data
import { v4 as uuidv4 } from 'uuid';

// Make a mutable copy of the initial articles array
let articles: Article[] = [...initialArticles];

// Grab all articles without full content for the list view
export const getAllArticles = (): Omit<Article, 'content'>[] => {
  // Return only title, summary, author, publication date for the list endpoint
  return articles.map(({ id, title, summary, author, publicationDate }) => ({
    id,
    title,
    summary,
    author,
    publicationDate
  }));
};

// Grab a specific article by ID in the params including content
export const getArticleById = (id: string): Article | undefined => {
  return articles.find(article => article.id === id);
};

// Post a new article using article data without ID and return the article with a generated ID
export const addArticle = (articleData: Omit<Article, 'id'>): Article => {
  const newArticle: Article = {
    id: uuidv4(), // add on an id 
    ...articleData
  };
  articles.push(newArticle); // Add the new article to the end of the existing array
  return newArticle;
};

// Reset the articles array to the initial data
export const resetArticles = () => {
  const { articles: initialArticles } = require('../../data/articles'); 
  articles = [...initialArticles];
};
