import Home from "../screens/Home/Home"
import Meals from "../screens/Meals/Meals"
import NotFound from "../screens/NotFound/NotFound"
import InfoCategory from "../screens/InfoCategory/InfoCategory"
import filterArea from "../screens/filterArea/filterArea"
import Cart from "../screens/Cart/Cart"
export const RoutesData = [
	{path: '/', element: Home},
	{path: '/category/:categoryName', element:Meals},
	{path: "/meal/:idMeal", element: InfoCategory},
	{path: "/filterArea/:area", element: filterArea},
	
	{path: '/cart', element: Cart},
	{path: '*', element: NotFound},
]



