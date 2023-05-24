import { Cast } from "./cast.dto";
import { Crew } from "./crew.dto";

export interface MovieCredits {
    id: number;
    cast: Cast[];
    crew: Crew[];
  }