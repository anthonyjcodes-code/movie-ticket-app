const mongoose = require('mongoose');
const Movie = require('./src/models/movie');
const Cinema = require('./src/models/cinema');
require('dotenv').config();

const fixMovieUrls = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/moviestore', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Fix movie URLs
    const movies = await Movie.find({});
    console.log(`Found ${movies.length} movies`);

    for (const movie of movies) {
      if (movie.image) {
        // Convert absolute URLs to relative URLs and fix backslashes
        let newImageUrl = movie.image;
        
        // Replace http://localhost:8080/uploads\movies/ with /uploads/movies/
        newImageUrl = newImageUrl.replace(/http:\/\/localhost:8080\/uploads\\movies\//g, '/uploads/movies/');
        
        // Replace any remaining backslashes with forward slashes
        newImageUrl = newImageUrl.replace(/\\/g, '/');
        
        if (newImageUrl !== movie.image) {
          movie.image = newImageUrl;
          await movie.save();
          console.log(`Fixed movie ${movie.title}: ${movie.image}`);
        }
      }
    }

    // Fix cinema URLs
    const cinemas = await Cinema.find({});
    console.log(`Found ${cinemas.length} cinemas`);

    for (const cinema of cinemas) {
      if (cinema.image) {
        // Convert absolute URLs to relative URLs and fix backslashes
        let newImageUrl = cinema.image;
        
        // Replace http://localhost:8080/uploads\cinemas/ with /uploads/cinemas/
        newImageUrl = newImageUrl.replace(/http:\/\/localhost:8080\/uploads\\cinemas\//g, '/uploads/cinemas/');
        
        // Replace any remaining backslashes with forward slashes
        newImageUrl = newImageUrl.replace(/\\/g, '/');
        
        if (newImageUrl !== cinema.image) {
          cinema.image = newImageUrl;
          await cinema.save();
          console.log(`Fixed cinema ${cinema.name}: ${cinema.image}`);
        }
      }
    }

    console.log('URL fixing completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing URLs:', error);
    process.exit(1);
  }
};

fixMovieUrls();
