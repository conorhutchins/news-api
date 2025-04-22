# News Article API

A simple REST API for managing news articles. This API provides endpoints to retrieve, view details, and add news articles.

## Features

- List all news articles (titles, summaries, authors, publication dates)
- Get detailed information about a specific article
- Add new articles to the system

## Technology Stack

- Node.js
- TypeScript
- Express.js
- In-memory data storage
- Jest for testing

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone [repository-url]
   cd news-api
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Run the development server
   ```
   npm run dev
   ```

4. Run tests
   ```
   npm test
   ```

## API Documentation

### GET /api/articles
Returns a list of all articles (without full content)

### GET /api/articles/:id
Returns full detailed information about a specific article

### POST /api/articles
Adds a new article

Required fields:
- title
- summary
- content
- author
