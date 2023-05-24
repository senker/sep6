'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Row from "../components/Row/Row";
import styles from "./Dashboard.module.scss";
import { Movie } from "@/types/movieFull.dto";


export default function Dashboard() {
  const { data: session } = useSession();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      // Check if the session exists and has the favourites array
      if (session && session.user.favourites && session.user.favourites.length > 0) {
        const moviePromises = session.user.favourites.map(async (movieId: any) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
          );
          return response.json();
        });
        const fetchedMovies = await Promise.all(moviePromises);
        setMovies(fetchedMovies);
  console.log(movies);

      }
    }
    fetchMovies();
  }, [session]);


  return (
    <div className={styles.body}>
      <Row title="Favourites" movies={movies} />
    </div>
  );
}