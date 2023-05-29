'use client'
import React, { useEffect, useState } from "react";
import Row from "../components/Row/Row";
import { Movie } from "@/types/movieFull.dto";
import { useCustomSession } from "@/hooks/useCustomSession";
import Modal from "../components/Modal/Modal";
import styles from "./favorites.module.scss";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useCustomSession();
  const userId = session?.user.id;

  const [getFavor, setGetFavor] = useState<any>({}); // Use state to manage getFavor
  const [moviesList, setMoviesList] = useState<any[]>([]); // Use state to manage moviesList

  useEffect(() => {
    async function fetchFavourites() {
      if (userId != null) {
        await fetch("/api/favourites/getFavourites", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            userId: userId.toString(),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setGetFavor(data); // Update getFavor using setGetFavor
            setMoviesList(data.data); // Update moviesList using setMoviesList
          })
          .catch((error) =>
            console.error("Error fetching favourite movie IDs:", error)
          );
      }
    }

    fetchFavourites();
  }, [userId]);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieList, setMovieList] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMovies() {
      if (moviesList != null) {
        const moviePromises = moviesList.map(async (movieId: any) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
          );
          return response.json();
        });
        const fetchedMovies = await Promise.all(moviePromises);
        setMovies(fetchedMovies);
        console.log(fetchedMovies);

        if (fetchedMovies.length !== 0) {
          console.log("We have some shit");
          setMovieList(true);
        }
      }
    }

    fetchMovies();
  }, [moviesList]);

  return (
    <div className={styles.favorites_container}>
      <div className={styles.favorites_main}>
        {!movieList ? (
          <>
            <p className={styles.favorites_title}>
              Your list is empty.{" "}
              <Link
                href={"/"}
                className={`${styles.add_some_link} ${styles.underline_animation}`}
              >
                Add some.
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className={styles.favorites_title}>My list</p>
            <Row title="" movies={movies} />
          </>
        )}
      </div>
      <Modal />
    </div>
  );
}
