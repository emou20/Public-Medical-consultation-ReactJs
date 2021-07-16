import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {connect} from "react-redux";

class ParamProfil extends Component {
    constructor(props){
        super(props);
        this.state = {
            disabledInput:true,
            adresse: "",
            ant_chir: "",
            ant_med: "",
            code_postale: "",
            date_naissance: "",
            id_patient: this.props.idProfil,
            mail: "",
            medicament_alerg: "",
            nom: "",
            pass: "",
            prenom: "",
            profession: "",
            tel: "",
        }
    }

    componentDidMount() {
        const id= this.props.idProfil;
        console.log("state ====> ",this.state.id_patient)
        axios.post(`http://localhost/apiSante/detailProfil.php`, {id})
        .then(res => {
            
            const adresse= res.data[0].adresse;
            const ant_chir= res.data[0].ant_chir;
            const ant_med= res.data[0].ant_med;
            const code_postale= res.data[0].code_postale;
            const date_naissance= res.data[0].date_naissance;
            const id_patient= res.data[0].id_patient;
            const mail= res.data[0].mail;
            const medicament_alerg= res.data[0].medicament_alerg;
            const nom= res.data[0].nom;
            const pass= res.data[0].pass;
            const prenom= res.data[0].prenom;
            const profession= res.data[0].profession;
            const tel= res.data[0].tel

           
            
          this.setState({ 
            adresse,ant_chir,ant_med,code_postale,date_naissance,id_patient,mail,medicament_alerg,nom,pass,prenom,profession,tel
            }); 
            
        })
    }



    editProfil() {
        this.setState({
            disabledInput:!this.state.disabledInput
        })
    }
    updateProfil(){
        const data = this.state;
            axios({
                method: 'POST',
                url: 'http://localhost/apiSante/editPatient.php',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data
            })
                .then((response) => {
                    if(response.data === "OK"){
                        NotificationManager.success("Votre modification a été effectuée avec succès");
                        this.setState({
                            disabledInput:!this.state.disabledInput
                        })

                      
                        
                        sessionStorage.setItem('user', JSON.stringify({
                            userId:this.props.idProfil,
                            userName:this.state.nom,
                            }))
                        
                    }else{
                        NotificationManager.warning("Problème de mise a jour !");
                    }

                })
                .catch((error) => {
                    console.log(error)
                })
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    };
    render() {
        let typePass = "";
        !this.state.disabledInput ? typePass = "text" : typePass = "password"
        
        return (
            <div className="container mainGlobale">
                 <NotificationContainer />
                
                <Card>
                    <CardContent>
                        
                            <div>

                                {this.state.disabledInput ? 
                                (
                                <div className="ligneInputTxt">
                                    <Button variant="contained" color="primary" className="editBtt" disableElevation onClick={() => this.editProfil()}>
                                    Modifier
                                    </Button>
                                </div>
                                ):(
                                <div className="ligneInputTxt">
                                    
                                    <Button variant="contained" color="primary" className="editBtt" disableElevation onClick={() => this.updateProfil()}>
                                    Enregistrer
                                    </Button>

                                    <Button variant="contained" color="primary" className="editBtt" disableElevation onClick={() => this.editProfil()}>
                                    Annuler
                                    </Button>
                                </div>
                                )

                                }
                                
                                <div className="ligneInputTxt">
                                    <TextField
                                    disabled={this.state.disabledInput}
                                    id="outlined-disabled-1"
                                    label="Nom"
                                    value={this.state.nom}
                                    variant="outlined" 
                                    onChange={this.handleChange}
                                    name="nom"
                                    />
                                </div>
                                <div className="ligneInputTxt">
                                    <TextField
                                    disabled={this.state.disabledInput}
                                    id="outlined-disabled-2"
                                    label="Prénom"
                                    value={this.state.prenom}
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    name="prenom"
                                    />
                                </div>
                                <div className="ligneInputTxt">
                                <TextField
                                    disabled={this.state.disabledInput}
                                    id="outlined-disabled-3"
                                    label="Adresse"
                                    value={this.state.adresse}
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    name="adresse"
                                   
                                    />
                                </div>
                                <div className="ligneInputTxt">
                                <TextField
                                    disabled={this.state.disabledInput}
                                    id="outlined-disabled-4"
                                    label="Code postale"
                                    value={this.state.code_postale}
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    name="code_postale"
                                  
                                    />
                                </div>
                                <div className="ligneInputTxt">
                                <TextField
                                    disabled={this.state.disabledInput}
                                    id="outlined-disabled-5"
                                    label="Date de naissance"
                                    value={this.state.date_naissance}
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    name="date_naissance"
                                
                                    />
                                </div>
                                <div className="ligneInputTxt">
                                <TextField
                                    disabled={this.state.disabledInput}
                                    id="outlined-disabled-6"
                                    label="Téléphone"
                                    value={this.state.tel}
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    name="tel"
                                  
                                    />
                                </div>
                                <div className="ligneInputTxt">
                                <TextField
                                    disabled={this.state.disabledInput}
                                    id="outlined-disabled-7"
                                    label="Profession"
                                    value={this.state.profession}
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    name="profession"
                                  
                                    />
                                </div>
                                <div className="ligneInputTxt">
                                <TextField
                                    disabled={this.state.disabledInput}
                                    id="outlined-disabled-8"
                                    label="Antécédent médical"
                                    value={this.state.ant_med}
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    name="ant_med"
                                  
                                    />
                                </div>
                                <div className="ligneInputTxt">
                                <TextField
                                    disabled={this.state.disabledInput}
                                    id="outlined-disabled-9"
                                    label="Antécédent chirurgicaux"
                                    value={this.state.ant_chir}
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    name="ant_chir"
                                  
                                    />
                                </div>
                                <div className="ligneInputTxt">
                                <TextField
                                    disabled={this.state.disabledInput}
                                    id="outlined-disabled-10"
                                    label="Médicaments allergie"
                                    value={this.state.medicament_alerg}
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    name="medicament_alerg"
                                  
                                    />
                                </div>
                                <div className="ligneInputTxt">
                                <TextField
                                    disabled={this.state.disabledInput}
                                    id="outlined-disabled-11"
                                    label="E-mail"
                                    value={this.state.mail}
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    name="mail"
                              
                                    />
                                </div>
                                <div className="ligneInputTxt">
                                <TextField
                                    disabled={this.state.disabledInput}
                                    id="outlined-disabled-12"
                                    label="Mot de passe"
                                    value={this.state.pass}
                                    variant="outlined"
                                    type={typePass}
                                    onChange={this.handleChange}
                                    name="pass"
                               
                                    />
                                </div>
                            </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    idProfil: state.idProfil 
    })




export default connect(mapStateToProps)(ParamProfil);