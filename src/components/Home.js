import React, { Component } from 'react';
import RechercheHome from "./RechercheHome";
import TopCategHome from "./TopCategHome";
import Header from './Header';

export default class Home extends Component {
    render() {
        return (
            <div className="container-home">
                <Header />
               <div className="container conthomeD"> 
                    <div className="GrapheHome"></div>
                    <div className="titreSloganHome">Consulter vos medecins en ligne !</div>
                    <RechercheHome />
                    <TopCategHome />
                
               </div>
               
            </div>
        )
    }
}
