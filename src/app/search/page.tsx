"use client";

import {Movie} from "@/types/movieFull.dto";
import {getSearchedMovies} from "@/utils/requests";
import {useState} from "react";

import Row from "../components/Row/Row";
import SearchBox from "../components/SearchBar/SearchBar";
import styles from "./Search.module.scss";
import section from "../../app/page.module.scss";
import Modal from "@/app/components/Modal/Modal";

const Search: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchCompleted, setSearchCompleted] = useState(false);

    const handleSearch = async () => {
        if (searchQuery.trim() !== "") {
            try {
                const searchedMovies = await getSearchedMovies(searchQuery);
                console.log(searchedMovies);
                setMovies(searchedMovies.results);
                setSearchCompleted(true);
            } catch (error) {
                console.error("Error searching movies:", error);
            }
        } else {
            setMovies([]);
            setSearchCompleted(true);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            setMovies([]);
            setSearchCompleted(false); // Clear the movies list when the search query is empty
        } else {
            handleSearch(); // Call handleSearch when the search query is not empty
        }
    };

    return (
        <div className={styles.search_container}>
            <main className={styles.main}>
                <div className={styles.container}>
                    <SearchBox
                        className={styles.searchBar}
                        placeholder="Type to search movies"
                        onChangeHandler={handleSearchChange}
                    />
                    <section className={section.rows}>
                        {searchCompleted && movies.length === 0 ? (
                            <div className={styles.search_not_found}>
                                <p className={styles.search_not_found_title}>No movies found</p>
                            </div>
                        ) : (
                            <Row
                                title={"Searched movies"}
                                movies={movies}
                                loadingMessage="The searched movies will be displayed here"
                            />
                        )}
                    </section>
                </div>
            </main>
            <Modal/>
        </div>
    );
};

export default Search;
