"use client"
import { useState, useEffect } from 'react';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
}


const API_KEY = process.env.TMDB_API_KEY;
const TRENDING_MOVIES_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    console.log(API_KEY);
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
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingMovies;
