import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { store } from '../../store/store'
import './Home.scss'
import { fetchingCategories, fetchingErrorCategories, fetchedCategories } from '../../store/reducer/categoryslice'
import axios from 'axios'
import { Spin } from 'antd'
import Heading from '../../Components/Heading/Heading'
import { Link } from 'react-router-dom'
const Home = () => {
	const {loadingCategories, categories} = useSelector(store => store.category)
	const dispatch = useDispatch()


	useEffect(() => {
		dispatch(fetchingCategories())
		axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
		.then(res => {
			dispatch(fetchedCategories(res.data.categories))
		})
		.catch(err => {
			dispatch(fetchingErrorCategories())
		})
	}, [])
	console.log(categories)
	return (
		<div className='container mx-auto py-12'>

		<Heading>All categories</Heading>

			<Spin spinning={loadingCategories}>
				<div>
					<h1 className='flex justify-center items-center mb-9 text-black'>Foods</h1>
				</div>
			<div className='row'>
				{
							categories?.map((item) => (
					<Link key={item.strCategory} to={`/category/${item.strCategory}`}>
							<div className='item'>
							<span>{item.strCategory}</span>
							<img src={item.strCategoryThumb}/>
							<h1 className='text-black text-2xl uppercase'>{item.strCategory}</h1>
							<h2 className='text-2xl text-slate-500'>Desription</h2>
							<span className='text-slate-400'>{item.strCategoryDescription}</span>
						</div>
						</Link>
					))}
			</div>
		</Spin>
		</div>
	)
}

export default Home
