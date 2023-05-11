'use client';
import React, {useEffect, useState} from 'react';

function Page() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('https://api.themoviedb.org/3/movie/550?api_key=1f54bd990f1cdfb230adb312546d765d')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data)
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No profile data</p>;


    return (
        <div>
            <h1>{data.title}</h1>
        </div>
    );
}

export default Page;