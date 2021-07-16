import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import axios from 'axios';
import {connect} from "react-redux";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Redirect } from "react-router-dom";

class RechercheHome extends Component {
    constructor(props){
        super(props);
        this.state = {
          specialite: [],
          choixSpec:"",
          nomDoc:"",
          redirection:false,
        }
      }

      componentDidMount() {
        axios.get(`http://localhost/apiSante/specialites.php`)
          .then(res => {
            const specialites = res.data;

            const tabSpecial = [];
            for (let i=0; i < specialites.length; i++){
                tabSpecial.push(specialites[i].nom_specialite);
            }
            this.setState({
                specialite:tabSpecial
            })
            
          })
          
      }
      handleChangeSelect = (event, value) => {
        this.setState({
            choixSpec: value
        });

    };
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    };
    sendSearch(){
        axios({
            method: 'POST',
            url: 'http://localhost/apiSante/searchMedecins.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: this.state
        })
            .then((response) => {
                if(response.data === "Aucun medecins"){
                    NotificationManager.warning("Aucun medecins !");
                }else{
                    if(response.data === "vide"){
                        NotificationManager.warning("Votre recherche est vide !");
                    }else{
                        this.props.resultatRecherche(response.data);
                        this.setState({
                            redirection:true
                        })
                    }
                    
                }
                

            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
        if (this.state.redirection) {
            return <Redirect to="/recherche" />
        }
        return (
            <div className="contRechercheHome">
                <NotificationContainer />
                <div className="categSearch">
                    <Autocomplete
                    id="combo-box-demo"
                    options={this.state.specialite}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Spécialité" variant="outlined" />}
                    onChange={this.handleChangeSelect} 
                    name="choixSpec"
                    />
                </div>
                <div className="nameSearch">
                    <TextField id="outlined-search" label="Nom du médecin" type="search" variant="outlined" onChange={this.handleChange} 
                    name="nomDoc" value={this.state.nomDoc} />
                </div>
                <div className="bttSearch">
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => this.sendSearch()}>
                        <SearchRoundedIcon />
                    </IconButton>
                </div>
                
               
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        resultatRecherche: (resultatRecherche) => {
            dispatch({ type: "RESULTAT_RECHERCHE", resultatRecherche: resultatRecherche, })

        }
    };
};


export default connect("", mapDispatchToProps)(RechercheHome);