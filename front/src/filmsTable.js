import React, { Component } from "react";
import axios from 'axios';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
var config = {

    name: "name",
    releaseDate: "11.02.12",
    format: "VHS",
    actorList: [{
        name: "name",
        surname: "surname"
    }],

};
class FilmsTable extends Component {
    state = {
        films: [],
        index: 0,
        dataIsFatched: false,

    }
    async componentDidMount() {
        try {
            const res = await axios.get('http://localhost:3030/api/', config);
            console.log(res.data.data);
            const films = res.data.data;
            res.data.data.forEach(film => {
                let actorList = "";
                film.actorList.forEach(actor => {
                    actorList += `${actor.name} ${actor.surname}\n`;
                });
                film.actorList = actorList;
                console.log(film.actorList);

            });


            this.setState({ dataIsFatched: true, films });

        } catch (err) {
            console.log(err.message);
        };
        console.log(this.state.films);

    }
    render() {
        return (<div style={{ maxWidth: "100%" }}>
            {
                this.state.dataIsFatched ?
                    <FilmsMaterialTable films={this.state.films} ></FilmsMaterialTable>
                    :
                    <p></p>
            }
        </div>
        );
    }
}
function FilmsMaterialTable(props) {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Release date', field: 'releaseDate' },
            { title: 'Format', field: 'format', lookup: { 'VHS': 'VHS', 'DVD': 'DVD', "Blu-Ray": "Blu-Ray" } },
            { title: 'Actor List', field: 'actorList' }
        ],
        data: props.films
    });

    return (
        <MaterialTable
            title="Editable Example"
            columns={state.columns}
            data={state.data}
            icons={tableIcons}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.push(newData);
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data[data.indexOf(oldData)] = newData;
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.splice(data.indexOf(oldData), 1);
                            setState({ ...state, data });
                        }, 600);
                    }),
            }}
        />
    );
}
export default FilmsTable;