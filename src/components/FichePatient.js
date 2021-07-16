import React, { useState, useEffect } from 'react';
import axios from "axios";



    export default function FichePatient(props) {
        const [patient, setPatient] = useState([]);
        const [aucun, setAucun] = useState(false);
        useEffect(() => {
            const id = props.idPatient
            axios.post(`http://localhost/apiSante/detailProfil.php`, { id })
            .then(res => {
                res.data === "Aucun" ? setAucun(true) : setPatient(res.data);

            })
          },[props.idPatient]);
         
        return (
            <div>
                
                {aucun ? (
                    <div>Aucun Patient !</div>
                ) : (
                    
                    <div className="container">
                        {patient.length>0 ? (
                            <div>
                                <div className="ligneDetailPopup"><span>Nom :</span> {patient[0].nom}</div>
                                <div className="ligneDetailPopup"><span>Prénom :</span> {patient[0].prenom}</div>
                                <div className="ligneDetailPopup"><span>Tél :</span> {patient[0].tel}</div>
                                <div className="ligneDetailPopup"><span>Date de naissance :</span> {patient[0].date_naissance}</div>
                                <div className="ligneDetailPopup"><span>Profession :</span> {patient[0].profession}</div>
                                <div className="ligneDetailPopup"><span>Adresse :</span> {patient[0].adresse}</div>
                                <div className="ligneDetailPopup"><span>Code postale :</span> {patient[0].code_postale}</div>
                                <div className="ligneDetailPopup"><span>Antécédent chirurgicale :</span> {patient[0].ant_chir}</div>
                                <div className="ligneDetailPopup"><span>Antécédent médicale :</span> {patient[0].ant_med}</div>
                                <div className="ligneDetailPopup"><span>Médicament alergique :</span> {patient[0].medicament_alerg}</div>
                            </div>
                    ) : (
                            <div>Acune détails !</div>
                            )}
                        
                    
                    </div>
                   
                )}

            </div>
            

            
        )
    }
    