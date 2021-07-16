import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {connect} from "react-redux";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';

class AjoutOrdonnance extends Component {
    constructor(props){
        super(props);
        this.state = {
            idPatient:props.idPatient,
            ordonnance:"",
            date:"",
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    };
    sendOrdo(){
        axios({
            method: 'POST',
            url: 'http://localhost/apiSante/ajoutOrdonnance.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                idPatient:this.state.idPatient, 
                idMedecin:this.props.idMedecin, 
                date:this.state.date,
                ordonnance:this.state.ordonnance
            }
        }).then(res => {
                if (res.data === "OK") {
                    NotificationManager.success("Ordonnance envoyé avec succée","",2000);
                    setTimeout(() => {
                        this.props.closeModal(false);
                      }, 4000);
                    

                } else {
                    NotificationManager.warning("Problème d'envoie d'ordonnance , essayer encore une fois","",2000);
                    setTimeout(() => {
                        this.props.closeModal(false);
                      }, 4000);
                }
            })
    }

    render() {
        console.log("Ajout patient date : ", this.state.date)
        return (
            <div>

                <NotificationContainer/>
                <h4>Ajout d'ordonnace</h4>
                <div className="ligneInputTxt">
                <TextField
                    id="date"
                    name="date"
                    label="Date ordonnance"
                    type="date"
                    defaultValue="2021-01-01"
                    className=""
                    onChange={this.handleChange}    
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </div>
                <div className="ligneInputTxt">
                    <TextareaAutosize 
                        aria-label="empty textarea" 
                        placeholder="Ordonnance" 
                        value={this.state.ordonnance} 
                        onChange={this.handleChange}
                        className="textAreaOrdo"
                        name="ordonnance" />
                    
                </div>
                <div className="ligneInputTxt">
                    <button color="secondary" onClick={() => this.sendOrdo()}>Envoyer</button>
                </div>
       
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    idMedecin: state.idProfil
    });

export default connect(mapStateToProps)(AjoutOrdonnance);