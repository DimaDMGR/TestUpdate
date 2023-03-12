import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { GridApi } from "ag-grid-community";



export const Table = () => {
    const [rowData, setRowdata] = useState();
    const defaultColDef = {
        sortable: true,
        flex: 1,
        resizable: true,
        
       filter:true

    }

    const [columnDefs, setColumnDefs] = useState([

        { field: "state" , filter:true, floatingFilter: true  },
        { field: "positive" },
        { field: "death", },
        { field: "total", },
        {
            field: "deaths total",  valueGetter: function totalDeath(params) {
                return params.data.death;
            }  
        },
        {
            field: "cases on 1000 ppl", valueGetter: function aDividerBValueGetter(params) {
                return params.data.positive / 1000;
            }
        },
        {
            field: "deaths on 1000 ppl", valueGetter: function aDivideBValueGetter(params) {
                return params.data.death / 1000;
            }
        }
    ]);

     // data fetching
    useEffect(() => {
        fetch("  https://api.covidtracking.com/v1/states/current.json")
            .then(result => result.json())
            .then(rowData => setRowdata(rowData))


    }, []);

   

    return (
        <div className="ag-theme-alpine" style={{ height: 700, width: 1100 }}>


            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationAutoPageSize={true}>
            </AgGridReact>
        </div>
    );
}; 