"use client";

import { useEffect, useState } from "react";
import XIcon from "@heroicons/react/outline/XIcon";
import { PlusIcon, VolumeOffIcon } from "@heroicons/react/solid";
import { CheckIcon, VolumeUpIcon } from "@heroicons/react/outline";
import MuiModal from "@mui/material/Modal";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import ReactPlayer from "react-player/lazy";
import styles from "./Modal.module.scss";
import { modalState, movieState } from "@/app/atoms/modalAtom";
import { Element } from "@/types/element.dto";
import { Movie } from "@/types/movieFull.dto";
import { Genre } from "@/types/genre.dto";
import { Crew } from "@/types/crew.dto";
import { MovieCredits } from "@/types/movieCredits.dto";
import { getNumberWithSpaces } from "@/utils/numbers";
import { formatDate } from "@/utils/date";
import { useCustomSession } from "@/hooks/useCustomSession";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);

  const [fetchedMovie, setFetchedMovie] = useState<Movie>();
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesData, setMoviesData] = useState<MovieCredits | null>(null);
  const [movieExecutors, setMovieExecutors] = useState<{
    directors: Crew[];
    writers: Crew[];
  }>({ directors: [], writers: [] });

  const [muted, setMuted] = useState(true);
  const [addedToList, setAddedToList] = useState(false);
  const [movieList, setMovieList] = useState<number[]>([]);

  // Extra fancy stuff
  const resolutions = ["HD", "Full HD", "Ultra HD", "4K", "8K"];
  const randomResolution =
    resolutions[Math.floor(Math.random() * resolutions.length)];

  const { data: session } = useCustomSession();
  const sessionFavourites = session?.user?.favourites;
  const userId = session?.user?.id;

  useEffect(() => {
    setMovieList(sessionFavourites || []);

    if (!movie) return;

    async function getMovieCreditsFetch() {
      const movieData = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json());

      setMoviesData(movieData);
      if (movieData?.cast && movieData?.crew) {
      }

      if (movieData?.crew) {
        const executors: {
          directors: Crew[];
          writers: Crew[];
        } = {
          directors: [],
          writers: [],
        };

        movieData.crew.map((c: Crew) => {
          if (c.job === "Director") executors.directors.push(c);
          else if (c.job === "Writer" || c.job === "Novel")
            executors.writers.push(c);
        });

        setMovieExecutors(executors);
      }
    }

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      setFetchedMovie(data);

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
    getMovieCreditsFetch();
  }, [movie]);

  const handleList = async () => {
    let getFavor: any = {}; // Initialize as an empty object
    if (userId != null) {
      await fetch("/api/favourites/getFavourites", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userId: userId.toString(),
        },
      })
        .then((response) => response.json())
        .then((data) => (getFavor = data)) // Assign data to getFavor
        .catch((error) =>
          console.error("Error fetching favourite movie IDs:", error)
        );

      console.log(getFavor.data);
    }
    const moviezList = getFavor.data;
    console.log(movieList);
    console.log(JSON.stringify(movie.id));
    if (moviezList.includes(movie.id) && typeof userId === "number") {
      console.log(movieList);
      console.log(JSON.stringify(movie.id));
      const movieIdToRemove = movie.id;
      console.log(userId);

      const removeFavourite = async (
        userId: number,
        movieIdToRemove: number
      ) => {
        const response = await fetch("/api/favourites/removeFavourites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, movieIdToRemove }),
        });
        // Inside the removeFavourite function
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        if (response.ok) {
          const data = await response.json();
          console.log("Successfully removed favourite:", data);
        } else {
          const errorText = await response.text();
          console.error("Error removing favourite:", errorText);
        }
      };

      // Call the function with the appropriate userId and movieIdToRemove
      removeFavourite(userId, movieIdToRemove);

      toast(
        `"${
          fetchedMovie?.title || fetchedMovie?.original_name
        }" has been removed from your favorite list`,
        {
          duration: 8000,
        }
      );
    } else if (!moviezList.includes(movie.id) && typeof userId === "number") {
      const movieIdToAdd = movie.id;
      const addToFavourites = async (
        userId: number,
        movieIdToRemove: number
      ) => {
        const response = await fetch("/api/favourites/addFavourites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            movieIdToAdd,
          }),
        });

        const responseData = await response.json();
        console.log(responseData.data.favourites);
      };

      addToFavourites(userId, movieIdToAdd);

      toast(
        `"${
          fetchedMovie?.title || fetchedMovie?.original_name
        }" has been added the your favorite list`,
        {
          duration: 1500,
        }
      );
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className={styles.modal_container}
    >
      <div>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              border: "1px solid #ffffff",
              padding: "1rem",
              background: "#181818",
              color: "#ffffff",
            },
          }}
        />

        <button onClick={handleClose} className={`${styles.modalButton_Close}`}>
          <XIcon height="1.5rem" width="1.5rem" strokeWidth="2" />
        </button>

        <div className={styles.modal_container_player}>
          <div className={styles.modal_container_player_container}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    disablekb: 1,
                  },
                },
              }}
              muted={muted}
              playing
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                objectFit: "cover",
              }}
            />
          </div>

          <div className={styles.modal_buttons_container}>
            <div className={styles.modalButton_list}>
              <button className={styles.modalButton} onClick={handleList}>
                {addedToList ? (
                  <CheckIcon height="1.5rem" width="1.5rem" />
                ) : (
                  <PlusIcon height="1.5rem" width="1.5rem" />
                )}
              </button>

              <button
                className={styles.modalButton}
                onClick={() => setMuted(!muted)}
              >
                {muted ? (
                  <VolumeOffIcon height="1.5rem" width="1.5rem" />
                ) : (
                  <VolumeUpIcon height="1.5rem" width="1.5rem" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.modal_container_additional_info_main}>
            <div className={styles.modal_container_header}>
              <p className={styles.modal_container_rating}>
                Rating:{" "}
                {fetchedMovie?.vote_average.toFixed(2) || "Not Available"}
              </p>
              <p className={styles.modal_container_date}>
                {formatDate(fetchedMovie?.release_date) ||
                  formatDate(fetchedMovie?.first_air_date) ||
                  "Not Available"}
              </p>
              <div className={styles.modal_container_icon}>
                {fetchedMovie ? fetchedMovie?.status : null}
              </div>
              <div className={styles.modal_container_icon}>
                {randomResolution}
              </div>
            </div>

            <div className={styles.modal_container_details}>
              <div className={styles.modal_container_main_details}>
                <h2 className={styles.modal_container_movie_title}>
                  {fetchedMovie?.title ||
                    fetchedMovie?.original_title ||
                    fetchedMovie?.name ||
                    "No Available Title"}
                </h2>
                <p className={styles.modal_container_overview}>
                  {fetchedMovie?.overview ||
                    "No available description for this movie"}
                </p>
              </div>

              <div className={styles.modal_container_identifiers}>
                <div>
                  <span className={styles.modal_container_color_gray}>
                    Genres:{" "}
                  </span>
                  {genres.map((genre) => genre.name).join(", ") || "N/A"}
                </div>

                <div>
                  <span className={styles.modal_container_color_gray}>
                    Original language:{" "}
                  </span>
                  {fetchedMovie?.original_language.toUpperCase() || "N/A"}
                </div>
                <div>
                  <span className={styles.modal_container_color_gray}>
                    Runtime:{" "}
                  </span>
                  <p className={styles.modal_container_runtime}>
                    {fetchedMovie?.runtime || "N/A"}
                  </p>{" "}
                  min
                </div>
                <div>
                  <span className={styles.modal_container_color_gray}>
                    Total votes:{" "}
                  </span>
                  {fetchedMovie?.vote_count || "N/A"} votes
                </div>
              </div>
            </div>

            <div className={styles.modal_container_cast_title}>
              <h2>Cast</h2>
            </div>
            <div className={styles.modal_container_top_casts}>
              {moviesData
                ? moviesData.cast.slice(0, 4).map(({ id, name, character }) => (
                    <div key={id} className={styles.modal_container_top_cast}>
                      <p className={styles.modal_container_top_cast_character}>
                        {character || "No available character type"}
                      </p>
                      <div>
                        <p className={styles.modal_container_top_cast_name}>
                          {name || "No name"}
                        </p>
                      </div>
                    </div>
                  ))
                : ["Cast list not available"]}
            </div>

            <div className={styles.modal_container_divider}></div>

            <div className={styles.modal_container_more_info}>
              <div className={styles.modal_container_more_info_inner}>
                <div className={styles.modal_container_director_title}>
                  {movieExecutors.directors.length > 0 ? (
                    <h5
                      className={
                        styles.modal_container_director_title_typography
                      }
                    >
                      Director{movieExecutors.directors.length > 1 && "s"}
                    </h5>
                  ) : null}
                  <div className={styles.modal_container_director_cast}>
                    <p className={styles.modal_container_top_cast_name}>
                      {movieExecutors.directors.map(({ name }, index) => (
                        <li key={index} className={styles.modal_container_li}>
                          {name || "No name"}
                        </li>
                      ))}
                    </p>
                  </div>
                </div>
                <div className={styles.modal_container_director_title}>
                  {movieExecutors.writers.length > 0 ? (
                    <h5
                      className={
                        styles.modal_container_director_title_typography
                      }
                    >
                      Writer{movieExecutors.writers.length > 1 && "s"}
                    </h5>
                  ) : null}
                  {movieExecutors.writers.length > 0 ? (
                    <div className={styles.modal_container_director_cast}>
                      <p className={styles.modal_container_top_cast_name}>
                        {movieExecutors.writers.map(({ name }, index) => (
                          <li key={index} className={styles.modal_container_li}>
                            {name || "No name"}
                          </li>
                        ))}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className={styles.modal_container_boxoffice_container}>
                <div className={styles.modal_container_boxoffice_title}>
                  <h3>Box Office</h3>
                </div>
                <div className={styles.modal_container_boxoffice_inner}>
                  <div className={styles.modal_container_boxoffice_budget}>
                    <h5 className={styles.modal_container_color_gray}>
                      Budget Worldwide
                    </h5>
                    <p className={styles.modal_container_boxoffice_paragraph}>
                      {fetchedMovie?.budget
                        ? "$ " + getNumberWithSpaces(fetchedMovie?.budget)
                        : "Not available"}
                    </p>
                  </div>

                  <div className={styles.modal_container_boxoffice_gross}>
                    <h5 className={styles.modal_container_color_gray}>
                      Cumulative Worldwide Gross
                    </h5>
                    <p className={styles.modal_container_boxoffice_paragraph}>
                      {fetchedMovie?.revenue
                        ? "$ " + getNumberWithSpaces(fetchedMovie?.revenue)
                        : "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MuiModal>
  );
}

export default Modal;
