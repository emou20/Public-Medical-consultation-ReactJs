import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { FaRegEnvelope } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import ParamProfil from './ParamProfil';
import MsgBox from './MsgBox';
import {connect} from "react-redux";
import ListeOrdo from './ListeOrdo';
import Header from './Header';


class Profil extends Component {
    constructor(props){
        super(props);
        this.state = {
            idProfil:this.props.idProfil,
            nbrMsgNonLu:"",
            choix:"",
            
        }
    }
    componentDidMount(){
        const choixMatch = this.props.match.params.msg
        if(choixMatch === "msg"){
            this.setState({
                choix:"msg"
            })
        }
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
   
        return (
            <div>
                 <Header />
                 <div className="container mainGlobale">
                
                <h1>Mon profil </h1>
                <Card variant="outlined"  className="cardHeaderProfil">
                   
                        <div className="contIconProfil">
                            <Button onClick={() => this.openBlock("msg")}><FaRegEnvelope /><span> {this.props.nbrMsgNonLu} Message(s) non lu</span></Button>
                            <Button  onClick={() => this.openBlock("ord")}><FaRegFileAlt /> <span> Ordonnance médicale</span></Button>
                            <Button  onClick={() => this.openBlock("prof")}><FaUserCog /> <span> Modifier mon profil</span></Button>
                        </div>
               
                </Card>
                {
                this.state.choix ==="msg"? <MsgBox /> : this.state.choix ==="ord" ? <ListeOrdo /> : <ParamProfil idPatient = {this.props.idProfil}/>
                }

            </div>
            </div>
            
        )
    }
}


const mapStateToProps = (state) => ({
    idProfil: state.idProfil,
    nbrMsgNonLu: state.nbrMsgNonLu 
    });

export default connect(mapStateToProps)(Profil);