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
        // Convert to proper relative URL format
        let newImageUrl = movie.image;
        
        // Remove http://localhost:8080 prefix if present
        newImageUrl = newImageUrl.replace(/https?:\/\/localhost:8080/g, '');
        
        // Replace backslashes with forward slashes
        newImageUrl = newImageUrl.replace(/\\/g, '/');
        
        // Ensure it starts with /uploads/
        if (!newImageUrl.startsWith('/uploads/')) {
          // Extract filename if it's a full path
          const filename = newImageUrl.split('/').pop();
          newImageUrl = `/uploads/movies/${filename}`;
        }
        
        if (newImageUrl !== movie.image) {
          movie.image = newImageUrl;
          await movie.save();
          console.log(`Fixed movie ${movie.title}: ${newImageUrl}`);
        }
      }
    }

    // Fix cinema URLs
    const cinemas = await Cinema.find({});
    console.log(`Found ${cinemas.length} cinemas`);

    for (const cinema of cinemas) {
      if (cinema.image) {
        // Convert to proper relative URL format
        let newImageUrl = cinema.image;
        
        // Remove http://localhost:8080 prefix if present
        newImageUrl = newImageUrl.replace(/https?:\/\/localhost:8080/g, '');
        
        // Replace backslashes with forward slashes
        newImageUrl = newImageUrl.replace(/\\/g, '/');
        
        // Ensure it starts with /uploads/
        if (!newImageUrl.startsWith('/uploads/')) {
          // Extract filename if it's a full path
          const filename = newImageUrl.split('/').pop();
          newImageUrl = `/uploads/cinemas/${filename}`;
        }
        
        if (newImageUrl !== cinema.image) {
          cinema.image = newImageUrl;
          await cinema.save();
          console.log(`Fixed cinema ${cinema.name}: ${newImageUrl}`);
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
