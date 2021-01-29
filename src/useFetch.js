import { useState, useEffect } from "react";

//Part 5e Data Fetching with a Fetch
//Three possible states:
//If the data isn't available but is loading...
//If we get the data...
//If there's an error...

export function useFetch(uri) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        if (!uri) return;
        fetch(uri)
            .then(data => data.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError)
    }, [uri])

    return { loading, data, error };
}