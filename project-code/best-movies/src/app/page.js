'use client';
import React, {useEffect, useState} from "react";
import styles from './page.module.css'

export default function Home() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('https://api.themoviedb.org/3/movie/550?api_key=1f54bd990f1cdfb230adb312546d765d')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
                console.log(data)
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No profile data</p>;

  return (
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
      }}>
          <h1>Title: {data.title}</h1>
          <h1>ID: {data.id}</h1>
          <h1>Status: {data.status}</h1>
          <h1>Tagline: {data.tagline}</h1>
      </div>
  )
}
