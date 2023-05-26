"use client";

import {useEffect, useState} from "react";
import Row from "../components/Row/Row";
import {Movie} from "@/types/movieFull.dto";
import {useCustomSession} from "@/hooks/useCustomSession";
import Modal from "../components/Modal/Modal";
import styles from './favorites.module.scss'

export default function Dashboard() {
    const {data: session} = useCustomSession();
    const [movies, setMovies] = useState<Movie[]>([]);
    const sessionFavourites = session?.user?.favourites;

    useEffect(() => {
        async function fetchMovies() {
            if (sessionFavourites != null) {
                const moviePromises = sessionFavourites?.map(async (movieId: any) => {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
                    );
                    return response.json();
                });
                const fetchedMovies = await Promise.all(moviePromises);
                setMovies(fetchedMovies);
                // console.log(movies);
            }
        }

        fetchMovies();
    }, [sessionFavourites]);

    return (
        <div className={styles.favorites_container}>
            <div className={styles.favorites_main}>
                <p className={styles.favorites_title}>My list</p>
                <Row title="" movies={movies}/>
            </div>
            <Modal/>
        </div>
    );
}
