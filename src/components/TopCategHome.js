import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import BoxTopCategHome from './BoxTopCategHome';


export default class TopCategHome extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            specialites: []
        
        }
      }

      componentDidMount() {
        axios.get(`http://localhost/apiSante/specialites.php`)
          .then(res => {
            const specialites = res.data;
            this.setState({ specialites });
          })
      }


    render() {
        return (
            <div>
                <Grid container spacing={4}>

                    {this.state.specialites.map((el, index)=>
                    
                    <Grid xs={12} sm={3} item key={index}>
                        <Card className="">
                            <CardContent>
                                <h4>Top 10 {el.nom_specialite}</h4>
                                <BoxTopCategHome id_specialite={el.id_specialite} />
                            </CardContent>
                            <CardActions>
                                <a href={"/liste-medecins/"+el.id_specialite }>Voir plus</a>
                            </CardActions>
                        </Card>
                    </Grid>


                    )}
                    
                    
                    
                </Grid>
            </div>
        )
    }
}
