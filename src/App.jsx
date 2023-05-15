import Layout from './Components/Layout/Layout'
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './screens/Home/Home'
import Meals from './screens/Meals/Meals'
import { RoutesData } from './utils/RoutesData'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {RoutesData.map(item => (
          <Route key={item.path} path={item.path} element={<item.element />} />
        ))}
      </Route>
    </Routes>
  )
}

export default App

