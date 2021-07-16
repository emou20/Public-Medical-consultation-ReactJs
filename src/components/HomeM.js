import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { FaRegEnvelope } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import Button from '@material-ui/core/Button';
import DemandeConsultation from './DemandeConsultation';
import {connect} from "react-redux";
import HeaderMedecin from './HeaderMedecin';
import DemandeConsultValid from './DemandeConsultValide';
import HistoriqueConsultation from './HistoriqueConsultation';

class HomeM extends Component {
    constructor(props){
        super(props);
        this.state = {
            idProfil:this.props.idProfil,
            choix:"",
            
        }
    }
    componentDidMount(){
        const objectUser = JSON.parse(sessionStorage.getItem('user'));
            if(!objectUser){
                this.props.history.push('./'); 
            }
        setInterval(() => {
            const objectUser = JSON.parse(sessionStorage.getItem('user'));
            if(!objectUser){
                this.props.history.push('./'); 
            }
        }, 1000);
    }
    openBlock(choix){
        this.setState({
            choix:choix
        })
    }
    render() {
        const choix = this.state.choix;
        let {active1, active2, active3, active4, active5} = "";
        active1 = "active";
        if(choix==="clt"){
            active1 = "active"
        }else if(choix==="dma"){
            active2 = "active";
            active1 = "";
        }else if (choix==="hClt"){
            active3 = "active";
            active1 = "";
        }else if (choix==="cltH"){
            active4 = "active";
            active1 = "";
        }else if (choix==="prof"){
            active5 = "active";
            active1 = "";
        }
        return (
            <div>
                <HeaderMedecin />
                <div className="container mainGlobale">
                <h4>Accueil </h4>
                <Card variant="outlined"  className="cardmenuMedecin">
                   
                        <div className="contIconProfil">
                            <Button onClick={() => this.openBlock("clt")} className={active1} ><FaRegEnvelope /><span> {this.props.nbrMsgNonLu} demandes de consultation</span></Button>
                            <Button  onClick={() => this.openBlock("dma")} className={active2} ><FaRegFileAlt /> <span> Demandes accepté</span></Button>
                            <Button  onClick={() => this.openBlock("hClt")} className={active3} ><FaRegFileAlt /> <span> Historique de consultation</span></Button>
                            <Button  onClick={() => this.openBlock("cltH")} className={active4} ><FaRegFileAlt /> <span> Message(s) non lu</span></Button>
                            <Button  onClick={() => this.openBlock("prof")} className={active5} ><FaUserCog /> <span> Modifier mon profil</span></Button>
                        </div>
               
                </Card>
                <Card variant="outlined"  className="cardcontentMedecin">
                {
                this.state.choix ==="clt"? <DemandeConsultation idProfil={this.props.idProfil} /> : this.state.choix ==="dma" ? <DemandeConsultValid idProfil={this.props.idProfil} /> : this.state.choix === "hClt" ? <HistoriqueConsultation idProfil={this.props.idProfil} /> : <DemandeConsultation idProfil={this.props.idProfil} />
                }
                </Card>
            </div>
            </div>
            
        )
    }
}


const mapStateToProps = (state) => ({
    idProfil: state.idProfil
    });

export default connect(mapStateToProps)(HomeM);