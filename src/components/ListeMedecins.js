import React, { Component } from 'react';
import Pagination from './Pagination';
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import Header from './Header';

export default class ListeMedecins extends Component {
    constructor(props){
        super(props);
        this.state = {
            medecins:[],
            pageOfItems: [],
            categorieCourante:[]
        }
    }
    


    componentDidMount() {
        const categ= this.props.match.params.categorie;


        axios.post(`http://localhost/apiSante/listeMedecinsParCateg.php`, {categ})
        .then(res => {
          const medecins = res.data;
          this.setState({ medecins });
        })


        axios.get(`http://localhost/apiSante/specialites.php`)
          .then(res => {
            const categMedecin = res.data.filter(el => categ === el.id_specialite)
            
            const tabSpecial = [];
            for (let i=0; i < categMedecin.length; i++){
                tabSpecial.push(categMedecin[i].nom_specialite);
            }
            this.setState({
                categorieCourante:tabSpecial
            })
            
          })
    }

    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    render() {
        return (
            <div>
                <Header />
                <div className="container mainGlobale">
                {this.state.categorieCourante.map((el) =>
                    
                    <h3>{el}</h3>
                    
                    )}
                <Grid container spacing={3}>
                    
                {this.state.pageOfItems.map(el => (
                    <Grid item xs={6} key={el.id_medecin}>
                    <Card className="">
                            <CardContent>
                               <div className="contBoxMedecinListe container-fluid">
                                   <div className="contPhotoMedecin">
                                      {el.photo === "" ? (
                                        <img src="/docH.png" alt="" />
                                      ):(
                                        <img src={el.photo} alt="" />
                                      )}
                                    
                                   </div>
                                   <div className="resteBoxMedecin">
                                       <div className="nomDoc">DR. {el.nom}</div>
                                       <div className="prenomDoc">{el.prenom}</div>
                                       <div className="mailDoc"><AlternateEmailIcon /> {el.mail}</div>
                                       <div className="mailDoc"><PhoneAndroidIcon /> {el.tel}</div>
                                       <div className="mailDoc"><PersonPinCircleIcon /> {el.adresse}</div>
                                       <div className="mailDoc"><AddToQueueIcon /> {el.nbr_consultation} consultation en ligne</div>
                                       <a href={"/details-medecin/" + el.id_medecin } className="bttDemandeConsultation">Demande de consultation en ligne</a>
                                   </div>
                               </div>
                               
                            </CardContent>
                            <CardActions>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                    
                </Grid>

                <Pagination items={this.state.medecins} onChangePage={this.onChangePage} />
            </div>
            </div>
            
        )
    }
}
