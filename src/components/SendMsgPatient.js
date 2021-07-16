import React, { Component } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {connect} from "react-redux";
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';

class SendMsgPatient extends Component {
    constructor(props){
        super(props);
        this.state = {
            idPatient:props.idPatient,
            msg:"",
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    };
    sendMsg(){
        axios({
            method: 'POST',
            url: 'http://localhost/apiSante/envoyerMsg.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                id_destinataire:this.state.idPatient, 
                id_envoyeur:this.props.idMedecin, 
                msg:this.state.msg
            }
        }).then(res => {
                if (res.data === "OK") {
                    NotificationManager.success("Message envoyé avec succée","",2000);
                   setTimeout(() => {
                        this.props.closeModal2(false);
                      }, 4000);
                    

                } else {
                    NotificationManager.warning("Problème d'envoie de message , essayer encore une fois","",2000);
                    setTimeout(() => {
                        this.props.closeModal2(false);
                      }, 4000);
                }
            })
    }
    render() {
        return (
            <div>
                <NotificationContainer/>
                <h4>Envoyer un message</h4>
                <div className="ligneInputTxt">
                    <TextareaAutosize 
                        aria-label="empty textarea" 
                        placeholder="Votre message" 
                        value={this.state.msg} 
                        onChange={this.handleChange}
                        className="textAreaOrdo"
                        name="msg" />
                    
                </div>
                <div className="ligneInputTxt">
                    <button color="secondary" onClick={() => this.sendMsg()}>Envoyer</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    idMedecin: state.idProfil
    });

export default connect(mapStateToProps)(SendMsgPatient);