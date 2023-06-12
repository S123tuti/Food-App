import Search from "../../components/search"


const Homepage = () =>{
    const getDataFromSearchComponent=(getData)=>{
// console.log(getData, "I want Recipes data");

// calling tha API
async function getRecipes(){

    const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=0b486e71c68f4b9c9a0e5430c2d4b447&query=${getData}`)
 const result = await apiResponse.json()
 console.log(result);
}
getRecipes()
    }
    return(
        <div className="Homepage">
         <Search getDataFromSearchComponent = {getDataFromSearchComponent}/>
        </div>
    )
}

export default Homepage