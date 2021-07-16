import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from "axios";
import Pagination from './Pagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FaEye } from "react-icons/fa";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

class ListeOrdo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listeOrdo: [],
            pageOfItems: [],
            aucun: false,
            modal: false,
            indexOrdoOuvert: 0,
        }
    }
    componentDidMount() {
        console.log(" ------- ****", this.props.idProfil)
        axios({
            method: 'POST',
            url: 'http://localhost/apiSante/listeOrdo.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: this.props.idProfil
        }).then(res => {
                if (res.data === "Aucun") {
                    this.setState({
                        aucun: true
                    })
                } else {
                    this.setState({
                        listeOrdo: res.data,
                        aucun: false,
                    })
                }
            })
    }
    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    showHideModel() {
        this.setState({
            modal: !this.state.modal,
        })
    }
    openOrdo(index){
        this.setState({
            indexOrdoOuvert: index,
            modal: !this.state.modal,
        })
    }
    render() {
        let indexOrdoOuvert = this.state.indexOrdoOuvert;
        return (
            <div className="container mainGlobale">
                <h4>Mes ordonnances </h4>

                <Modal isOpen={this.state.modal} toggle={() => this.showHideModel()}>

                    <ModalBody>
                        
                        <div className="contentOrdonance" style={{ 
                        backgroundImage: `url("${this.state.listeOrdo.length > 0 ? this.state.listeOrdo[indexOrdoOuvert].bg : ""}")` 
                        }}>
                            <div className="dateOrdo">
                            {this.state.listeOrdo.length > 0 ? this.state.listeOrdo[indexOrdoOuvert].date_ordonnance : <div></div>}   
                            </div>
                            {this.state.listeOrdo.length > 0 ? this.state.listeOrdo[indexOrdoOuvert].ordonnance : <div></div>}
                        </div>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.showHideModel()}>Fermer</Button>
                        <Button color="secondary" onClick={() => window.print()}>Imprimer</Button>
                    </ModalFooter>
                </Modal>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell align="right">Medecin</TableCell>
                                <TableCell align="right">Ordonnance</TableCell>
                                <TableCell align="right">Date ordonnance</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.pageOfItems.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.nom_medecin}</TableCell>
                                    <TableCell align="right">Ordonnance-{row.nom_medecin}-{row.date_creation}</TableCell>
                                    <TableCell align="right">{row.date_ordonnance}</TableCell>
                                    <TableCell align="right"><Button onClick={() => this.openOrdo(index)}><FaEye /></Button></TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination items={this.state.listeOrdo} onChangePage={this.onChangePage} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    idProfil: state.idProfil 
    })

export default connect(mapStateToProps)(ListeOrdo);