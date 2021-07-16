import React, { Component } from 'react';
import HeaderMedecin from './HeaderMedecin';
import FichePatient from './FichePatient';
import AjoutOrdonnance from './AjoutOrdonnance';
import SendMsgPatient from './SendMsgPatient';
import Card from '@material-ui/core/Card';
import { FaVideo,FaRegListAlt,FaRegEnvelope, FaRegCheckCircle } from "react-icons/fa";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Button from '@material-ui/core/Button';

export default class Consultation extends Component {
    constructor(props){
        super(props);
        this.state={
            idPatient:"",
            modal1:false,
            modal2:false
        }
    }
    componentDidMount(){
        this.setState({
            idPatient:this.props.match.params.idPatient
        })
        
    }
    showHideModel() {
        this.setState({
            modal1: !this.state.modal1,
        })
    }
    showHideModel2() {
        this.setState({
            modal2: !this.state.modal2,
        })
    }
    closeModel(modal){
        this.setState({
            modal1:modal
        })
    }
    closeModel2(modal){
        this.setState({
            modal2:modal
        })
    }
    finaliserConsultation(){
        alert("consultation terminer")
    }
    render() {
        console.log("id patient consultation :", this.props.match.params.idPatient)
        return (
            <div>
                <Modal isOpen={this.state.modal1} toggle={() => this.showHideModel()}>

                    <ModalBody>
                        <AjoutOrdonnance idPatient = {this.props.match.params.idPatient} closeModal={() => this.closeModel()}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.showHideModel()}>Fermer</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modal2} toggle={() => this.showHideModel2()}>

                    <ModalBody>
                        <SendMsgPatient idPatient = {this.props.match.params.idPatient} closeModal2={() => this.closeModel2()}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.showHideModel()}>Fermer</Button>
                    </ModalFooter>
                </Modal>


                <HeaderMedecin />
                <div className="container mainGlobale">
                    <h4>Consultation </h4>
                    <Card variant="outlined" className="contCardConsult">
                        <div className="col-lg-3 contBttConsult"><button className="bttConsult"><FaVideo /><span>Lancer une consultation vidéo</span></button></div>
                        <div className="col-lg-3 contBttConsult"><button className="bttConsult" onClick={() => this.showHideModel()}><FaRegListAlt /><span>Envoyer une ordonnance</span></button></div>
                        <div className="col-lg-3 contBttConsult"><button className="bttConsult" onClick={() => this.showHideModel2()}><FaRegEnvelope /><span>Envoyer un message</span></button></div>
                        <div className="col-lg-3 contBttConsult"><button className="bttConsult" onClick={() => this.finaliserConsultation()}><FaRegCheckCircle /><span>Consultation términer</span></button></div>
                        <div className="col-lg-12 contficheP">
                            <h5>Fiche patient</h5>
                            <FichePatient idPatient = {this.props.match.params.idPatient}/>
                        </div>
                    </Card>
                </div>
                
            </div>
        )
    }
}
