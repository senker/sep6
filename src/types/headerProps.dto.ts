import { Movie } from "./movie.dto";

export interface HeaderProps {
    onSearch: (searchTerm: string) => void;
    initialMovies: Movie[];
}

