import { RESULTAT_RECHERCHE } from "../actions/action-types";
import { ID_MEDECIN } from "../actions/action-types";
import { ID_PROFIL } from "../actions/action-types";
import { NBR_MSGNONLU } from "../actions/action-types";
import { ROLE } from "../actions/action-types";

function rootReducer(state, action) {
  
  if (action.type === ID_MEDECIN) {
    state.idMedecin=action.idMedecin;
    return {...state}; 

  }
  if (action.type === ID_PROFIL) {
    state.idProfil=action.idProfil;
    return {...state}; 

  }
  if (action.type === RESULTAT_RECHERCHE) {
    state.resultatRecherche=action.resultatRecherche;
    return {...state}; 

  }

  if (action.type === NBR_MSGNONLU) {
    state.nbrMsgNonLu=action.nbrMsgNonLu;
    return {...state}; 

  }

   if (action.type === ROLE) {
    state.role=action.role;
    return {...state}; 

  }

  return state;
}

export default rootReducer;