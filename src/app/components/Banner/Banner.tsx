"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {PlayIcon, PlusIcon} from "@heroicons/react/solid";
import styles from "./Banner.module.scss";
import {modalState, movieState} from "@/app/atoms/modalAtom";
import {useRecoilState} from "recoil";
import {Movie} from "@/types/movieFull.dto";
import {useRouter} from "next/navigation";
import {useCustomSession} from "@/hooks/useCustomSession";
import {formatDate, formatDateYear} from "@/utils/date";


interface Props {
    netflixOriginals: Movie[];
}

function Banner({netflixOriginals}: Props) {

    /* ------------------------------ SESSION ------------------------------ */

    const {data: session} = useCustomSession();
    const sessionUser = session?.user;
    const [userExists, setUserExists] = useState<boolean>(false);

    useEffect(() => {
        if (sessionUser != null) {
            setUserExists(true);
        }
    }, [sessionUser]);

    /* ------------------------------ FANCY MOCk-UP LOGIC ------------------------------ */

    // Random resolution
    const resolutions = ["HD", "Full HD", "Ultra HD", "4K", "8K"];
    const randomResolution =
        resolutions[Math.floor(Math.random() * resolutions.length)];

    // Random match percentage
    const getRandomMatchPercentage = () => {
        return Math.floor(Math.random() * (98 - 85 + 1) + 85);
    };
    const matchPercentage = getRandomMatchPercentage();

    /* ------------------------------ OTHER BASE LOGIC ------------------------------ */

    const router = useRouter()

    const [movie, setMovie] = useState<Movie | null>(null);
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

    useEffect(() => {
        const randomIndex = Math.floor(
            Math.random() * netflixOriginals.length
        );
        setMovie(netflixOriginals[randomIndex]);
    }, [netflixOriginals]);

    return (
        <div className={styles.banner_container}>
            <div className={styles.banner_container_image}>
                <div className={styles.banner_image}>
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${
                            movie?.backdrop_path || movie?.poster_path
                        }`}
                        layout="fill"
                        alt="Netflix Banner"
                        loading={"lazy"}
                        style={{
                            objectFit: "cover",
                        }}
                    />
                </div>
            </div>

            <h1 className={styles.banner_title}>
                {movie?.title ||
                    movie?.name ||
                    movie?.original_name ||
                    "No Available Title"}
            </h1>

            <div className={styles.banner_info}>
                <p className={styles.banner_match}>
                   {matchPercentage}% Match
                </p>

                <p className={styles.banner_date}>
                    {formatDateYear(movie?.release_date) ||
                        formatDateYear(movie?.first_air_date) ||
                        null}
                </p>

                <div className={styles.banner_icon}>
                    {randomResolution}
                </div>

                <div className={styles.banner_icon}>
                    {movie?.vote_average.toFixed(1) || null}
                </div>


            </div>

            <p className={styles.banner_overview}>
                {movie?.overview || "No available description for this movie"}
            </p>

            <div className={styles.banner_button_container}>
                <button
                    className={styles.banner_button}
                    onClick={() => {
                        setCurrentMovie(movie);
                        setShowModal(true);
                    }}
                >
                    <PlayIcon height="1.5rem" width="1.5rem"/> Play
                </button>
                {userExists ? <button className={styles.banner_button} onClick={() => router.push('/favorites')}>
                    <PlusIcon height="1.5rem" width="1.5rem"/> My List
                </button> : null}
            </div>
        </div>
    );
}

export default Banner;
