
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";




function LineChart ({title})  {

  const [positiveCases, setPositiveCases] = useState([]);
  const [time, setTime] = useState([]);
  const [lethal, setLethal] = useState([]);
  


  //data fetching
  useEffect(() => {
    const covidCases = [];
    const timePeriod = [];
    const lethal = [];
    const getSocialrecord = async () => {
      const dataReq = await fetch( "https://api.covidtracking.com/v1/states/current.json");
      const dataRes = await dataReq.json();
      //console.log(dataRes);

      for (let i = 0; i < dataRes.length; i++) {
        covidCases.push(dataRes[i].positive);
        timePeriod.push(dataRes[i].date);
        lethal.push(dataRes[i].death);
        
      }

      setPositiveCases(covidCases);
      setTime(timePeriod);
      setLethal(lethal); 
    };
        getSocialrecord();
      }, []);

  return (
    
    <React.Fragment >
      <p>{title} </p>
      <div className="container-fluid mt-3 mb-3" >
         

        <Chart 
          type="line"
          width={1100}
          height={700}
          series={[
            
            {
              name: "Positive Cases",
              data: positiveCases
            },
          
          
            {
              name: "Deaths",
              data: lethal
            }
            
            
          ]}
          
          options={{
            stroke:{
              width: [8,8]
              
            },
            title: {
              text: "COVID 19 Positive Cases",
              style: { fontSize: 30 }
            },

            subtitle: {
              text: "This is LineChart Graph",
              style: { fontSize: 18 }
            },

            colors: ["#FF1654", "#247BA0"],
            theme: { mode: "light" },

            xaxis: {

              tickPlacement: "on",
              categories: time,

              title: {
                text: "Period of Time",
                style: { color: "#f90000", fontSize: 30 }
              }
            },

            yaxis: {
              labels: {
                formatter: (val) => {
                  return `${val}`;
                },
                style: { fontSize: "15", colors: ["#247BA0"] }
              },
              title: {
                text: "Positive Cases",
                style: { color: "#f90000", fontSize: 15 }
              }
            },

            legend: {
              show: true,
              position: "right"
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#247BA0"],
                fontSize: 15
              }
            }
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
}

export default LineChart;

