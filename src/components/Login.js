import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {connect} from "react-redux";

class Login extends Component {
    state = {
        password: '',
        mail: '',
        showPassword: false,
        error:false,
        messageErrorLogin:""
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
    
      handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
        
      };
    
      handleMouseDownPassword = event => {
        event.preventDefault();
      };


      handleSubmit = event => {
        event.preventDefault();
       
            const user = this.state;
            axios({
                method: 'POST',
                url: 'http://localhost/apiSante/loginPatient.php',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: user
            })
                .then((response) => {

                    
                            if(response.data==="ERROR"){
                                this.setState({
                                    error:true,
                                    messageErrorLogin:"Vérifier votre Email ou votre mot de passe !"
                                })
                                NotificationManager.warning(this.state.messageErrorLogin);
                                
                            }else{
                                const dataTable = response.data
                                if (dataTable){
                                    sessionStorage.setItem('user', JSON.stringify({
                                    userId:dataTable[0].id_membre,
                                    userName:dataTable[0].nom,
                                    role:dataTable[0].role
                                    }))
                                    this.props.role(dataTable[0].role)

                                    if(dataTable[0].role==="medecin"){
                                        this.props.history.push('/homem');
                                    }else{
                                        this.props.history.push('./'); 
                                    }
                                    
                                }
                                
                            }
                            
                       

                })
                .catch((error) => {
                    console.log(error)
                })
        
    };
    render() {
        
        return (
            <div className="container mainGlobale">
                <NotificationContainer/>
                <div className="contPaperLogin">
                    <Paper variant="outlined" className="contFormLoginGlobale">
                        <div className="leftPartLogin">

                        </div>
                        <div className="rightPartLogin">
                            <Paper variant="outlined" className="contFormLogin">
                            <h4>Si vous étes déja inscri</h4>
                                <div className="ligneLogin">

                                    <FormControl>
                                    <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                                        <Input
                                            id="standard-adornment-mail"
                                            type='email'
                                            value={this.state.mail}
                                            onChange={this.handleChange}
                                            name="mail"    
                                        />
                                    </FormControl>
                                </div>
                                <div className="ligneLogin">
                                    <FormControl className="">
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            name="password"
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                                >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                        />

                                        
                                    </FormControl>
                                </div>
                                <div className="ligneLogin contBttForm">
                                    <Button variant="contained" color="primary" disableElevation  onClick={this.handleSubmit}>
                                    Connecter
                                    </Button>
                                </div>
                                <h4>Si vous n'étes pas déja inscri</h4>
                                <a href="/inscription" className="bttInscriptionLogin">Inscrivez vous</a>
                            </Paper>
                            
                            
                        </div>
                        
                        
                        

                    </Paper>

                </div>
                
                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        role: (role) => {
            dispatch({ type: "ROLE", role: role, })

        }
    };
};

export default connect("", mapDispatchToProps)(Login);
