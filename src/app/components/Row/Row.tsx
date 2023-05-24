'use client'

import {Movie} from "@/types/movieFull.dto";
import Thumbnail from "../Thumbnail/Thumbnail";
import styles from "./Row.module.scss";

import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/outline";
import {useRef, useState} from "react";

interface Props {
    title: string;
    movies: Movie[];
    
}

function Row({title, movies}: Props) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);

    // console.log(title)
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
