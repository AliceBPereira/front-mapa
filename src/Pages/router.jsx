import { BrowserRouter, Routes , Route} from "react-router-dom"
import CafePage from "./cafe/cafePage"
import HomePage from "./home/homePage"


function Router(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/Cafepage' element={<CafePage/>}/>
            <Route path='/home' element={<HomePage/>}/>

        
        </Routes>
         
        </BrowserRouter>
        
    )
}

export default Router