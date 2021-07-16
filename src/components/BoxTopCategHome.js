import React, { Component } from 'react';
import { FaUserMd } from "react-icons/fa";
import axios from 'axios';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';

export default class BoxTopCategHome extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Top10: [],
            idSpecialite:0
        
        }
      }
      componentDidMount() {
          this.setState({
            idSpecialite: this.props.id_specialite
          })
          const idSpec = this.props.id_specialite;
        axios.post(`http://localhost/apiSante/topSpecialites.php`, {idSpec})
          .then(res => {
            const Top10 = res.data;
            this.setState({ Top10 });
          })
      }

    render() {
        return (
            <div>
                <ul className="ulTopCategMed">
                    {this.state.Top10.map((el, index)=>
                        <li key={index}><FaUserMd /> Dr {el.nom} {el.prenom} <a className="bttDemandeConsultHome" href={"/details-medecin/" + el.id_medecin }><HeadsetMicIcon /></a></li>
                    )}                   
                </ul>
            </div>
        )
    }
}
