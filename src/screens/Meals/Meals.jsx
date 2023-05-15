import React, { useRef } from 'react'
import './Meals.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchedMeals, fetchingErrorMeals, fetchingMeals } from '../../store/reducer/mealsSlice'
import axios from 'axios'
import Heading from '../../Components/Heading/Heading'
import { Link } from 'react-router-dom'
import { addToCart } from '../../store/reducer/cartSlice'
import { message } from 'antd'
import cartSound from '../../assets/sound/soundSms.mp3'


const Meals = () => {
	const { meals, loadingMeals } = useSelector(store => store.meals)
	const { cartMeals } = useSelector(store => store.cart)
	const dispatch = useDispatch()
	const params = useParams()
	const cartMusicPlayer = useRef(null)

	useEffect(() => {
		dispatch(fetchingMeals())
		axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${params.categoryName}`)
			.then(res => {
				dispatch(fetchedMeals(res.data.meals))
			})
			.catch(err => {
				dispatch(fetchingErrorMeals())
			})
	}, [])
	console.log(params.categoryName)

	function addingMealToBasket(meal) {
		dispatch(addToCart(meal))

		cartMusicPlayer.current.currentTime = 0
		cartMusicPlayer.current.play()
		setTimeout(() => {
			cartMusicPlayer.current.pause()
		}, 2000)
		message.success('Product added to cart!')
	}
	console.log(cartMeals)

	return (
		<div>
			<Heading>Meals of category <b className='text-orange-500'>{params.categoryName}</b></Heading>

			<audio src={cartSound} className='hidden' ref={cartMusicPlayer}></audio>

			{/* our Meals */}
			<div className='row'>
				{meals.map(item => (
					<div className='item relative' key={item.strMeal}>
						<Link to={`/meal/${item.idMeal}`} key={item.idMeal}>
							<img className='rounded-md' src={item.strMealThumb} />
						</Link>
						<h1 className='text-center w-full truncate'>{item.strMeal}</h1>
						<button onClick={() => addingMealToBasket(item)} className='absolute p-4 bg-orange-500 text-white text-3xl 	top-6 right-6 rounded-md shadow-md hover:bg-orange-600 	active:opacity-75 transform active:scale-95' disabled={cartMeals.find(x => x.idMeal === item.idMeal)}>
							{
								cartMeals.findIndex(x => x.idMeal === item.idMeal) === -1 ? (
									<i className='bx bx-cart'></i>
								) : (
									<i className='bx bx-check'></i>
								)
							}
						</button>
					</div>
				))}
			</div>
			{/* Category Btn */}
			<Link to={'/cart'} className='min-w-[70px] h-[70px] rounded-md shadow-md bg-orange-500 flex items-center justify-center fixed bottom-[100px] right-[5%] text-4xl text-white px-1'>
				<i className='bx bx-cart'>

					({cartMeals.length})
				</i>
			</Link>
		</div>
	)
}

export default Meals


//https://themealdb.com/api/json/v1/1/filter.php?c=Seafood
