import React from "react";
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
import axios from 'axios';
const config = {

    name: "name",
    releaseDate: "11.02.12",
    format: "VHS",
    actorList: [{
        name: "name",
        surname: "surname"
    }],

};
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
function FilmsMaterialTable(props) {
    const [state, setState] = React.useState({
        columns: [
            {
                title: 'Name', field: 'name'
            },
            { title: 'Release date', field: 'releaseDate' },
            { title: 'Format', field: 'format', lookup: { 'VHS': 'VHS', 'DVD': 'DVD', "Blu-Ray": "Blu-Ray" } },
            {
                title: 'Actor List', field: 'actorList',
                render: rowData => {

                    return (rowData.actorList ?
                        < ul> {
                            rowData.actorList.map(actor => {
                                return (<li key={actor._id}>{actor.name} {actor.surname}</li>)
                            })
                        } </ul > : <div></div>)
                }
            }

        ],
        data: props.films
    });

    return (
        <MaterialTable
            title="Films list"
            columns={state.columns}
            data={state.data}
            icons={tableIcons}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(async () => {
                            resolve();
                            const data = [...state.data];
                            const actorList = newData.actorList.trim().split(/\s+/);
                            let actorObjectList = [];
                            if (actorList.length % 2) {
                                return alert("name + surname = 2 words");
                            }
                            for (let i = 0; i < actorList.length; i++) {
                                actorObjectList.push({ name: actorList[i], surname: actorList[i + 1] });
                                i++;
                            }
                            console.log(actorObjectList);
                            newData.actorList = actorObjectList;
                            console.log(newData);
                            try {
                                const res = await axios.post('http://localhost:3030/api/', { data:newData });
                                debugger;
                            } catch (err) { alert(err.message); }
                            data.push(newData);
                            setState({ ...state, data });

                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(async () => {
                            resolve();
                            const data = [...state.data];
                            const removed = data.splice(data.indexOf(oldData), 1);
                            if (removed.length)
                                try {
                                    const res = await axios.delete('http://localhost:3030/api/', { data: removed[0] });

                                } catch (err) { alert(`This film was deleted`); }
                            // debugger;
                            setState({ ...state, data });
                        }, 600);
                    }),
            }}
        />
    );
}
export default FilmsMaterialTable;