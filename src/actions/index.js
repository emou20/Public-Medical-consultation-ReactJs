
import { ID_MEDECIN } from "../actions/action-types";
import { ID_PROFIL } from "../actions/action-types";
import { HEURE_RESERVER } from "../actions/action-types";
import { HEURE_DISPONIBLE } from "../actions/action-types";
import { RESULTAT_RECHERCHE } from "../actions/action-types";
import { NBR_MSGNONLU } from "../actions/action-types";

  export function idMedecin(idMedecin) {
    return { type: ID_MEDECIN, idMedecin }
  };
  export function idProfil(idProfil) {
    return { type: ID_PROFIL, idProfil }
  };
  export function heureReserver(heureReserver) {
    return { type: HEURE_RESERVER, heureReserver }
  };

  export function heuredisponibleBrute(heuredisponibleBrute) {
    return { type: HEURE_DISPONIBLE, heuredisponibleBrute }
  };  
  
  export function resultatRecherche(resultatRecherche) {
    return { type: RESULTAT_RECHERCHE, resultatRecherche }
  };  
  
  export function nbrMsgNonLu(nbrMsgNonLu) {
    return { type: NBR_MSGNONLU, nbrMsgNonLu }
  };  
  export function role(role) {
    return { type: ROLE, role }
  };