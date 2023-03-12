import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import "./App.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Table } from "./component/table";
import { DatePicker } from "antd";
import LineChart from "./component/LineChart";
import Chart from 'react-apexcharts'; 
const { RangePicker } = DatePicker;








function App() {
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rowData, setRowdata] = useState();
  const [active, setActive] = useState("Table");


  const handleSelect = (date) => {
    let filtered = rowData.filter((rowData) => {
    let covidDate = new Date(setRowdata(rowData));
    return (covidDate >= date.selection.startDate &&
      covidDate <= date.selection.endDate);

    })
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setStartDate(filtered);
  };


    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      }


   return (
   
      <div className="App">
        
        <br></br>
        <div >
          <RangePicker
            ranges={[selectionRange]}
            onChange={handleSelect} />
        </div>
        <br></br>
        <br></br>
        <div className="Nav">
          <nav>
              <button class="btn" onClick={() => setActive("LineChart")}>
                   Chart
                </button>
                
              <button class="btn" onClick={() => setActive("Table")} >
                    Table
                  </button>
                  
          </nav>
        </div>
      
        <div>
          {active === "Table" &&  <Table title="Table" /> }
          {active === "LineChart" &&  <LineChart title ="LineChart"  /> }
        </div>
       
      </div>
   
  );
}

export default App;
