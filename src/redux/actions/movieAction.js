import api from "../api"


const API_KEY = process.env.REACT_APP_API_KEY
function getMovies(fuck){
    return async (dispatch) =>{
        try{console.log("디스패치가 뭔데 씹덕아", dispatch , "뻑", fuck)
               //데이터 도착 전
            dispatch({type:"GET_MOVIES_REQUEST"})
            const popularApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)

            const topRateApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
            
            const upComingApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)

            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)

            
        let [popularMovies ,topRateMovies,upComingMovies, genreList ] = await Promise.all([popularApi,topRateApi,upComingApi, genreApi ])
       // 데이터 도착
       
        dispatch({
            type: "GET_MOVIES_SUCCESS", payload: {popularMovies:popularMovies.data, topRateMovies:topRateMovies.data, upComingMovies:upComingMovies.data
            , genreList: genreList.data
      
            }
        })
        }catch(error){
            //에러 핸들링 하는 곳
            console.log("에러",error)
            dispatch({type:"GET_MOVIES_FAILURE"})
        }
        
    }  
}

function getMoviesById(id){
    return async (dispatch) =>{
        try{
               //데이터 도착 전
            dispatch({type:"GET_MOVIES_REQUEST"})
            const MovieByIdApi = api.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`)

            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)

            let [MoviesById, genreList ] = await Promise.all([MovieByIdApi, genreApi ])
        // 데이터 도착
       
        dispatch({
            type: "GET_MOVIES_SUCCESS", payload: {MoviesById: MoviesById.data
            , genreList: genreList.data
            }
        })
        }catch(error){
            //에러 핸들링 하는 곳
            console.log("에러",error)
            dispatch({type:"GET_MOVIES_FAILURE"})
        }
           
    }  
}

export const MovieAction = {getMovies, getMoviesById}