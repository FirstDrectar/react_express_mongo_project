import React, { Component } from "react";
import axios from 'axios';
import FilmsMaterialTable from "./materialTable";


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
    constructor() {
        super();
        
    }
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