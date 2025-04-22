import express, { Express, Request, Response } from 'express';
import articleRoutes from './routes/articleRoutes/articleRoutes'; 

const app: Express = express();

const PORT: number = 3000;

// Middleware to parse
app.use(express.json());

// Routes
app.use('/api/articles', articleRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('News Article API is running!');
});
// start the server if the file is run directly and not in test mode
if (require.main === module && process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }

export default app;
