import request from 'supertest';
import app from '../index'
import { resetArticles } from '../services/articleService/articleService';  
import { articles as initialArticlesData } from '../data/articles'; 

beforeEach(() => {
  resetArticles();
});

describe('Article API Routes', () => {
  describe('POST /api/articles', () => {
    it('should create a new article and return it with status 201', async () => {
      const newArticle = {
        title: 'Test POST Article',
        summary: 'Testing the POST endpoint.',
        content: 'Full content for the test article.',
        author: 'Jest Tester',
      };

      const response = await request(app)
        .post('/api/articles')
        .send(newArticle)
        .expect('Content-Type', /json/)
        .expect(201); 

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id'); 
      expect(response.body.data.title).toBe(newArticle.title);
      expect(response.body.data.summary).toBe(newArticle.summary);
      expect(response.body.data.content).toBe(newArticle.content);
      expect(response.body.data.author).toBe(newArticle.author);
      expect(response.body.data).toHaveProperty('publicationDate'); 

      // Verify it was actually added by trying to GET it
      const getResponse = await request(app).get(`/api/articles/${response.body.data.id}`);
      expect(getResponse.statusCode).toBe(200);
      expect(getResponse.body.data.title).toBe(newArticle.title);
    });

    it('should return status 400 if required fields are missing', async () => {
      const incompleteArticle = {
        title: 'Incomplete Article',
      };

      const response = await request(app)
        .post('/api/articles')
        .send(incompleteArticle)
        .expect('Content-Type', /json/)
        .expect(400); 

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Please provide title, summary, content, and author');
    });
  });

  describe('GET /api/articles', () => {
    it('should return a list of all articles (without content) with status 200', async () => {
      const response = await request(app)
        .get('/api/articles')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(initialArticlesData.length);
      expect(Array.isArray(response.body.data)).toBe(true);

      if (response.body.data.length > 0) {
        expect(response.body.data[0]).toHaveProperty('id');
        expect(response.body.data[0]).toHaveProperty('title');
        expect(response.body.data[0]).toHaveProperty('summary');
        expect(response.body.data[0]).toHaveProperty('author');
        expect(response.body.data[0]).toHaveProperty('publicationDate');
        expect(response.body.data[0]).not.toHaveProperty('content');
      }
    });
  });

  describe('GET /api/articles/:id', () => {
    it('should return a specific article (with content) by ID with status 200', async () => {
      const testId = initialArticlesData[0].id; 

      const response = await request(app)
        .get(`/api/articles/${testId}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(testId);
      expect(response.body.data.title).toBe(initialArticlesData[0].title);
      expect(response.body.data).toHaveProperty('content'); 
      expect(response.body.data.content).toBe(initialArticlesData[0].content);
    });

    it('should return status 404 for a non-existent ID', async () => {
      const nonExistentId = 'non-existent-id-123';
      const response = await request(app)
        .get(`/api/articles/${nonExistentId}`)
        .expect('Content-Type', /json/)
        .expect(404); // Expect 'Not Found' status

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain(`Sorry, we don't have an article`);
      expect(response.body.error).toContain(nonExistentId);
    });
  });
});