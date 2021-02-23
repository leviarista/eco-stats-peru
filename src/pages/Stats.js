import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Stats = () => {

    const [graphicOptions, setGraphicOptions] = useState(
        {
            title: {
                text: "Temperature, in degrees Celsius",
            },
            grid: { top: 45, right: 10, bottom: '20%', left: 55 },
            legend: {
                // type: "scroll",
                // data: ['BCM 2.0', 'CSIRO Mark 3.5', 'ECHAM 4.6', 'CGCM 3.1 (T47)', 'CNRM CM3', 'GFDL CM2.0', 'GFDL CM2.1', 'IPSL-CM4', 'MIROC 3.2 (medres)', 'ECHO-G', 'ECHAM5/MPI-OM', 'MRI-CGCM2.3.2', 'INMCM3.0', 'UKMO HadCM3', 'UKMO HadGEM1',],
                data: ['bccr_bcm2_0', 'csiro_mk3_5', 'ingv_echam4', 'cccma_cgcm3_1', 'cnrm_cm3', 'gfdl_cm2_0', 'gfdl_cm2_1', 'ipsl_cm4', 'microc3_2_medres', 'miub_echo_g', 'mpi_echam5', 'mri_cgcm2_3_2a', 'inmcm3_0', 'ukmo_hadcm3', 'ukmo_hadgem1',],
                bottom: 0,
            },
            toolbox: {
                show: true,
                feature: {
                    // dataZoom: {
                    //     yAxisIndex: 'none'
                    // },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                data: ['1920-1939', '1940-1959', '1960-1979', '1980-1999', '1999-2020', '2020-2039', '2040-2059', '2060-2079', '2080-2099'],
            },
            yAxis: {
                type: 'value',
                // inverse: true,
                // barGap: "50%"
                min: function (value) {
                    return value.min - 3;
                },
                max: function (value) {
                    return value.max + 1;
                },
                axisLabel: {
                    formatter: '{value}°C'
                }
            },
            series: [],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: "shadow"
                }
            },
        }
    )

    useEffect(() => {
        // Make a request for a user with a given ID
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
            .then(function (response) {
                // handle success
                // console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [])

    const handleClick = async () => {

        let newOptions = {
            title: {
                text: "Temperature by GCM (General Circulation Model)",
            },
            // grid: { top: 8, right: 8, bottom: 24, left: 36 },
            legend: {
                // type: "scroll",
                // data: ['BCM 2.0', 'CSIRO Mark 3.5', 'ECHAM 4.6', 'CGCM 3.1 (T47)', 'CNRM CM3', 'GFDL CM2.0', 'GFDL CM2.1', 'IPSL-CM4', 'MIROC 3.2 (medres)', 'ECHO-G', 'ECHAM5/MPI-OM', 'MRI-CGCM2.3.2', 'INMCM3.0', 'UKMO HadCM3', 'UKMO HadGEM1',],
                data: ['bccr_bcm2_0', 'csiro_mk3_5', 'ingv_echam4', 'cccma_cgcm3_1', 'cnrm_cm3', 'gfdl_cm2_0', 'gfdl_cm2_1', 'ipsl_cm4', 'microc3_2_medres', 'miub_echo_g', 'mpi_echam5', 'mri_cgcm2_3_2a', 'inmcm3_0', 'ukmo_hadcm3', 'ukmo_hadgem1',],
                // bottom: "5%",
            },
            toolbox: {
                show: true,
                feature: {
                    // dataZoom: {
                    //     yAxisIndex: 'none'
                    // },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                data: ['1920-1939', '1940-1959', '1960-1979', '1980-1999', '1999-2020', '2020-2039', '2040-2059', '2060-2079', '2080-2099'],
            },
            yAxis: {
                type: 'value',
                // inverse: true,
                // barGap: "50%"
                min: function (value) {
                    return value.min - 3;
                },
                max: function (value) {
                    return value.max + 3;
                },
                axisLabel: {
                    formatter: '{value}°C'
                }
            },
            series: [],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: "shadow"
                }
            },
        };

        let url = [
            `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/1920/1939/PER.json`,
            `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/1940/1959/PER.json`,
            `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/1960/1979/PER.json`,
            `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/1980/1999/PER.json`,
            `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/2000/2019/PER.json`,
            `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/2020/2039/PER.json`,
            `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/2040/2059/PER.json`,
            `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/2060/2079/PER.json`,
            `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/2080/2099/PER.json`,
        ];
        // console.log(url)
        const response_data_0 = await axios.get(url[0]);
        const response_data_1 = await axios.get(url[1]);
        const response_data_2 = await axios.get(url[2]);
        const response_data_3 = await axios.get(url[3]);
        const response_data_4 = await axios.get(url[4]);
        const response_data_5 = await axios.get(url[5]);
        const response_data_6 = await axios.get(url[6]);
        const response_data_7 = await axios.get(url[7]);
        const response_data_8 = await axios.get(url[8]);

        for (let i = 0; i < 15; i++) {

            let data_tmp = [];

            data_tmp.push(response_data_0.data[i]?.annualData[0]?.toFixed(2));
            data_tmp.push(response_data_1.data[i]?.annualData[0]?.toFixed(2));
            data_tmp.push(response_data_2.data[i]?.annualData[0]?.toFixed(2));
            data_tmp.push(response_data_3.data[i]?.annualData[0]?.toFixed(2));
            data_tmp.push(response_data_4.data[i]?.annualData[0]?.toFixed(2));
            data_tmp.push(response_data_5.data[i]?.annualData[0]?.toFixed(2));
            data_tmp.push(response_data_6.data[i]?.annualData[0]?.toFixed(2));
            data_tmp.push(response_data_7.data[i]?.annualData[0]?.toFixed(2));
            data_tmp.push(response_data_8.data[i]?.annualData[0]?.toFixed(2));

            newOptions.series.push({
                name: response_data_0.data[i]?.gcm,
                data: data_tmp,
                type: 'bar',
                // smooth: true,
                // seriesLayoutBy: "row"
            });

        }

        // const response_data_2 = await axios.get(url[1]);
        // let data_tas_2 = [];
        // for (let i = 0; i < response_data_2.data.length; i++) {
        //     data_tas_2.push(response_data_2.data[i].annualData[0]);
        // }
        // newOptions.series.push({
        //     name: 'CSIRO Mark 3.5',
        //     data: data_tas_2,
        //     type: 'bar',
        // })


        setGraphicOptions(newOptions)
    }

    return (
        <div className="stats-container">
            <header>
                <h2>Ecological Statistics in Perú</h2>
            </header>

            <section className="title">
                <h4>
                    <b>Statistics about </b>
                    <select name="type">
                        <option value="Temperature by GCM">Temperature by GCM</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                    <b> in Perú </b>
                </h4>
            </section>

            <section className="description">
                <p>
                    <b>Source:</b>
                    <span>Open Data Org</span>
                </p>
                <p>
                    <b>API url:</b>
                    <a href="#">https://opendata.org/gas-emissions/</a>
                </p>
                <p>
                    <b>About:</b>
                    <span>This graphic shows gas emission per year since 1995 until 2005. Data is represented in CO2 cubic meters per year, taking data from installed stations thtat collected data about this kind of gas emissions in Perú.</span>
                </p>
            </section>

            <section className="graphic">
                <a href="#" className="button button-main button-main-yellow" onClick={() => handleClick()}>
                    Test API
                </a>
                <br />
                <ReactECharts option={graphicOptions} style={{ height: '350px', minHeight: '50%', width: '100%' }} />
            </section>
        </div>
    )
}

export default Stats
