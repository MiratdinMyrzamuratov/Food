import { message } from 'antd'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Heading from '../../Components/Heading/Heading'
import { removeFromCart } from '../../store/reducer/cartSlice'
import cartSound from '../../assets/sound/soundSms.mp3'

const Cart = () => {
    const { cartMeals } = useSelector(store => store.cart)
    const dispatch = useDispatch()
	const cartMusicPlayer = useRef(null)
    
    function removeMealFromCart(id) {
        dispatch(removeFromCart(id))
        cartMusicPlayer.current.play()
		setTimeout(() => {
			cartMusicPlayer.current.pause()
		}, 2000)
        message.info('Meal removed from basket!')
    }
  return (
    <div className='width-[80%] mx-auto my-12'>
        <Heading>
            Your favorite <span className='text-orange-500'>meals</span>
        </Heading>

        <audio src={cartSound} className='hidden' ref={cartMusicPlayer}></audio>

        {cartMeals.length === 0 && (
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" className='w-[50%] mx-auto' />
        )}

        {/* cart meals */}
        <div className='row'>
            {cartMeals.map(item => (
                <div className='item relative' key={item.idMeal}>
                    <img src={item.strMealThumb} className='rounded-md' />
                    <h1 className='text-center w-full truncate'>{item.strMeal}</h1>

                    <button onClick={() => removeMealFromCart(item.idMeal)} className='absolute p-4 bg-orange-500 text-white text-3xl top-6 right-6 rounded-md shadow-md hover:bg-orange-600 active:opacity-70 transform active:scale-95'><i className='bx bx-trash'></i></button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Cart