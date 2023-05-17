"use client";
import React, { useState, useEffect } from "react";
import { Movie } from "@/types/movie.dto";
import styles from "../../page.module.scss";
import CardList from "../CardList/CardList";
import SearchBox from "../SearchBar/SearchBar";
import Header from "../Header/Header";
import axios from "axios";


const MainPage:React.FC = () =>  {

const TRENDING_MOVIES_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [allTrendingMovies, setAllTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(TRENDING_MOVIES_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const trendingMovies = data.results;
        setTrendingMovies(trendingMovies);
        setAllTrendingMovies(trendingMovies);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchMovies = (query: string) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    axios.get(url)
      .then((response) => {
        const searchResults = response.data.results;
        setTrendingMovies(searchResults);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query === "") {
      setTrendingMovies(allTrendingMovies); // Reset the movies to all trending movies
    } else {
      searchMovies(query);
    }
  };

  return (
    <div className={styles.body}>
      <SearchBox onChangeHandler={handleSearchChange}
      />
      <Header onSearch={searchMovies} />
      <CardList cards={trendingMovies} />
    </div>
  );
};

export default MainPage;