import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';


export default class Inscription extends Component {

    state = {
         nom :"",
         prenom : "",
		 date :"",
		 adresse :"",
		 code :"",
         tel :"",		 
         prof :"",
		 antMed :"",
		 antChir :"",
		 medicAlerg :"",
		 mail :"",
         pass :"",
         error:false,
         dejainscriMessage:"",
         nomError : "",
         prenomError : "",
         dateError : "",
         adresseError : "",
         codeError : "",
         telError : "",	 
         profError : "",
         mailError : "",
         passError : "",
    }

    componentWillMount(){
        const objectUser = JSON.parse(sessionStorage.getItem('user'));
            if(objectUser){
                this.props.history.push('./');
            }   
    }
    handleChange = event => {

        this.setState({
            [event.target.name]: event.target.value
        });

    };



    validate = () => {

        let nomError = "";
        let prenomError = "";
        let dateError = "";
        let adresseError = "";
        let codeError = "";
        let telError = "";	 
        let profError = "";
        let mailError = "";
        let passError = "";


         
        if (!this.state.nom) {
            nomError = "Le champ (Nom) est vide !";
        }

        if (!this.state.prenom) {
            prenomError = "Le champ (prenom) est vide !";
        }
        
        if (!this.state.date) {
            dateError = "Le champ (date de naissance) est vide !";
        }else {
            const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
            if(!this.state.date.match(re)) {
                dateError = "Le format de (date de naissance) est invalide !";
            }
        }

        if (!this.state.adresse) {
            adresseError = "Le champ (adresse) est vide !";
        }

        if (!this.state.adresse) {
            adresseError = "Le champ (adresse) est vide !";
        }

        if (!this.state.code) {
            codeError = "Le champ (code postale) est vide !";
        }else{
            if (this.state.code.length !== 4) {
                codeError = "Le champ (code postale) doit étre de 4 chiffres !";
            } else {
                codeError = "";
            }
        }


        if (!this.state.tel) {
            telError = "Le champ (téléphone) est vide !";
        }else{
            if (this.state.tel.length !== 8) {
                telError = "Le champ (téléphone) doit étre de 8 chiffres !";
            } else {
                telError = "";
            }
        }

        if (!this.state.prof) {
            profError = "Le champ (profession) est vide !";
        }

        
        if (!this.state.mail) {
            mailError = "Le champ Email est vide !";
        } else {
            if (!this.state.mail.includes("@")) {
                mailError = "Email invalide ";
            }
        }

        if (!this.state.pass) {
            passError = "Le champ (mot de passe) est vide !";
        }




        if (nomError || prenomError || dateError || adresseError || codeError || telError || profError || mailError || passError) {
            this.setState({ nomError, prenomError, dateError, adresseError, codeError, telError, profError,mailError,passError,
            error:true
            });
               
            return false;
        }

        return true;
    };







