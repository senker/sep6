"use client"
import React, { useEffect, useState } from "react"
import styles from "./Card.module.scss"
import { CardProps } from "@/types/cardProps.dto"



const Card: React.FC<CardProps> = ( {Card} ) => {
    const { id, title } = Card;
    const [posterUrl, setPosterUrl] = useState("");

    useEffect(() => {
        async function fetchMovieDetails() {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          const data = await response.json();
    
          const posterPath = data.poster_path;
          const baseUrl = "https://image.tmdb.org/t/p/original";
          const posterUrl = `${baseUrl}${posterPath}`;
    
          setPosterUrl(posterUrl);
        }
    
        fetchMovieDetails();
      }, [id]);

    return(
        <div className={styles.card} key={id}>
            <img alt={`Movie: ${title}`} src={posterUrl} />
        </div>
    )
}

export default Card;