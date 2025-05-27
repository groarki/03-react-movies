import axios  from "axios";
import type { Movie } from "../types/movie"

interface FetchResponse {
results: Movie[], 
}


export default async function getMovies(topic: string) {
    const res = await axios.get<FetchResponse>(`https://api.themoviedb.org/3/search/movie?query=${topic}`, { 
        method: 'GET',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        }
    })
  
  return res.data.results
}

