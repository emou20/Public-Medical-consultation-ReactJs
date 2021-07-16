import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";

export default function NomPatient(props) {
    const [nomPatient, setNomPatient] = useState("");
    useEffect(() => {
        const user = props.idPatient
        axios.post(`http://localhost/apiSante/nomPatient.php`, { user })
        .then(res => {
          setNomPatient(res.data);
        })
      });
    return (
        <div>
           <FaUserAlt/> {nomPatient}
        </div>
    )
}
