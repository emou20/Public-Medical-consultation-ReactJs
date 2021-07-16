import { createStore } from "redux";
import rootReducer from "../reducers";


function loadState(){
  try{
    const state = localStorage.getItem('medical');
    

    if(state !== null){
        return JSON.parse(state);
        
    }        
} catch(e){
    // ignore errors
}

  return {
    idMedecin:"",
    idProfil:"",
    role:"",
    resultatRecherche:[],
    nbrMsgNonLu:"",

  };
}


function saveState(state){
  localStorage.setItem('medical', JSON.stringify(state));
}

//initialisation sans LocalStore
/* const initialState = {
    Panier: [],
    isopen: false
  }; */

const store = createStore(rootReducer, loadState() , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


store.subscribe(() => {
  saveState(store.getState());
});


export default store;