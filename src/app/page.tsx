import { getServerSession } from "next-auth";
import MainPage from "./components/Home/MainPage";
import { authOptions } from "./api/auth/[...nextauth]/route";

import {
    getActionMovies,
    getComedyMovies, getDocumentaries, getHorrorMovies,
    getNetflixOriginals, getRomanceMovies,
    getTopRated,
    getTrendingMoviesThisWeek
} from "@/utils/requests";
import Row from "@/app/components/Row/Row";
import Modal from "@/app/components/Modal/Modal";
import Banner from "../app/components/Banner/Banner"
import styles from './page.module.scss'
import {Movie} from "@/utils/typings";

interface MovieList {
    results: Movie[];
}

async function getTestUser() {
  // // TODO - use dynamically fetched email
  // const res = await fetch(
  //   `${process.env.BASE_URL}/api/user?email=dp@email.com`,
  //   {
  //     cache: "no-cache",
  //   }
  // );
  // if (!res.ok) {
  //   // TODO - handle error better
  //   console.log(res);
  // }
  // return res.json();
}

export default async function Home() {
  // const session = await getServerSession(authOptions);
  // const testUser = await getTestUser();
  // console.log(testUser);

    const [trendingMovies]  = await Promise.all([getTrendingMoviesThisWeek()]);
    const [netflixOriginals] = await Promise.all([getNetflixOriginals()]);
    const [topRated] = await Promise.all([getTopRated()]);
    const [actionMovies] = await Promise.all([getActionMovies()]);
    const [comedyMovies] = await Promise.all([getComedyMovies()]);
    const [horrorMovies] = await Promise.all([getHorrorMovies()]);
    const [romanceMovies] = await Promise.all([getRomanceMovies()]);
    const [documentaires] = await Promise.all([getDocumentaries()]);

    // return (
    //     <main>
    //
    //         <div>Hello, {testUser?.name}</div>
    //         <pre>{JSON.stringify(session)}</pre>
    //         <MainPage />
    //     </main>
    // );

  return (
      <>
          <main className={styles.main}>
              <Banner netflixOriginals={netflixOriginals} />
              <section className={styles.rows}>
                  {trendingMovies ? <Row title="Trending Now" movies={trendingMovies}/> : 'Loading resources'}
                  {topRated ? <Row title="Top Rated Movies" movies={topRated}/> : 'Loading resources'}
                  {netflixOriginals ?
                      <Row title="Netflix Originals" movies={netflixOriginals}/> : 'Loading resources'}
                  {actionMovies ?
                      <Row title="Action Movies" movies={actionMovies}/> : 'Loading resources'}
                  {comedyMovies ?
                      <Row title="Comedy Movies" movies={comedyMovies}/> : 'Loading resources'}
                  {horrorMovies ?
                      <Row title="Horror Movies" movies={horrorMovies}/> : 'Loading resources'}
                  {romanceMovies ?
                      <Row title="Romance Movies" movies={romanceMovies}/> : 'Loading resources'}
                  {documentaires ?
                      <Row title="Documentaries" movies={documentaires}/> : 'Loading resources'}
              </section>
          </main>
          <Modal/>
      </>
  );
}
