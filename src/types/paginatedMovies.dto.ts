import { Movie } from "../types/movieFull.dto";

export interface PaginatedMovies {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}