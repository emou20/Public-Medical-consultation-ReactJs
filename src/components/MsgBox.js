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
import { FaTrashAlt } from "react-icons/fa";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from "react-redux";
import { NotificationContainer, NotificationManager } from 'react-notifications';




class MsgBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listeMsg: [],
            pageOfItems: [],
            aucun: false,
            modal: false,
            indexMsgOuvert: 0,
        }
    }
    componentDidMount() {
        axios({
            method: 'POST',
            url: 'http://localhost/apiSante/listeMsg.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: this.props.idProfil
        }).then(res => {
            if (res.data === "Aucun message") {
                this.setState({
                    aucun: true
                })
            } else {
                this.setState({
                    listeMsg: res.data,
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
    openMsg(index, id) {

        this.setState({
            indexMsgOuvert: index,
            modal: !this.state.modal,
        })
        axios({
            method: 'POST',
            url: 'http://localhost/apiSante/msgLu.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: id
        })
            .then((response) => {
                if (response.data === "OK") {
                    axios.get(`http://localhost/apiSante/nbrMsg.php`)
                        .then(res => {
                            this.props.nbrMsgNonLu(res.data)

                        })
                    axios({
                        method: 'POST',
                        url: 'http://localhost/apiSante/listeMsg.php',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: this.props.idProfil
                    })
                        .then(res => {
                            if (res.data !== "Aucun message") {
                                this.setState({
                                    listeMsg: res.data,
                                    aucun: false,
                                })
                            }
                        })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    generateDesc(msg) {
        if (msg.length > 50) {
            let chaincouper = msg.substr(0, 50)
            let chaine = `${chaincouper}...`
            return chaine
        } else {
            return msg
        }
    }
    deleteMsg(id) {
        axios({
            method: 'POST',
            url: 'http://localhost/apiSante/deleteMsg.php',
            headers: {
                'Content-Type': 'application/json',
            },
            data: id
        })
            .then((response) => {
                if (response.data === "OK") {
                    NotificationManager.success("Votre message a été effacer avec succès");

                    axios({
                        method: 'POST',
                        url: 'http://localhost/apiSante/listeMsg.php',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: this.props.idProfil
                    })
                        .then(res => {
                            if (res.data !== "Aucun message") {
                                this.setState({
                                    listeMsg: res.data,
                                    aucun: false,
                                })
                            }
                        })

                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
        let indexMsgOuvert = this.state.indexMsgOuvert;
        return (
            <div className="container mainGlobale">
                <NotificationContainer />
                <h4>Boite de message </h4>

                <Modal isOpen={this.state.modal} toggle={() => this.showHideModel()}>

                    <ModalBody>
                        {this.state.listeMsg.length > 0 ? this.state.listeMsg[indexMsgOuvert].msg : <div></div>}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.showHideModel()}>Fermer</Button>
                    </ModalFooter>
                </Modal>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell align="right">Envoyeur</TableCell>
                                <TableCell align="right">Message</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.pageOfItems.map((row, index) => (
                                <TableRow key={index} className={`lu${row.lu} tableMsg`}>
                                    <TableCell component="th" scope="row">
                                        <button onClick={() => this.openMsg(index)}>{row.id}</button>
                                    </TableCell>
                                    <TableCell align="right"><button onClick={() => this.openMsg(index, row.id)}>{row.nom_envoyeur}</button></TableCell>
                                    <TableCell align="right"><button onClick={() => this.openMsg(index, row.id)}>{this.generateDesc(row.msg)}</button></TableCell>
                                    <TableCell align="right"><button onClick={() => this.openMsg(index, row.id)}>{row.date}</button></TableCell>
                                    <TableCell align="right"><Button onClick={() => this.deleteMsg(row.id)}><FaTrashAlt /></Button></TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination items={this.state.listeMsg} onChangePage={this.onChangePage} />
            </div>
        )
    }
}




const mapDispatchToProps = dispatch => {
    return {
        nbrMsgNonLu: (nbrMsgNonLu) => {
            dispatch({ type: "NBR_MSGNONLU", nbrMsgNonLu: nbrMsgNonLu, })

        }
    };
};

const mapStateToProps = (state) => ({
    idProfil: state.idProfil
})

export default connect(mapStateToProps, mapDispatchToProps)(MsgBox);