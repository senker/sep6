import {atom} from "recoil";
import {Movie} from "@/types/movieFull.dto";

export const modalState = atom({
    key: "modalState",
    default: false,
});

export const movieState = atom<Movie | any | null>({
    key: "movieState",
    default: null,
});
