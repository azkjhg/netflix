import React from 'react'
import { useParams } from 'react-router-dom'
import {useEffect} from 'react'
import { MovieAction } from '../redux/actions/movieAction'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";
import DetailMovieCard from '../components/DetailMovieCard'



const MovieDetail = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const {MoviesById, detailLoading} = useSelector(state=>state.movieById)

  useEffect ( ()=>{
    dispatch(MovieAction.getMoviesById(id))
},[])



console.log("로딩",detailLoading)
if(detailLoading){
  return (<ClipLoader
  color="black"
  loading={detailLoading}
  size={150}
/>)}
else{
  return (


    <div className='movieDetailMain'>
    <DetailMovieCard  MovieData={MoviesById && MoviesById}/>
    
    </div>
  )
  }


}

export default MovieDetail