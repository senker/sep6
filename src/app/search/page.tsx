"use client"

import { Movie } from "@/types/movieFull.dto";
import { getSearchedMovies } from "@/utils/requests";
import { useState } from "react";

import Row from "../components/Row/Row";
import SearchBox from "../components/SearchBar/SearchBar";
import styles from "./Search.module.scss"
import styles1 from "../../app/page.module.scss"
import Modal from "@/app/components/Modal/Modal";


const Search: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async () => {
        if (searchQuery.trim() !== '') {
          try {
            const searchedMovies = await getSearchedMovies(searchQuery);
            console.log(searchedMovies);
            setMovies(searchedMovies.results);
          } catch (error) {
            console.error('Error searching movies:', error);
          }
        } else {
          setMovies([]);
        }
      };
    
      const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        
        if (query.trim() === '') {
            setMovies([]); // Clear the movies list when the search query is empty
          } else {
            handleSearch(); // Call handleSearch when the search query is not empty
          }
      };

    return(
        <>
            <div className={styles.mainDiv}>
                <h1>Search page.</h1>
                <SearchBox
                    placeholder="Search for a movie"
                    onChangeHandler={handleSearchChange}
                />
                <section className={styles1.rows}>
                    {movies.length === 0 ? (
                        <p>No movies found.</p>
                    ) : (
                        <Row title={"Searched movies"} movies={movies} />
                    )}
                </section>
            </div>
            <Modal />
        </>
        )      
}

export default Search;