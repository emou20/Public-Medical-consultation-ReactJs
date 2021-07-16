import React, { Component } from 'react';
import {connect} from "react-redux";

class HoraireCalender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heures: [
        {
          "heure": "8h - 9h",
          "reserver": false
        },
        {
          "heure": "9h - 10h",
          "reserver": false
        },
        {
          "heure": "10h - 11h",
          "reserver": false
        },
        {
          "heure": "11h - 12h",
          "reserver": false
        },
        {
          "heure": "15h - 16h",
          "reserver": false
        },
        {
          "heure": "16h - 17h",
          "reserver": false
        }
        ,
        {
          "heure": "17h - 18h",
          "reserver": false
        }

      ]
    }
  }


  componentDidMount() {

    if (this.props.heure) {
      this.setState({
        heures: this.props.heure
      })

    }
  }

  reserver(heure){
    console.log("debut ",heure)
    this.props.heureReserve(heure, this.props.date, this.props.idProfil, this.props.idMedecin );
  }

  render() {

    return (
      <div>
        <div className="boxHoraires">
          {this.state.heures.map((el, index) =>
            <button key={index} className="heureReservation" disabled={el.reserver} onClick={() => this.reserver(el.heure)}>{el.heure}</button>
          )}

        </div>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
      idMedecin : state.idMedecin,
      idProfil : state.idProfil,
  }
}



export default connect(mapStateToProps)(HoraireCalender);

