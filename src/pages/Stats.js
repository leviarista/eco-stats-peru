import React, { useEffect, useRef, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Stats = () => {

    const [pageState, setPageState] = useState("initial")

    const [description, setDescription] = useState({
        source: "",
        url: "",
        about: ".",
    })

    // Graphic Data
    const [graphicOptions, setGraphicOptions] = useState({});

    const handleClick = async (type) => {

        setPageState("loading")

        try {

            let newOptions = {};

            switch (type) {
                case "TemperatureByGCM":
                    newOptions = await TemperatureByGCM(setDescription, newOptions, setGraphicOptions, setPageState);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                case "PrecipitationByGCM":
                    newOptions = await PrecipitationByGCM(setDescription, newOptions, setGraphicOptions, setPageState);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                default:
                    break;
            }


        } catch (error) {

            setPageState("error")

            console.log(error)
        }
    }

    return (
        <div className="stats-container">

            <header>
                <h4>
                    <b>Statistics about </b>
                    <select name="type" onChange={(e) => handleClick(e.target.value)}>
                        <option > [select something] </option>
                        <option value="TemperatureByGCM">Temperature by GCM</option>
                        <option value="PrecipitationByGCM">Precipitation By GCM</option>
                    </select>
                    <b> in Perú </b>
                </h4>
            </header>

            <section className="graphic">

                {pageState !== "" ? (
                    <div className="default-message">
                        {pageState === "initial" && "Please select an option from the above"}
                        {pageState === "loading" && "Loading data ..."}
                        {pageState === "error" && "Error"}
                    </div>
                ) : (
                        <ReactECharts
                            option={graphicOptions}
                            style={{ height: '350px', minHeight: '50%', width: '100%' }}
                        />
                    )}
            </section>

            <section className="description">
                <p>
                    <b>Source:</b>
                    <span>{description.source}</span>
                </p>
                <p>
                    <b>URL:</b>
                    <a href={description.url} target="_blank" rel="noopenner noreferrer">{description.url && "Go to website"}</a>
                </p>
                <p>
                    <b>About:</b>
                    <span>{description.about}</span>
                </p>
            </section>

        </div>
    )
}

export default Stats

async function TemperatureByGCM(setDescription, newOptions, setGraphicOptions, setPageState) {

    setDescription({
        source: "The World Bank Group Organization",
        url: "https://datahelpdesk.worldbank.org/knowledgebase/articles/902061-climate-data-api",
        about: "This graph shows information about the temperature in Peru, in degrees Celsius, for periods of 20 years, according to different GCM (General Circulation Model), with past data and future projections.",
    });

    newOptions = {
        title: {
            text: "Temperature by GCM (General Circulation Model) [Perú]",
            subtext: "In Celsius degrees by periods of 20 years",
            textStyle: {
                color: "black",
                fontSize: 14,
            },
            left: 0,
            top: 0,
        },
        grid: { top: 55, right: 10, bottom: '30%', left: 55 },
        legend: {
            show: true,
            // type: "scroll",
            data: ['BCM 2.0', 'CSIRO Mark 3.5', 'ECHAM 4.6', 'CGCM 3.1 (T47)', 'CNRM CM3', 'GFDL CM2.0', 'GFDL CM2.1', 'IPSL-CM4', 'MIROC 3.2 (medres)', 'ECHO-G', 'ECHAM5/MPI-OM', 'MRI-CGCM2.3.2', 'INMCM3.0', 'UKMO HadCM3', 'UKMO HadGEM1',],
            // data: ['bccr_bcm2_0', 'csiro_mk3_5', 'ingv_echam4', 'cccma_cgcm3_1', 'cnrm_cm3', 'gfdl_cm2_0', 'gfdl_cm2_1', 'ipsl_cm4', 'microc3_2_medres', 'miub_echo_g', 'mpi_echam5', 'mri_cgcm2_3_2a', 'inmcm3_0', 'ukmo_hadcm3', 'ukmo_hadgem1',],
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
            show: true,
            type: 'category',
            data: ['1920-1939', '1940-1959', '1960-1979', '1980-1999', '1999-2020', '2020-2039', '2040-2059', '2060-2079', '2080-2099'],
            offset: 10
        },
        yAxis: {
            show: true,
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

        const getSerieName = (name) => {
            switch (name) {
                case 'bccr_bcm2_0': return 'BCM 2.0';
                case 'csiro_mk3_5': return 'CSIRO Mark 3.5';
                case 'ingv_echam4': return 'ECHAM 4.6';
                case 'cccma_cgcm3_1': return 'CGCM 3.1 (T47)';
                case 'cnrm_cm3': return 'CNRM CM3';
                case 'gfdl_cm2_0': return 'GFDL CM2.0';
                case 'gfdl_cm2_1': return 'GFDL CM2.1';
                case 'ipsl_cm4': return 'IPSL-CM4';
                case 'miroc3_2_medres': return 'MIROC 3.2 (medres)';
                case 'miub_echo_g': return 'ECHO-G';
                case 'mpi_echam5': return 'ECHAM5/MPI-OM';
                case 'mri_cgcm2_3_2a': return 'MRI-CGCM2.3.2';
                case 'inmcm3_0': return 'INMCM3.0';
                case 'ukmo_hadcm3': return 'UKMO HadCM3';
                case 'ukmo_hadgem1': return 'UKMO HadGEM1';
                default: return '';
            }
        };

        newOptions.series.push({
            // name: response_data_0.data[i]?.gcm,
            name: getSerieName(response_data_0.data[i]?.gcm),
            data: data_tmp,
            type: 'bar',
        });

    }

    return newOptions;
}

async function PrecipitationByGCM(setDescription, newOptions, setGraphicOptions, setPageState) {

    setDescription({
        source: "The World Bank Group Organization",
        url: "https://datahelpdesk.worldbank.org/knowledgebase/articles/902061-climate-data-api",
        about: "This graph shows information about the Precipitation (rainfall and assumed water equivalent) in Peru, in millimeters, for periods of 20 years, according to different GCM (General Circulation Model), with past data and future projections.",
    });

    newOptions = {
        title: {
            text: "Precipitation (rainfall and assumed water equivalent) by GCM (General Circulation Model) [Perú]",
            subtext: "In millimeters by periods of 20 years",
            textStyle: {
                color: "black",
                fontSize: 14,
            },
            left: 0,
            top: 0,
        },
        grid: { top: 55, right: 10, bottom: '30%', left: 80 },
        legend: {
            show: true,
            // type: "scroll",
            data: ['BCM 2.0', 'CSIRO Mark 3.5', 'ECHAM 4.6', 'CGCM 3.1 (T47)', 'CNRM CM3', 'GFDL CM2.0', 'GFDL CM2.1', 'IPSL-CM4', 'MIROC 3.2 (medres)', 'ECHO-G', 'ECHAM5/MPI-OM', 'MRI-CGCM2.3.2', 'INMCM3.0', 'UKMO HadCM3', 'UKMO HadGEM1',],
            // data: ['bccr_bcm2_0', 'csiro_mk3_5', 'ingv_echam4', 'cccma_cgcm3_1', 'cnrm_cm3', 'gfdl_cm2_0', 'gfdl_cm2_1', 'ipsl_cm4', 'microc3_2_medres', 'miub_echo_g', 'mpi_echam5', 'mri_cgcm2_3_2a', 'inmcm3_0', 'ukmo_hadcm3', 'ukmo_hadgem1',],
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
            show: true,
            type: 'category',
            data: ['1920-1939', '1940-1959', '1960-1979', '1980-1999', '1999-2020', '2020-2039', '2040-2059', '2060-2079', '2080-2099'],
            offset: 10
        },
        yAxis: {
            show: true,
            type: 'value',
            // inverse: true,
            // barGap: "50%"
            min: function (value) {
                return value.min - 5;
            },
            max: function (value) {
                return value.max + 5;
            },
            axisLabel: {
                formatter: '{value}mm'
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
        `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/1920/1939/PER.json`,
        `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/1940/1959/PER.json`,
        `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/1960/1979/PER.json`,
        `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/1980/1999/PER.json`,
        `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/2000/2019/PER.json`,
        `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/2020/2039/PER.json`,
        `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/2040/2059/PER.json`,
        `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/2060/2079/PER.json`,
        `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/2080/2099/PER.json`,
    ];

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

        const getSerieName = (name) => {
            switch (name) {
                case 'bccr_bcm2_0': return 'BCM 2.0';
                case 'csiro_mk3_5': return 'CSIRO Mark 3.5';
                case 'ingv_echam4': return 'ECHAM 4.6';
                case 'cccma_cgcm3_1': return 'CGCM 3.1 (T47)';
                case 'cnrm_cm3': return 'CNRM CM3';
                case 'gfdl_cm2_0': return 'GFDL CM2.0';
                case 'gfdl_cm2_1': return 'GFDL CM2.1';
                case 'ipsl_cm4': return 'IPSL-CM4';
                case 'miroc3_2_medres': return 'MIROC 3.2 (medres)';
                case 'miub_echo_g': return 'ECHO-G';
                case 'mpi_echam5': return 'ECHAM5/MPI-OM';
                case 'mri_cgcm2_3_2a': return 'MRI-CGCM2.3.2';
                case 'inmcm3_0': return 'INMCM3.0';
                case 'ukmo_hadcm3': return 'UKMO HadCM3';
                case 'ukmo_hadgem1': return 'UKMO HadGEM1';
                default: return '';
            }
        };

        newOptions.series.push({
            // name: response_data_0.data[i]?.gcm,
            name: getSerieName(response_data_0.data[i]?.gcm),
            data: data_tmp,
            type: 'bar',
        });

    }

    return newOptions;
}
