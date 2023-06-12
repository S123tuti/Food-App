import "./style.css"
import { useState } from "react";

const Search = () =>{

    const [inputValue, setInputValue] = useState('')

    const handleInputValue = (event) =>{
const {value} = event.target
// set updated state
setInputValue(value)
    }
    // console.log(inputValue);
    
    return(
        <form className="Search">
       <input name="search" onChange={handleInputValue} value={inputValue} placeholder="Search Recipes" id="search"/>
       <button type="submit">Search</button>
        </form>
    )
}

export default Search