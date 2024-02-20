import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"
import { FavouritesPage } from "./pages/FavouritesPage"
import { HomePage } from "./pages/HomePage"


function App() {

  return (
    <Routes>
        <Route path='/' element = {<Layout/>}>
          <Route index element = {<HomePage/>}/>
          <Route path='/favourites' element = {<FavouritesPage/>}/>
        </Route>        
    </Routes>
  )
}

export default App
