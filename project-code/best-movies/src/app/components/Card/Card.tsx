"use client"
import React, { useEffect, useState } from "react"
import styles from "./Card.module.scss"
import { CardProps } from "@/types/cardProps.dto"
import Spinner from "../Spinner/Spinner"



const Card: React.FC<CardProps> = ( {Card} ) => {
    const { id, title } = Card;
    const [posterUrl, setPosterUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const MOVIE_ID = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

    useEffect(() => {
        async function fetchMovieDetails() {
          setIsLoading(true);
          const response = await fetch(MOVIE_ID);
          const data = await response.json();
          const posterPath = data.poster_path;
          const baseUrl = "https://image.tmdb.org/t/p/original";
          const posterUrl = `${baseUrl}${posterPath}`;
    
          setPosterUrl(posterUrl);
          setIsLoading(false);
        }
    
        fetchMovieDetails();
      }, [id]);

    return(
        <div className={styles.card} key={id}>
          {
            isLoading ? (
              <Spinner />
            ) : (
              <img alt={`Movie: ${title}`} src={posterUrl} />
            )
          }   
        </div>
    )
}

export default Card;