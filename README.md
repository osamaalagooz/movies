# [MoviesStream](https://66b29dcc38ed5a00970482ce--alagoozmoviess.netlify.app/): Discover Your Next Favorite Show

## Project Description

MovieStream is a dynamic web application tailored for movie enthusiasts and TV show lovers. Our platform offers a rich browsing experience, enabling users to explore, search, and manage personalized lists of popular and trending movies and TV shows.


### Key Features

- **Search Functionality**: Dive deep into our extensive database to find specific movies and TV shows.
- **User Registration and Authentication**: Securely register and log in to access personalized features.
- **Wishlist**: Save upcoming or interesting content to your personalized wishlist for future viewing.
- **Favorites List**: Keep track of your favorite movies and TV shows, creating a custom list you can return to any time.
- **Rate Movies**: Share your opinions by rating movies and TV shows. Your ratings help improve recommendations and highlight popular content.

## Technology Stack

### Frontend

- **React.js**: Utilized for building the user interface with efficient, declarative components.
- **Redux**: Manages and centralizes the application state, providing a predictable state container.
- **Vite**: a build tool that enhances React development with fast start-up and hot module replacement.
- **Axios**: Handles HTTP requests to backend services, offering promise-based asynchronous communication.
- **React Router**: Manages navigation between views, supporting a single-page application experience.
- **Context API**: allows for easy state management by facilitating data sharing across multiple components without prop drilling.
- **SCSS**: allows for more complex and maintainable CSS with features like variables, nesting, and mixins.

### Backend Integration

- **Node.js**: Serves as the runtime environment for the backend services.
- **Express.js**: Handles backend routing, middleware, and business logic functions.
- **MongoDB**: Used as a NoSQL database to efficiently store user data and content information.
- **Mongoose**: modeling tool designed to provide a straightforward schema-based solution to model application data and handle business logic in Node.js projects.


## Getting Started
To get the project up and running on your local machine, follow these steps:

 ### Clone the repository:

   `` git clone https://github.com/osamaalagooz/movies.git ``

### Frontend

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install

2. **Prepare Configs file `.env`:**
   - **Path:** /frontend/.env
   - **Content:**
   
            VITE_APP_TMDB_TOKEN= <Generate one from TMDB website>           
            VITE_BASE_URL=http://localhost:{BACKEND_PORT}/

3. **Run the development server:**
   ```bash
   npm run dev

   
### Backend:

1. **Install dependencies:**
   ```bash
   cd backend
   npm install

2. **Prepare Configs file `.env`:**
   - **path:** /backend/src/.env
   - **Content:**
   
            MONGO_URI= <will be shared via email>
            JWT_SECRET=mysecretkey
            PORT=3000 # as you need
            BASE_URI=https://api.themoviedb.org/3/
            API_KEY= <Generate one from TMDB website>
     
3. **Run the development server:**
   ```bash
   cd src
   npm server.js
   
