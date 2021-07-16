import React, { Component } from 'react';
import axios from "axios";
import NomPatient from './NomPatient';
import { FaRegAddressCard, FaRegCalendarAlt, FaRegClock, FaLaptopMedical } from "react-icons/fa";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default class DemandeConsultValid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            aucun: true,
            modal: false,
            adresse: "",
            ant_chir: "",
            ant_med: "",
            code_postale: "",
            date_naissance: "",
            id_patient: "",
            mail: "",
            medicament_alerg: "",
            nom: "",
            prenom: "",
            profession: "",
            tel: "",
        }
    }
    componentDidMount() {
        axios({
            method: 'POST',
            url: 'http://localhost/apiSante/demandeConsultationValid.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: this.props.idProfil
        }).then(res => {
            if (res.data === "Aucun") {
                this.setState({
                    aucun: true
                })
            } else {
                this.setState({
                    reservations: res.data,
                    aucun: false,
                })
            }
        })


    }

    detailsPatient(id) {
        axios.post(`http://localhost/apiSante/detailProfil.php`, { id })
            .then(res => {

                const adresse = res.data[0].adresse;
                const ant_chir = res.data[0].ant_chir;
                const ant_med = res.data[0].ant_med;
                const code_postale = res.data[0].code_postale;
                const date_naissance = res.data[0].date_naissance;
                const id_patient = res.data[0].id_patient;
                const mail = res.data[0].mail;
                const medicament_alerg = res.data[0].medicament_alerg;
                const nom = res.data[0].nom;
                const prenom = res.data[0].prenom;
                const profession = res.data[0].profession;
                const tel = res.data[0].tel



                this.setState({
                    adresse, ant_chir, ant_med, code_postale, date_naissance, id_patient, mail, medicament_alerg, nom, prenom, profession, tel,
                    modal: !this.state.modal,
                });

            })

    }
    validerPatient(id, index) {
        axios.post(`http://localhost/apiSante/valideReservation.php`, { id })
            .then(res => {

                if (res.data === "OK") {
                    NotificationManager.success("Réservation valider avec succès");
                    let tableBack = []
                    tableBack = this.state.reservations
                    tableBack.splice(index, 1)
                    this.setState({
                        reservations: tableBack
                    })


                }



            })
    }
    showHideModel() {
        this.setState({
            modal: !this.state.modal,
        })
    }
    render() {
        return (
            <div className="container">
                <NotificationContainer />
                <h4>Demande de consultation validé</h4>
                <Modal isOpen={this.state.modal} toggle={() => this.showHideModel()}>

                    <ModalBody>
                        <div className="ligneDetailPopup"><span>Nom :</span> {this.state.nom}</div>
                        <div className="ligneDetailPopup"><span>Prénom :</span> {this.state.prenom}</div>
                        <div className="ligneDetailPopup"><span>Tél :</span> {this.state.tel}</div>
                        <div className="ligneDetailPopup"><span>Date de naissance :</span> {this.state.date_naissance}</div>
                        <div className="ligneDetailPopup"><span>Profession :</span> {this.state.profession}</div>
                        <div className="ligneDetailPopup"><span>Adresse :</span> {this.state.adresse}</div>
                        <div className="ligneDetailPopup"><span>Code postale :</span> {this.state.code_postale}</div>
                        <div className="ligneDetailPopup"><span>Antécédent chirurgicale :</span> {this.state.ant_chir}</div>
                        <div className="ligneDetailPopup"><span>Antécédent médicale :</span> {this.state.ant_med}</div>
                        <div className="ligneDetailPopup"><span>Médicament alergique :</span> {this.state.medicament_alerg}</div>
                    </ModalBody>
                    <ModalFooter>
                        <button color="secondary" onClick={() => this.showHideModel()}>Fermer</button>
                        <button color="secondary">Envoyer un message</button>
                    </ModalFooter>
                </Modal>
                <div className="ligneReservation">
                    <div className="nomPatientReservation"><strong>Nom Patient</strong></div>
                    <div className="dateReservation"><strong>Date</strong></div>
                    <div className="heureReservation"><strong>Heure</strong></div>
                    

                </div>
                {this.state.aucun === false ? (
                    this.state.reservations.map((el, index) => (
                        <div className="ligneReservation" key={index}>
                            <div className="nomPatientReservation">
                                <NomPatient idPatient={el.id_patient} />
                            </div>
                            <div className="dateReservation"><FaRegCalendarAlt /><span>{el.date}</span></div>
                            <div className="heureReservation"><FaRegClock /><span>{el.heure}</span></div>
                            <button className="detailPatient" onClick={() => this.detailsPatient(el.id_patient)}><FaRegAddressCard /><span>Détails Patient</span></button>
                            <a href={`/consultation/${el.id_patient}`} className="ValiderReservation"><FaLaptopMedical /><span>Consultation</span></a>

                        </div>


                    ))
                ) :
                    (
                        <div>Aucune réservation</div>
                    )

                }
            </div>
        )
    }
}
