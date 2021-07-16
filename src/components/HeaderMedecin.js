import React, { Component } from 'react';
import { FaUserMd } from "react-icons/fa";
import { connect } from "react-redux";
import axios from "axios";


class HeaderMedecin extends Component {
    state = {
        nameUser: "",
        idUser: "",
        nbrMsgNonLu: "",
    }

    componentDidMount() {
        const objectUser = JSON.parse(sessionStorage.getItem('user'));
        if (objectUser) {
            let nameUser = objectUser.userName;
            let idUser = objectUser.userId;
            this.props.idProfil(idUser);
            this.setState({
                nameUser, idUser
            })
        } else {

            let nameUser = "";
            let idUser = "";
            this.setState({
                nameUser, idUser
            })

        }
        setInterval(() => {
            const objectUser = JSON.parse(sessionStorage.getItem('user'));
            if (objectUser) {
                let nameUser = objectUser.userName;
                let idUser = objectUser.userId;
                this.props.idProfil(idUser);
                this.setState({
                    nameUser, idUser
                })
            } else {
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
                    nbrMsgNonLu: res.data
                })

            })






    }

    logout() {
        sessionStorage.clear();
        

    }
    render() {

        return (
            <div className="container-fluid headerMedecin">
                <div className="container header1">
                    <a href="/homem" className="logoApp"><img src="http://medic-app.type-code.pro/assets/img/logo.svg" alt="" /></a>
                    
                        <div>

                            <button onClick={this.logout} className="bttLogin">Déconnexion</button>
                            <div className="userNameConnected"><span><FaUserMd size={32} /></span> Bienvenue Doc <a href="/homem">{this.state.nameUser}</a></div>
                            
                        </div>

                </div>
                <div className="header2">
                    <div className="container">
                        <a href="/homem" className="lienMenuMedecin">Accueil</a>
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

        },
        role: (role) => {
            dispatch({ type: "ROLE", role: role, })

        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HeaderMedecin);