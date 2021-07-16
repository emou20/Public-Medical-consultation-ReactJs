import React from 'react';
import {Switch, Route } from 'react-router-dom';


import Home from "./Home";
import ListeMedecins from "./ListeMedecins";
import Login from './Login';
import Inscription from './Inscription';

import NotFoundPage from './NotFoundPage';
import DetailsMedecin from './DetailsMedecin';
import Profil from './Profil';
import ResultatRecherche from './ResultatRecherche';
import HomeM from './HomeM';
import Consultation from './Consultation';

const Router = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/homem" component={HomeM} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/inscription" component={Inscription} />
        <Route  path="/liste-medecins/:categorie" component={ListeMedecins} />
        <Route  path="/details-medecin/:idMedecin" component={DetailsMedecin} />
        <Route  exact path="/profil" component={Profil} />
        <Route  path="/profil/:msg" component={Profil} />
        <Route  exact path="/recherche" component={ResultatRecherche} />
        <Route  path="/consultation/:idPatient" component={Consultation} />
        <Route component={NotFoundPage} />

    </Switch>
)

export default Router;