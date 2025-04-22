import express, { Request, Response } from 'express';
import { getAllArticles, getArticleById, addArticle } from '../../services/articleService/articleService';
import { Article } from '../../types/Article';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const articles = getAllArticles();
    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    console.error('Error getting all articles:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});


router.get('/:id', (req: Request, res: Response) => {
  try {
    const article = getArticleById(req.params.id);

    if (!article) {
      // If no article with that id is found, return 404
      return res.status(404).json({
        success: false,
        error: `Sorry, we don't have an article in our data with the id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error(`Error getting article ${req.params.id}:`, error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const { title, summary, content, author, publicationDate } = req.body;

    // Validate the data
    if (!title || !summary || !content || !author) {
      return res.status(400).json({
        success: false,
        error: 'Please provide title, summary, content, and author'
      });
    }

    // The data that will be added to the article
    const newArticleData: Omit<Article, 'id'> = {
      title,
      summary,
      content,
      author,
      publicationDate: publicationDate || new Date().toISOString().split('T')[0]
    };

    // Add the article using the service function
    const createdArticle = addArticle(newArticleData);

    // Return the newly created article with a 201 status code
    res.status(201).json({
      success: true,
      data: createdArticle
    });
  } catch (error) {
    console.error('Error adding article:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

export default router; 