import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";

const Movie = () => {
    const [Content, SetContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);
    const fetchTrending = async () => {

        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
        
        SetContent(data.results);
        setNumOfPages(data.total_pages);

    };
    useEffect(() => {
        fetchTrending()
        // eslint-disable-next-line 
    }, [page,genreforURL])
    return (
        <div>
            <span className='pageTitle'>Your Discovered Movies 😃</span>
            <Genres
                type="movie"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className='trending'>
                {Content && Content.map((c) =>
                    <SingleContent
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type='movie'
                        vote_average={c.vote_average}
                    />
                )}
            </div>
            {numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}

        </div>
    )
}

export default Movie
