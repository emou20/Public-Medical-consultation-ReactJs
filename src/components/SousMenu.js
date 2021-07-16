import React from 'react';


export default function SousMenu(specialite) {   
    const ssmenu = specialite.specialite;
    return (
        <div>
            
            <ul>
             {ssmenu.map((el, index) =>

                <li key={index}><a href={"/liste-medecins/"+el.id_specialite }>{el.nom_specialite}</a>
                </li>   

                )}
            </ul>
        </div>
    )
}
