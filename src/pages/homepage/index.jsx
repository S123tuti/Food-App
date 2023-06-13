import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
  } from "react";
//   import { ThemeContext } from "../../App";
//   import Favorites from "../../components/favorites";
  import RecipeItem from "../../components/recipe-item";
  import Search from "../../components/search";
  import "./style.css";


const Homepage = () =>{

    const [loading, setLoading] = useState(false);

    // save results that we recipe from api

    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    // const [apiCalledSuccess, setApiCallSuccess] = useState(false);
    // const [state, dispatch] = useReducer(reducer, initialState);
    // const { theme } = useContext(ThemeContext);
  
    const getDataFromSearchComponent=(getData)=>{

//  keep the loading state true before we are calling the api 
setLoading(true)
// console.log(getData, "I want Recipes data");

// calling tha API
async function getRecipes(){

    const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=0b486e71c68f4b9c9a0e5430c2d4b447&query=${getData}`)
 const result = await apiResponse.json()
//  console.log(result);
const {results} = result

if(results && results.length>0){
    setLoading(false)
    setRecipes(results)
}
}
getRecipes()
    };
    // console.log(loading, recipes);

    const addToFavorites = (getCurrentRecipeItem) =>{
    //  console.log(getCurrentRecipeId);
    let copyFavorites = [...favorites]
    const index = copyFavorites.findIndex(
        (item) => item.id === getCurrentRecipeItem.id)
        // console.log(index);
        if (index === -1) {
            copyFavorites.push(getCurrentRecipeItem);
            setFavorites(copyFavorites)
            localStorage.setItem("favorites", JSON.stringify(copyFavorites));
            setFavorites(copyFavorites);
            window.scrollTo({ top: 0, behavior: "smooth" });
    }else{
        alert("item is already present in favorites");
    }
}

useEffect(() => {
    const getFavoritesFromLocalStorage = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(getFavoritesFromLocalStorage);
  }, []);
    return(
        <div className="Homepage">
         <Search getDataFromSearchComponent = {getDataFromSearchComponent}
         />
        <div className="favorites-wrapper">
          <h1 className="favorites-title" style={theme ? { color: "#12343b" } : {}}>Favorites</h1>
          <div className="search-favorites">
            <input
              name="filterfavorites"
              placeholder="Filter favorites"
              value={state.filteredFavorites}
              onChange={(e) =>
                dispatch({ type: "filterfavorites", value: e.target.value })
              }
            />
          </div>
          <div className="favorites">
            {filteredFavorites && filteredFavorites.length > 0
              ? filteredFavorites.map((item) => (
                  <favorites
                    removeFromFavorites={() => removeFromFavorites(item.id)}
                    image={item.image}
                    id={item.id}
                    title={item.title}
                  />
                ))
              : null}
          </div>
          {
             !filteredFavorites.length && <div className="loading">No Favorites added</div>
          }
        </div>


         {
         loading && <div className="loading">Loading Recipes....please wait..!!</div>
         }

         <div className="items">
         {recipes && recipes.length > 0 
          ? recipes.map((item)=><RecipeItem 
          addToFavorites={ () => addToFavorites(item)} 
          id={item.id} 
          image={item.image} 
          title={item.title}/>)
          : null}
         </div>
        </div>
    )
}

export default Homepage