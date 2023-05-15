import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import Heading from '../../Components/Heading/Heading'
import { fetchedArea, fetchingErrorArea, fetchingArea } from '../../store/reducer/areaSlice'
import {Spin} from 'antd'
import cartSound from '../../assets/sound/soundSms.mp3'
const filterArea = () => {
	const {area, loadingArea} = useSelector(store => store.area)
	const dispatch = useDispatch()
	const params = useParams()
	const cartMusicPlayer = useRef(null)

	useEffect(() => {
		dispatch(fetchingArea())
		axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${params.area}`)
		.then(res => {
			dispatch(fetchedArea(res.data.meals))
		})
		.catch(err => {
			dispatch(fetchingErrorArea())
		})
	}, [params])

    function addingMealToBasket(meal) {
		dispatch(addToCart(meal))

		cartMusicPlayer.current.currentTime = 0
		cartMusicPlayer.current.play()
		setTimeout(() => {
			cartMusicPlayer.current.pause()
		}, 2000)
		message.success('Product added to cart!')
	}

	return (
		<>		
		<div className='container mx-auto'>
                <Heading>
                    <h1 className='text-4xl'><span className='text-orange-500'>{params.area}</span> Meals</h1>
                </Heading>

            <Spin spinning={loadingArea}>
                <div className='row py-12'>
                    {
                        area.map(item => (
                            <Link to={`/meal/${item.idMeal}`} key={item.idMeal}>
                                <div className='item relative'>
                                    <img src={item.strMealThumb}/>
                                    <h1 className='w-full truncate'>{item.strMeal}</h1>
                                    <button className='absolute p-4 bg-orange-500 text-white text-3xl top-4 right-4 rounded-md shadow-md transition duration-200 hover:bg-orange-600 active:opacity-75 transform active:scale-95 outline-none'>
                                        <i className='bx bx-cart'></i>
                                    </button>
                                </div>
                            </Link>

                        ))
                    }
                </div>
                <Link to={"/cart"} className="w-[70px] h-[70px] rounded-md shadow-md bg-orange-500 flex items-center justify-center fixed bottom-[100px] right-[5%] px-4 text-4xl text-white">
                    <i class='bx bx-cart'></i>
                    (0)
                </Link>
            </Spin>
        </div>
				</>

	)
}

export default filterArea