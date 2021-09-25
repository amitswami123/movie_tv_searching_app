import "../../App.css"
import axios from "axios";
import './Trending.css'


import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
const Trending = () => {
    const [page, setPage] = useState(1);
    const [Content, setContent] = useState([]);
    const fetchTrending = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );
    
        setContent(data.results);
      };
    useEffect(() => {
        fetchTrending();
        // eslint-disable-next-line
    }, [page])
    
    return (
        <div>
            <span className='pageTitle'>Today's Trendings 🧡</span>
            <div className='trending'>
                {Content && Content.map((c) =>
                    <SingleContent
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type={c.media_type}
                        vote_average={c.vote_average}
                    />
                )}
            </div>
            <CustomPagination setPage={setPage} />
        </div>
    )
}

export default Trending
