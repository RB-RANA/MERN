import axios from "axios";
import { createContext,useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/ProductReducer";

const AppContext = createContext();



const API = "https://products.up.railway.app/api/product";

const initiaState = {
isLoading: false,
isError: false,
product: [],
featureProduct: [],
}


const AppProvider = ({children}) =>{

    const [state,dispatch] = useReducer(reducer,initiaState);

    const getProducts = async (url)=>{
        dispatch({type:'SET_LOADING'});
       try {
         const res = await axios.get(url);
         const products = await res.data.mydata;
         
// her some problem data or mydata

         dispatch({type:'SET_API_DATA', payload: products});
       } catch (error) {
        dispatch({type:'API_ERROR'});
       }
    }

    useEffect(()=>{

    getProducts(API);

    },[])

return <AppContext.Provider value={{...state}}>{children}</AppContext.Provider>

};

const useProductContext = () =>{

    return useContext(AppContext)
}

export { AppProvider,AppContext,useProductContext };