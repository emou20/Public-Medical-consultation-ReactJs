import React, { Component } from 'react';
import HoraireCalender from "./HoraireCalender";
import HoraireCalenderReserver from "./HoraireCalenderReserver";
import axios from "axios";
import {connect} from "react-redux";
import {NotificationContainer, NotificationManager} from 'react-notifications';


class CalendrierReservation extends Component {
    constructor(props) {
        super(props);
        this.state ={
        dateCalendrier : [],
        heuredisponibleBrute:[],
        heureReserver:[],
        idmedecinState:0,
    }
}


componentDidMount(){

        const idMedecin = this.props.idMedecin
        axios.post(`http://localhost/apiSante/heureDisponibleMedecin.php`, {idMedecin})
        .then(res => {
          const heuredisponibleBrute = res.data[0].heure_disponible;
          this.setState({ heuredisponibleBrute });

            const tableReservation = [];

            for (let i=1; i<=6; i++){
                let today = new Date();
                let t = today.setDate(today.getDate() + i);
                let d = new Date(t);
                let date=d.getDate() + "-"+ parseInt(d.getMonth()+1) +"-"+d.getFullYear();

                tableReservation.push({date, heuredisponibleBrute}); 
            }

            this.setState({
                dateCalendrier:tableReservation
            })
        })


        axios.post(`http://localhost/apiSante/heureReserverMedecin.php`, {idMedecin})
        .then(res => {
          const heureReserver = res.data;
          this.setState({ heureReserver });
        })

        

    }
    RheureReserve(heure, date, idProfil, idMedecin){
        axios({
            method: 'POST',
            url: 'http://localhost/apiSante/ajoutReservation.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                idProfil:idProfil, 
                idMedecin:idMedecin, 
                heure:heure,
                date:date
            }
        }).then(res => {
            if (res.data === "OK") {
                NotificationManager.success("Reservation envoyé avec succée, merci d'attendre la validation par le medecin","",5000);
            }else{
                NotificationManager.warning("Problème d'envoie de reservation , essayer encore une fois","",3000);
            }

        })
    }

    render() {
        console.log(this.props.idProfil)
        console.log(this.props.idMedecin)
        return (
            <div className="container mainGlobale">
                <NotificationContainer/>
                {this.state.dateCalendrier.map((el, index) =>
                    <div className="ligneCalender" key={index}>
                        <div className="joursDate">{el.date} </div>
                        {this.state.heureReserver === "Aucune reservation" ?

                        (
                            <HoraireCalender heure={el.heuredisponibleBrute} date={el.date} heureReserve={this.RheureReserve}/>  
                        )
                        :
                        (
                            <HoraireCalenderReserver heure={el.heuredisponibleBrute} heureReserverProps={this.state.heureReserver} date={el.date} heureReserve={this.RheureReserve}/>
                        )
                        
                        }
                       
                        
                    </div>
                )}
    
                

            </div>
        )
    }
}



function mapStateToProps(state){
    return {
        idMedecin : state.idMedecin,
        idProfil : state.idProfil,
    }
}



const mapDispatchToProps = dispatch => {
    return {
        heureReserver: (heureReserver) => {
            dispatch({ type: "HEURE_RESERVER", heureReserver: heureReserver, })

        },
        heuredisponibleBrute: (heuredisponibleBrute) => {
            dispatch({ type: "HEURE_DISPONIBLE", heuredisponibleBrute: heuredisponibleBrute, })

        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CalendrierReservation);