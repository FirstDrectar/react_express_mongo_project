import React, { Component } from "react";
import axios from 'axios';
import FilmsMaterialTable from "./materialTable";
import { keyframes } from "styled-components";
import Input from '@material-ui/core/Input';

// function Loader() {
//     var spin = keyframes`
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
// `;

//     var styles = {
//         border: "16px solid #eee",
//         borderTop: "16px solid #3ae",
//         borderRadius: "50%",
//         width: "1cm",
//         height: "1cm",
//         animation: `${spin} 2s linear infinite`
//     };

//     return <div style={styles} id="loader" /> ;
// }

const config = {

    name: "name",
    releaseDate: "11.02.12",
    format: "VHS",
    actorList: [{
        name: "name",
        surname: "surname"
    }],

};
// const loader = {
//     border: "16px solid #343a40",
//     borderRadius: "50 %",
//     borderTop: "16px solid #3498db",
//     width: "120px",
//     height: "120px",
//     animation: "spin 2s linear infinite"
// }
class FilmsTable extends Component {
    state = {
        films: [],
        index: 0,
        dataIsFatched: false,

    }
    async componentDidMount() {
        try {
            const res = await axios.get('http://localhost:3030/api/', config);
            // console.log(res.data.data);
            const films = res.data.data;

            this.setState({ dataIsFatched: true, films });

        } catch (err) {
            console.log(err.message);
        };
        // console.log(this.state.films);

    }
    render() {
        return (
            <div>
                <div style={{ maxWidth: "100%" }}>


                    <FilmsMaterialTable  ></FilmsMaterialTable>


                </div>
                
            </div>
        );
    }
}

export default FilmsTable;