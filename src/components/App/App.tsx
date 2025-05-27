import './App.css'
import SearchBar from "../SearchBar/SearchBar"
import getMovies from "../../services/movieService"
import { useState } from 'react'
import type { Movie } from '../../types/movie'
import toast from "react-hot-toast";
import MovieGrid from '../MovieGrid/MovieGrid'
import MovieModal from '../MovieModal/MovieModal'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isLoading, setIsloading] = useState(false)
  const [isError, setIsError] = useState(false)
 
  const openModal = (movie: Movie) => {
    setIsModalOpen(true)
    setSelectedMovie(movie)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMovie(null)
  }

  const handleSearch = async (topic: string) => {
    try {
      setMovies([])
      setIsloading(true)
      setIsError(false)
      
      const result = await getMovies(topic) as Movie[];
      
      if (result.length === 0) {
        toast.error('No movies found for your request.')
        return
      }
      setMovies(result);

    } catch {
      setIsError(true)
    }
    finally {
      setIsloading(false)
    }
  }
  
  return <>
    <SearchBar onSubmit={handleSearch} />
    {isLoading && <Loader />}
    {isError && <ErrorMessage/>}
    {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
    {isModalOpen && selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
  </>
}

export default App