    handleSubmit = event => {
        event.preventDefault();
       
        const isValid = this.validate();
        if (isValid) {


            const user = this.state;
            axios({
                method: 'POST',
                url: 'http://localhost/apiSante/insertPatient.php',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: user
            })
                .then((response) => {

                    if (response.data === "Exist") {
                       
                        this.setState({
                            error:true,
                            dejainscriMessage:"Vous êtes déjà enregistré pour le tirage au sort, Bonne chance!"
                        })
                        NotificationManager.warning(this.state.dejainscriMessage);
                        
                        }else{
                            if(response.data!=="ERROR"){
                                const dataTable = response.data
                                sessionStorage.setItem('user', JSON.stringify({
                                    userId:dataTable[0].id_patient,
                                    userName:dataTable[0].nom,
                                }))
                                this.props.history.push('./');
                            }else{
                                console.log(response.data)
                            }
                            
                        }

                })
                .catch((error) => {
                    console.log(error)
                })
        }




        
    };
    render() {
        return (
            <div className="container mainGlobale inscription">
                        <NotificationContainer />

                        <Paper variant="outlined" className="contFormLogin">

                      
                            <div className="leftcolInscri">
                                    <h4>Inscription a votre espace privé</h4>
                                        <div className="ligneLogin">

                                            <FormControl>
                                            <InputLabel htmlFor="standard-adornment-nom">Nom *</InputLabel>
                                                <Input
                                                    id="standard-adornment-nom"
                                                    type='text'
                                                    value={this.state.nom}
                                                    onChange={this.handleChange}
                                                    name="nom"    
                                                />
                                                <FormHelperText id="component-error-text">{this.state.nomError}</FormHelperText>
                                            </FormControl>
                                        </div>

                                        <div className="ligneLogin">

                                            <FormControl>
                                            <InputLabel htmlFor="standard-adornment-prenom">Prénom *</InputLabel>
                                                <Input
                                                    id="standard-adornment-prenom"
                                                    type='text'
                                                    value={this.state.prenom}
                                                    onChange={this.handleChange}
                                                    name="prenom"    
                                                />
                                                <FormHelperText id="component-error-text">{this.state.prenomError}</FormHelperText>
                                            </FormControl>
                                        </div>

                                        <div className="ligneLogin">

                                            <FormControl>
                                            <InputLabel htmlFor="standard-adornment-date">Date de naissance *</InputLabel>
                                                <Input
                                                    id="standard-adornment-date"
                                                    type='text'
                                                    value={this.state.date}
                                                    onChange={this.handleChange}
                                                    name="date" 
                                                />
                                                <FormHelperText id="component-text">Le format de la date est jj/mm/aaaa</FormHelperText>
                                                <FormHelperText id="component-error-text">{this.state.dateError}</FormHelperText>
                                            </FormControl>
                                        </div>

                                        <div className="ligneLogin">

                                            <FormControl>
                                            <InputLabel htmlFor="standard-adornment-adresse">Adresse *</InputLabel>
                                                <Input
                                                    id="standard-adornment-adresse"
                                                    type='text'
                                                    value={this.state.adresse}
                                                    onChange={this.handleChange}
                                                    name="adresse"    
                                                />
                                                <FormHelperText id="component-error-text">{this.state.adresseError}</FormHelperText>
                                            </FormControl>
                                        </div>

                                        <div className="ligneLogin">

                                            <FormControl>
                                            <InputLabel htmlFor="standard-adornment-code">Code postale *</InputLabel>
                                                <Input
                                                    id="standard-adornment-code"
                                                    type='number'
                                                    value={this.state.code}
                                                    onChange={this.handleChange}
                                                    name="code"    
                                                />
                                                <FormHelperText id="component-text">Exemple : 2083</FormHelperText>
                                                <FormHelperText id="component-error-text">{this.state.codeError}</FormHelperText>
                                            </FormControl>
                                        </div>

                                        <div className="ligneLogin">

                                            <FormControl>
                                            <InputLabel htmlFor="standard-adornment-tel">Téléphone *</InputLabel>
                                                <Input
                                                    id="standard-adornment-tel"
                                                    type='number'
                                                    value={this.state.tel}
                                                    onChange={this.handleChange}
                                                    name="tel"    
                                                />
                                                <FormHelperText id="component-error-text">{this.state.telError}</FormHelperText>
                                            </FormControl>
                                        </div>

                                        <div className="ligneLogin">

                                            <FormControl>
                                            <InputLabel htmlFor="standard-adornment-prof">Profession *</InputLabel>
                                                <Input
                                                    id="standard-adornment-prof"
                                                    type='text'
                                                    value={this.state.prof}
                                                    onChange={this.handleChange}
                                                    name="prof"    
                                                />
                                                <FormHelperText id="component-error-text">{this.state.profError}</FormHelperText>
                                            </FormControl>
                                        </div>

                                       



                                    <div className="groupeAnti">

                                        <div className="ligneLogin">
                                        <FormControl>
                                        <TextareaAutosize 
                                            aria-label="Antécédent médicaux" 
                                            name="antMed" 
                                            rowsMin={3} 
                                            placeholder="Antécédent médicaux"
                                            value={this.state.antMed}
                                            onChange={this.handleChange}
                                            />

                                        </FormControl>
                                        </div>
                                        <div className="ligneLogin">
                                        <FormControl>
                                        <TextareaAutosize 
                                            aria-label="Antécédent chirurgicaux" 
                                            name="antChir" 
                                            rowsMin={3} 
                                            placeholder="Antécédent chirurgicaux"
                                            value={this.state.antChir}
                                            onChange={this.handleChange}
                                            />
                                        </FormControl>
                                        </div>
                                        <div className="ligneLogin">
                                        <FormControl>
                                        <TextareaAutosize 
                                            aria-label="Médicament allergique" 
                                            name="medicAlerg" 
                                            rowsMin={3} 
                                            placeholder="Médicament allergique"
                                            value={this.state.medicAlerg}
                                            onChange={this.handleChange}
                                            />
                                        </FormControl>
                                        </div>

                                    </div>

                                        
                                        <div className="ligneLogin">

                                            <FormControl>
                                            <InputLabel htmlFor="standard-adornment-password">Email *</InputLabel>
                                                <Input
                                                    id="standard-adornment-mail"
                                                    type='text'
                                                    value={this.state.mail}
                                                    onChange={this.handleChange}
                                                    name="mail"    
                                                />
                                                <FormHelperText id="component-error-text">{this.state.mailError}</FormHelperText>
                                            </FormControl>
                                        </div>

                                        <div className="ligneLogin">

                                            <FormControl>
                                            <InputLabel htmlFor="standard-adornment-pass">Mot de passe *</InputLabel>
                                                <Input
                                                    id="standard-adornment-pass"
                                                    type='text'
                                                    value={this.state.pass}
                                                    onChange={this.handleChange}
                                                    name="pass"    
                                                />
                                                <FormHelperText id="component-error-text">{this.state.passError}</FormHelperText>
                                            </FormControl>
                                        </div>
                                        
                                        <div className="ligneLogin contBttForm">
                                            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                            Enregistrer
                                            </Button>
                                        </div>

                            </div>
                            
                            <div className="rightcolInscri">


                            </div>
                            
                                
                            </Paper>
                
            </div>
        )
    }
}
