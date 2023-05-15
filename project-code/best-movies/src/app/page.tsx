"use client"
import { useState, useEffect } from 'react';
import { Movie }  from '../types/movie.dto';


const TRENDING_MOVIES_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(TRENDING_MOVIES_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const trendingMovies = data.results;
        setTrendingMovies(trendingMovies);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Trending Movies This Week</h1>
      <ul>
        {trendingMovies.map(movie => (
          <li key={movie.id}>{movie.title} - {movie.release_date.toString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingMovies;
