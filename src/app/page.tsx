import { Roboto } from "@next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

import {
  getActionMovies,
  getComedyMovies,
  getDocumentaries,
  getHorrorMovies,
  getNetflixOriginals,
  getRomanceMovies,
  getTopRated,
  getTrendingMoviesThisWeek,
} from "@/utils/requests";
import Row from "@/app/components/Row/Row";
import Modal from "@/app/components/Modal/Modal";
import Banner from "../app/components/Banner/Banner";
import styles from "./page.module.scss";

export default async function Home() {
  const [trendingMovies] = await Promise.all([getTrendingMoviesThisWeek()]);
  const [netflixOriginals] = await Promise.all([getNetflixOriginals()]);
  const [topRated] = await Promise.all([getTopRated()]);
  const [actionMovies] = await Promise.all([getActionMovies()]);
  const [comedyMovies] = await Promise.all([getComedyMovies()]);
  const [horrorMovies] = await Promise.all([getHorrorMovies()]);
  const [romanceMovies] = await Promise.all([getRomanceMovies()]);
  const [documentaries] = await Promise.all([getDocumentaries()]);

  return (
    <>
      <main className={styles.main}>
        <Banner netflixOriginals={netflixOriginals.results} />
        <section className={styles.rows}>
          {trendingMovies ? (
            <Row title="Trending Now" movies={trendingMovies.results} />
          ) : (
            "Loading resources"
          )}
          {topRated ? (
            <Row title="Top Rated Movies" movies={topRated.results} />
          ) : (
            "Loading resources"
          )}
          {netflixOriginals ? (
            <Row title="Netflix Originals" movies={netflixOriginals.results} />
          ) : (
            "Loading resources"
          )}
          {actionMovies ? (
            <Row title="Action Movies" movies={actionMovies.results} />
          ) : (
            "Loading resources"
          )}
          {comedyMovies ? (
            <Row title="Comedy Movies" movies={comedyMovies.results} />
          ) : (
            "Loading resources"
          )}
          {horrorMovies ? (
            <Row title="Horror Movies" movies={horrorMovies.results} />
          ) : (
            "Loading resources"
          )}
          {romanceMovies ? (
            <Row title="Romance Movies" movies={romanceMovies.results} />
          ) : (
            "Loading resources"
          )}
          {documentaries ? (
            <Row title="Documentaries" movies={documentaries.results} />
          ) : (
            "Loading resources"
          )}
        </section>
      </main>
      <Modal />
    </>
  );
}
