import React from 'react'
import './infoCategory.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Heading from '../../Components/Heading/Heading'
import { fetchingErrorInfo, fetchingInfoTime, fethcedInfo } from '../../store/reducer/infoOfCategory'
import { Spin } from 'antd'
const InfoCategory = () => {
	const { info, loadingInfo } = useSelector(store => store.info)
	const dispatch = useDispatch()
	const params = useParams()
	const navigate = useNavigate()
	useEffect(() => {
		dispatch(fetchingInfoTime())
		axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.idMeal}`)
			.then(res => {
				console.log(res.data.meals)
				dispatch(fethcedInfo(res.data.meals[0]))
			})
			.catch(err => {
				dispatch(fetchingErrorInfo())
			})
	}, [])

	const { strArea, strCategory, strMeal, strYoutube, strTags, strMealThumb, strInstructions } = info
	return (
		<>
			<div className='w-[80%] mx-auto'>
				<Spin spinning={loadingInfo}>
					<div className=''>
						<h1>{strMeal}</h1>
						<div>
							<p>{strCategory}</p>
							<p>{strArea}</p>
							{strTags && <p>{strTags}</p>}
							<p onClick={() => navigate(-1)}>Back</p>
						</div>
					</div>
					<div className='youtube'>
						<iframe width="900" height="506" src={`https://www.youtube.com/embed/${strYoutube && strYoutube.slice(-11)}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
					</div>
					<div className='flex gap-4'>
						<img className='w-[20rem] rounded-md' src={strMealThumb} />
						<p>{strInstructions}</p>
					</div>
				</Spin>
			</div>
		</>
	)
}

export default InfoCategory