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
