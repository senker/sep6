'use client'

import {Movie} from "@/types/movieFull.dto";
import Thumbnail from "../Thumbnail/Thumbnail";
import styles from "./Row.module.scss";

import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/outline";
import {useEffect, useRef, useState} from "react";
import { SYMBOL_MODIFY_COOKIE_VALUES } from "next/dist/server/web/spec-extension/adapters/request-cookies";

interface Props {
    title: string;
    movies: Movie[];
    
}

function Row({title, movies}: Props) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);

    console.log(title)
    const handleClick = (direction: string) => {
        setIsMoved(true);

        if (rowRef.current) {
            const {scrollLeft, clientWidth} = rowRef.current;

            const scrollTo =
                direction === "left"
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth;

            rowRef.current.scrollTo({left: scrollTo, behavior: "smooth"});
        }
    };

    // function handleOpacityON() {
    //     const leftButton = document.querySelector(`#row_container_left_button`);
    //     const rightButton = document.querySelector(`#row_container_left_button`);
    //     leftButton.style.opacity = "1";
    //     rightButton.style.opacity = "1";
    // }
    //
    // function handleOpacityOFF() {
    //     const leftButton = document.querySelector(`#row_container_right_button`);
    //     const rightButton = document.querySelector(`#row_container_right_button`);
    //     leftButton.style.opacity = "0";
    //     rightButton.style.opacity = "0";
    // }

    if(!movies?.length) return <>loading</>

    return (
        <div className={styles.row_container}>
            <h2 className={styles.row_container_title}>
                {title}
            </h2>
            <div className={styles.row_container_inner}>
                <ChevronLeftIcon
                    id='row_container_left_button'
                    className={`${styles.row_container_left_button}`}
                    onClick={() => handleClick("left")}
                />
                <div ref={rowRef} className={styles.row_container_movies_list}>
                    {movies?.map((movie) => (
                        <Thumbnail key={movie.id} movie={movie}/>
                    ))}
                </div>
                <ChevronRightIcon
                    id='row_container_right_button'
                    className={styles.row_container_right_button}
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    );
}

export default Row;
