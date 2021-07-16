import React, { Component } from 'react';
import SousMenu from "./SousMenu";
import axios from "axios";

export default class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
          menu: [
              {
                  titre:"Comment ça marche",
                  url:"/cm"
              },
              {
                titre:"Pharmacie",
                url:"/ph"
            },
            {
                titre:"Clinique",
                url:"/cl"
            },
            {
                titre:"Laboratoire",
                url:"/lb"
            },
            {
                titre:"Contact",
                url:"/contact"
            },
          ],
          specialite:[]
        }
      }

      componentDidMount(){
        axios.get(`http://localhost/apiSante/specialites.php`)
        .then(res => {
          this.setState({
            specialite:res.data
          })
          
        })
      }
    render() {
        const menu = this.state.menu
        return (
            <div>
                <div className="menuContainer container">
                    <ul>
                        <li>
                            <button>Spécialité</button>
                            <SousMenu specialite={this.state.specialite} />
                            </li>
                        {menu.map((el, index) =>

                            <li key={index}>
                                <button href={el.url}>{el.titre}</button>
                            </li>

                        )}
                    </ul>
                </div>
            </div>
        )
    }
}
