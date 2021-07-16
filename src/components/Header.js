import React, { Component } from 'react';
import Menu from "./Menu";
import { FaUserCircle } from "react-icons/fa";
import {connect} from "react-redux";
import { FaRegEnvelope } from "react-icons/fa";
import axios from "axios";


class Header extends Component {
    state = {
        nameUser:"",
        idUser:"",
        nbrMsgNonLu:"",
    }
   
    componentDidMount() {
        const objectUser = JSON.parse(sessionStorage.getItem('user'));
            if(objectUser){
                let nameUser = objectUser.userName;
                let idUser = objectUser.userId;
                this.props.idProfil(idUser);
                this.setState({
                    nameUser, idUser
                })
            }else {
                let nameUser = "";
                let idUser = "";
                this.setState({
                    nameUser, idUser
                })
            }
        setInterval(() => {
            const objectUser = JSON.parse(sessionStorage.getItem('user'));
            if(objectUser){
                let nameUser = objectUser.userName;
                let idUser = objectUser.userId;
                this.props.idProfil(idUser);
                this.setState({
                    nameUser, idUser
                })
            }else {
                let nameUser = "";
                let idUser = "";
                this.setState({
                    nameUser, idUser
                })
            }
        }, 1000);

       
            axios.get(`http://localhost/apiSante/nbrMsg.php`)
          .then(res => {
            this.props.nbrMsgNonLu(res.data)
            this.setState({
                nbrMsgNonLu:res.data
            })
            
          })

       

        
        
        
    }

    logout(){
        sessionStorage.clear()
    }
    render() {
        
        return (
            <div className="container-fluid contHeaderPatient">
                <div className="container header1">
                    <a href="./" className="logoApp"><img src="http://medic-app.type-code.pro/assets/img/logo.svg" alt="" /></a>
                    {this.state.nameUser === "" ? (
                        <div>
                            <a href="/login" className="bttLogin">Login</a>
                            <a href="/Inscription" className="bttLogin">Inscription</a>
                        </div>
                        
                    ) : (
                        <div>
                            
                            <button onClick={this.logout} className="bttLogin">Déconnexion</button>
                            <div className="userNameConnected"><span><FaUserCircle  size={32} /></span> Bienvenue Mr <a href="/profil">{this.state.nameUser}</a></div>
                            <a  href="/profil/msg" className="msgNotifConnected">
                                {this.props.nbrMsgNLu > 0 ?
                                (
                                <div className="notifMsg">
                                    <span>{this.props.nbrMsgNLu}</span>
                                </div>
                                ):(
                                <div></div>
                                )

                                }
                                
                                <FaRegEnvelope />
                            </a>
                        </div>
                    ) }
                    


                </div>
                <div className="header2">
                    <div className="container menuHaut">
                        <Menu />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    nbrMsgNLu: state.nbrMsgNonLu 
    })

const mapDispatchToProps = dispatch => {
    return {
        idProfil: (idProfil) => {
            dispatch({ type: "ID_PROFIL", idProfil: idProfil, })

        },
        nbrMsgNonLu: (nbrMsgNonLu) => {
            dispatch({ type: "NBR_MSGNONLU", nbrMsgNonLu: nbrMsgNonLu, })

        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);