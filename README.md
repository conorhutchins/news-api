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
- Jest for unit testing
- Supertest for intergration testing

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

## Challenges
- Encountered a challenge when working with supertest as the server was starting up when running tests. I did a quick search of StackOverflow to see how others solve it and I employed the solution.

## Use of AI
- This was quite a quick straight forward task so I used AI to help write the unit tests to save time. I didn't see the benefit of using it further as the goal was to keep things straight forward

## Learning from assessment
- It was good practice to create something so quick and keep the requirements super basic, it was quite refreshing to craft something small and not be thinking of ways to expand it.