// @ts-check
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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import Input from '@material-ui/core/Input';
export default class FilmsMaterialTable extends React.Component {
    constructor(props) {
        super(props);
        this.fetchPage = this.fetchPage.bind(this);

        this.state = { searchValue: 'name', sortValue: 'asc', data: null };

        this.columns = [
            { title: 'Name', field: 'name' },
            { title: 'Release date', field: 'releaseDate' },
            { title: 'Format', field: 'format', lookup: { 'VHS': 'VHS', 'DVD': 'DVD', "Blu-Ray": "Blu-Ray" } },
            {
                title: 'Actor List',
                field: 'actorList',
                render: ({ actorList }) => (
                    <>{actorList &&
                        <ul>{
                            actorList.map(actor => <li key={actor._id}>{actor.name} {actor.surname}</li>)
                        }</ul>
                    }</>
                )
            }
        ];
        this.tableIcons = {
            Add: AddBox,
            Check: Check,
            Clear: Clear,
            Delete: DeleteOutline,
            DetailPanel: ChevronRight,
            Edit: Edit,
            Export: SaveAlt,
            Filter: FilterList,
            FirstPage: FirstPage,
            LastPage: LastPage,
            NextPage: ChevronRight,
            PreviousPage: ChevronLeft,
            ResetSearch: Clear,
            Search: Search,
            SortArrow: ArrowUpward,
            ThirdStateCheck: Remove,
            ViewColumn: ViewColumn
        };
        this.editable = {
            onRowAdd: this.onRowAdd.bind(this),
            onRowDelete: this.onRowDelete.bind(this)
        };
        this.searchValueHandleChange = this.searchValueHandleChange.bind(this);
        this.sortHandleChange = this.sortHandleChange.bind(this);
        this.fileInput = React.createRef();
        this.fileInputHandleSubmit = this.fileInputHandleSubmit.bind(this);
        this.render = this.render.bind(this);
    }
    searchValueHandleChange(event) {
        this.setState({ searchValue: event.target.value });
    }
    sortHandleChange(event) {
        this.setState({ sortValue: event.target.value });
    }
    async onRowAdd(newData, fromFile) {
        if (fromFile) {

            return;
        }
        const actorList = newData.actorList.trim().split(/\s+/);
        let actorObjectList = [];
        if (actorList.length % 2) {
            return alert("name + surname = 2 words");
        }
        const date = parseInt(newData.releaseDate);

        if (isNaN(date) || date > 2020 || date < 1000) {
            return alert("Wrong release date");
        }
        for (let i = 0; i < actorList.length; i++) {
            actorObjectList.push({ name: actorList[i], surname: actorList[i + 1] });
            i++;
        }
        newData.actorList = actorObjectList;
        return axios
            .post('http://localhost:3030/api/', { data: newData })
            .catch(err => alert(err.message));
    }
    async onRowDelete({ _id }) {
        return axios
            .delete('http://localhost:3030/api/', { data: { _id } })
            .catch(err => alert(err.message));
    }
    async fetchPage(query) {
        const url = `http://localhost:3030/api/pagination?page=${query.page}&limit=${query.pageSize}&searchstr=${query.search}&sort=${this.state.sortValue}&search=${this.state.searchValue}`;
        const { data: { docs, totalDocs } } = await axios.get(url);
        if (docs.length === 0) {
            const url = `http://localhost:3030/api/pagination?page=0&limit=${query.pageSize}&searchstr=${query.search}&sort=${this.state.sortValue}&search=${this.state.searchValue}`;
            const { data: { docs, totalDocs } } = await axios.get(url);
            return {
                data: docs,
                page: 0,
                totalCount: totalDocs
            };
        }
        return {
            data: docs,
            page: query.page - Number(docs.length === 0),
            totalCount: totalDocs
        };
    }
    fileInputHandleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", this.fileInput.current.files[0]);
        return axios
            .post('http://localhost:3030/api/file', formData)
            .then(data => {
                console.log(data);
               this.setState({});
            })
            .catch(err => alert(err.message));

    }
    render() {
        return (
            <>
                <pre>Search by:   Sort by:</pre>

                <Select
                    value={this.state.searchValue}
                    onChange={this.searchValueHandleChange}
                    input={<OutlinedInput name="Search by:" id="outlined-age-simple" />}>

                    <MenuItem value="name">name</MenuItem>
                    <MenuItem value="actor">actor</MenuItem>
                </Select>
                <Select
                    value={this.state.sortValue}
                    onChange={this.sortHandleChange}
                    input={<OutlinedInput name="Sort by:" id="outlined-age-simple" />}>

                    <MenuItem value="asc">asc</MenuItem>
                    <MenuItem value="desc">desc</MenuItem>
                </Select>
                <form onSubmit={this.fileInputHandleSubmit}>
                    <Input type="file" inputProps={{ accept: ".txt" }} inputRef={this.fileInput} />
                    <button type="submit">Submit</button>
                </form>

                <MaterialTable
                    title="Films list"
                    columns={this.columns}
                    data={this.fetchPage}
                    icons={this.tableIcons}
                    editable={this.editable}
                    options={{
                        search: true,
                        debounceInterval: 500,
                        sorting: false
                    }}
                />
            </>
        );
    }
}
