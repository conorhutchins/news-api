import {
  getAllArticles,
  getArticleById,
  addArticle,
  resetArticles 
} from './articleService/articleService'; 
import { Article } from '../types/Article';
import { articles as initialArticlesData } from '../data/articles';

beforeEach(() => {
  resetArticles();
});

describe('Article Service', () => {

  describe('getAllArticles', () => {
    it('should return all articles without content', () => {
      const articles = getAllArticles();
    
      expect(articles.length).toBe(initialArticlesData.length);
      // Check structure (no content field)
      articles.forEach(article => {
        expect(article).toHaveProperty('id');
        expect(article).toHaveProperty('title');
        expect(article).toHaveProperty('summary');
        expect(article).toHaveProperty('author');
        expect(article).toHaveProperty('publicationDate');
        expect(article).not.toHaveProperty('content');
      });
    });
  });

  describe('getArticleById', () => {
    it('should return a specific article with content by ID', () => {
      const testId = initialArticlesData[0].id; // Use ID from initial data
      const article = getArticleById(testId);
      expect(article).toBeDefined();
      expect(article?.id).toBe(testId);
      expect(article?.title).toBe(initialArticlesData[0].title);
      expect(article).toHaveProperty('content'); 
    });

    it('should return undefined for a non-existent ID', () => {
      const article = getArticleById('non-existent-id');
      expect(article).toBeUndefined();
    });
  });

  describe('addArticle', () => {
    it('should add a new article and return it with an ID', () => {
      const newArticleData: Omit<Article, 'id'> = {
        title: 'New Test Article',
        summary: 'Test summary',
        content: 'Test content',
        author: 'Tester',
        publicationDate: '2024-01-01'
      };

      const createdArticle = addArticle(newArticleData);

      expect(createdArticle).toBeDefined();
      expect(createdArticle.id).toBeDefined(); // check if the id is defined
      expect(createdArticle.title).toBe(newArticleData.title);
      expect(createdArticle.content).toBe(newArticleData.content);

      // A check to see if the article was added to the list
      const allArticles = getAllArticles();
      expect(allArticles.length).toBe(initialArticlesData.length + 1);
      const retrievedArticle = getArticleById(createdArticle.id);
      expect(retrievedArticle).toEqual(createdArticle);
    });
  });
}); 