import React, { Component } from 'react';
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import CalendrierReservation from "./CalendrierReservation";
import {connect} from "react-redux";
import Header from './Header';

class DetailsMedecin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        id_medecin:"",
        nom:"",
        prenom:"",
        mail:"",
        tel:"",
        adresse:"",
        specialite:"",
        nbr_consultation:"",
        photo:"",
        heuredisponibleBrute:[],
        heureReserver:[]

    }
}

    componentDidMount() {
        const idMedecin= this.props.match.params.idMedecin;
        
        axios.post(`http://localhost/apiSante/detailMedecin.php`, {idMedecin})
        .then(res => {
          const id_medecin = res.data[0].id_medecin;
          const nom = res.data[0].nom;
          const prenom = res.data[0].prenom;
          const mail = res.data[0].mail;
          const tel = res.data[0].tel;
          const adresse = res.data[0].adresse;
          const specialite = res.data[0].specialite;
          const nbr_consultation = res.data[0].nbr_consultation;
          const photo = res.data[0].photo;

         

          this.setState({ id_medecin,nom,prenom,mail,tel,adresse,specialite,nbr_consultation,photo });
        })



        

       


    }

    render() {
        const { nom, prenom, mail,adresse,nbr_consultation,tel,photo} =   this.state;
        this.props.idMedecin(this.props.match.params.idMedecin);
        return (
            <div>
                <Header />
                <div className="container mainGlobale">
                 <Grid container spacing={3}>

                 <Grid item xs={12}>
                    <Card className="">
                            <CardContent>
                               <div className="contBoxMedecinListe container-fluid">
                                   <div className="contPhotoMedecin">
                                      {photo === "" ? (
                                        <img src="/docH.png" alt="" />
                                      ):(
                                        <img src={photo} alt="" />
                                      )}
                                    
                                   </div>
                                   <div className="resteBoxMedecin">
                                       <div className="nomDoc">DR. {nom}</div>
                                       <div className="prenomDoc">{prenom}</div>
                                       <div className="mailDoc"><AlternateEmailIcon /> {mail}</div>
                                       <div className="mailDoc"><PhoneAndroidIcon /> {tel}</div>
                                       <div className="mailDoc"><PersonPinCircleIcon /> {adresse}</div>
                                       <div className="mailDoc"><AddToQueueIcon /> {nbr_consultation} consultation en ligne</div>
                                       
                                   </div>
                               </div>
                               
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card className="">
                            <CardContent>
                                <h3>Le calendrier de reservation</h3>
                               
                                <CalendrierReservation heuredisponibleBrute={this.state.heuredisponibleBrute} heureReserver={this.state.heureReserver}/>
                            </CardContent>
                        </Card>
                    </Grid>
                 </Grid>
            </div>
            </div>
            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        idMedecin: (idMedecin) => {
            dispatch({ type: "ID_MEDECIN", idMedecin: idMedecin, })

        }
    };
};


export default connect("", mapDispatchToProps)(DetailsMedecin);