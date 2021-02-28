import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';

const Stats = () => {

    const [pageState, setPageState] = useState("initial")

    const [description, setDescription] = useState({
        source: "",
        url: "",
        apiDoc: "",
        about: "",
    })

    // Graphic Data
    const [graphicOptions, setGraphicOptions] = useState({});

    const handleClick = async (type) => {

        setPageState("loading")

        try {

            let newOptions = {};

            switch (type) {
                case "TemperatureByGCM":
                    newOptions = await TemperatureByGCM(setDescription, newOptions);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                case "PrecipitationByGCM":
                    newOptions = await PrecipitationByGCM(setDescription, newOptions);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                case "CO2EmissionsKT":
                    newOptions = await CO2EmissionsKT(setDescription, newOptions);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                case "CO2EmissionsKTvsPopulation":
                    newOptions = await CO2EmissionsKTvsPopulation(setDescription, newOptions);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                case "ThreatenedSpecies":
                    newOptions = await ThreatenedSpecies(setDescription, newOptions);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                case "ForestAreaPercentage":
                    newOptions = await ForestAreaPercentage(setDescription, newOptions);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                case "ForestAreaKm":
                    newOptions = await ForestAreaKm(setDescription, newOptions);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                case "TerrestrialAndMarineProtectedAreas":
                    newOptions = await TerrestrialAndMarineProtectedAreas(setDescription, newOptions);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                case "AveragePrecipitationInDepth":
                    newOptions = await AveragePrecipitationInDepth(setDescription, newOptions);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                case "EnergyUseKgOilPerCapita":
                    newOptions = await EnergyUseKgOilPerCapita(setDescription, newOptions);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                case "AirPollutionAnnualExposure":
                    newOptions = await AirPollutionAnnualExposure(setDescription, newOptions);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                case "AirPollutionExposedPopulation":
                    newOptions = await AirPollutionExposedPopulation(setDescription, newOptions);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                case "TotalNaturalResourcesRents":
                    newOptions = await TotalNaturalResourcesRents(setDescription, newOptions);
                    setGraphicOptions(newOptions);
                    setPageState("");
                    break;
                default:
                    setPageState("initial")
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
                        {/* <option value="TemperatureByGCM">Temperature by GCM</option>
                        <option value="PrecipitationByGCM">Precipitation By GCM</option> */}
                        <option value="CO2EmissionsKT">CO2 emissions (kt)</option>
                        <option value="CO2EmissionsKTvsPopulation">CO2 emissions (kt) vs Population</option>
                        <option value="ThreatenedSpecies">Threatened species</option>
                        <option value="ForestAreaPercentage">Forest area (% of land area)</option>
                        <option value="ForestAreaKm">Forest area (sq. km)</option>
                        <option value="TerrestrialAndMarineProtectedAreas">Terrestrial and marine protected areas (%)</option>
                        <option value="AveragePrecipitationInDepth">Average precipitation in depth</option>
                        <option value="EnergyUseKgOilPerCapita">Energy use (kg of oil equivalent per capita)</option>
                        <option value="AirPollutionAnnualExposure">PM2.5 air pollution, annual exposure</option>
                        <option value="AirPollutionExposedPopulation">PM2.5 air pollution, population exposed</option>
                        <option value="TotalNaturalResourcesRents">Total natural resources rents (% of GDP)</option>
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
                    <b>API Doc:</b>
                    <a href={description.apiDoc} target="_blank" rel="noopenner noreferrer">{description.apiDoc && "Go to API Documentation"}</a>
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

async function TemperatureByGCM(setDescription, newOptions) {

    setDescription({
        source: "The World Bank Group Organization",
        apiDoc: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
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
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/1920/1939/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/1940/1959/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/1960/1979/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/1980/1999/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/2000/2019/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/2020/2039/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/2040/2059/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/2060/2079/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/tas/2080/2099/PER.json`,
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

async function PrecipitationByGCM(setDescription, newOptions) {

    setDescription({
        source: "The World Bank Group Organization",
        apiDoc: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
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
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/1920/1939/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/1940/1959/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/1960/1979/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/1980/1999/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/2000/2019/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/2020/2039/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/2040/2059/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/2060/2079/PER.json`,
        `https://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/2080/2099/PER.json`,
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

async function CO2EmissionsKT(setDescription, newOptions) {

    setDescription({
        source: "The World Bank Group Organization",
        apiDoc: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
        url: "https://data.worldbank.org/indicator/EN.ATM.CO2E.KT?locations=PE&view=chart",
        about: "This graph shows information about CO2 emissions in Peru, in Kt, per year. Data from Carbon Dioxide Information Analysis Center, Environmental Sciences Division, Oak Ridge National Laboratory, Tennessee, United States.",
    });

    newOptions = {
        title: {
            text: "CO2 emissions (kt) [Perú]",
            subtext: "In kt per year",
            textStyle: {
                color: "black",
                fontSize: 14,
            },
            left: 0,
            top: 0,
        },
        grid: { top: 75, right: 10, bottom: '30%', left: 20 },
        legend: {
            show: true,
            bottom: 0,
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            show: true,
            type: 'category',
            data: ['1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            offset: 10
        },
        yAxis: {
            show: true,
            type: 'value',
            min: function (value) {
                return value.min - 5;
            },
            max: function (value) {
                return value.max + 5;
            },
            offset: 10,
            name: 'kt',
            axisLabel: {
                formatter: value => (value / 1000).toFixed(0),
                align: 'left'
            },
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
        `https://api.worldbank.org/v2/country/per/indicator/EN.ATM.CO2E.KT?format=json`,
    ];

    const { data } = await axios.get(url[0]);

    let data_tmp = [];

    for (let i = (data[1].length - 1); i >= 0; i--) {
        data_tmp.push(data[1][i].value?.toFixed(2));
    }
    newOptions.series.push({
        name: 'CO2 emissions per year (kt)',
        data: data_tmp,
        type: 'line',
    });

    return newOptions;
}

async function CO2EmissionsKTvsPopulation(setDescription, newOptions) {

    setDescription({
        source: "The World Bank Group Organization",
        apiDoc: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
        url: "https://data.worldbank.org/indicator/EN.ATM.CO2E.KT?locations=PE&view=chart",
        about: "This graph shows information about CO2 emissions in Peru, in Kt, per year. Data from Carbon Dioxide Information Analysis Center, Environmental Sciences Division, Oak Ridge National Laboratory, Tennessee, United States.",
    });

    newOptions = {
        title: {
            text: "CO2 emissions (kt) vs Population [Perú]",
            // subtext: "CO2 emissions (kt) vs Population",
            textStyle: {
                color: "black",
                fontSize: 14,
            },
            left: 0,
            top: 0,
        },
        grid: { top: 75, right: 30, bottom: '30%', left: 30 },
        legend: {
            show: true,
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
            data: ['1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            offset: 10
        },
        yAxis: [
            {
                show: true,
                type: 'value',
                name: 'kt',
                axisLabel: {
                    formatter: value => (value / 1000).toFixed(0),
                    align: 'left'
                },
                padding: 10
            },
            {
                show: true,
                type: 'value',
                name: 'Million',
                axisLabel: {
                    formatter: value => (value / 1000000).toFixed(0),
                }
            },
            {
                show: true,
            }
        ],
        series: [],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: "shadow"
            }
        },
    };

    let url = [
        `https://api.worldbank.org/v2/country/per/indicator/EN.ATM.CO2E.KT?format=json`,
        `https://api.worldbank.org/v2/country/per/indicator/SP.POP.TOTL?format=json`,
    ];

    const { data } = await axios.get(url[0]);

    let data_tmp = [];

    for (let i = (data[1].length - 1); i >= 0; i--) {
        data_tmp.push(data[1][i].value?.toFixed(2));
    }
    newOptions.series.push({
        name: 'CO2 emissions',
        data: data_tmp,
        type: 'line',
        yAxisIndex: 0,
    });

    {
        const { data } = await axios.get(url[1]);

        data_tmp = [];

        for (let i = (data[1].length - 1); i >= 0; i--) {
            data_tmp.push(data[1][i].value?.toFixed(2));
        }
    }

    newOptions.series.push({
        name: 'Population',
        data: data_tmp,
        type: 'bar',
        yAxisIndex: 1,
    });

    return newOptions;
}

async function ThreatenedSpecies(setDescription, newOptions) {

    setDescription({
        source: "The World Bank Group Organization",
        apiDoc: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
        url: "https://data.worldbank.org/indicator/EN.HPT.THRD.NO?locations=PE&view=chart",
        about: "This graph shows information about threatened Species of plants, fish, mammals and birds in Peru, in 2018. Data from United Nations Environmental Program and the World Conservation Monitoring Centre, and International Union for Conservation of Nature, Red List of Threatened Species; Froese, R. and Pauly, D. ( eds ). 2008. FishBase database, fishbase.org; United Nations Environmental Program and the World Conservation Monitoring Centre, and International Union for Conservation of Nature, Red List of Threatened Species; and United Nations Environmental Program and the World Conservation Monitoring Centre, and International Union for Conservation of Nature, Red List of Threatened Species.",
    });

    newOptions = {
        title: {
            text: "Threatened Species in 2018 [Perú]",
            subtext: "Plant, Fish, Mammal and Bird Species",
            textStyle: {
                color: "black",
                fontSize: 14,
            },
            left: 0,
            top: 0,
        },
        // grid: { top: 0, right: 0, bottom: 0, left: 40 },
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            show: true,
            type: 'category',
            data: ['Plants', 'Fish', 'Mammals', 'Birds'],
            axisTick: { show: false },
            axisLine: { show: false },
        },
        yAxis: [
            {
                // splitLine: {show: false},
                // axisTick: {show: false},
                // axisLine: {show: false},
                // axisLabel: {show: false},
                max: 500
            },
        ],
        series: [],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: "shadow"
            },
            formatter: function (params) {
                return params[0].name + ': ' + params[0].value;
            }
        },
        color: ['#F0A70A'],
    };

    let url = [
        `https://api.worldbank.org/v2/country/per/indicator/EN.HPT.THRD.NO?format=json`,
        `https://api.worldbank.org/v2/country/per/indicator/EN.FSH.THRD.NO?format=json`,
        `https://api.worldbank.org/v2/country/per/indicator/EN.MAM.THRD.NO?format=json`,
        `https://api.worldbank.org/v2/country/per/indicator/EN.BIR.THRD.NO?format=json`,
    ];

    let data_tmp = [];

    const { data } = await axios.get(url[0]);
    for (let i = (data[1].length - 1); i >= 0; i--) {
        if (data[1][i].value !== null)
            data_tmp.push(data[1][i].value);
    }
    {
        const { data } = await axios.get(url[1]);
        for (let i = (data[1].length - 1); i >= 0; i--) {
            if (data[1][i].value !== null)
                data_tmp.push(data[1][i].value);
        }
    }
    {
        const { data } = await axios.get(url[2]);
        for (let i = (data[1].length - 1); i >= 0; i--) {
            if (data[1][i].value !== null)
                data_tmp.push(data[1][i].value);
        }
    }
    {
        const { data } = await axios.get(url[3]);
        for (let i = (data[1].length - 1); i >= 0; i--) {
            if (data[1][i].value !== null)
                data_tmp.push(data[1][i].value);
        }
    }

    newOptions.series.push({
        name: 'Threatened Species in 2018',
        data: data_tmp,
        type: 'pictorialBar',
        symbol: 'path://M10,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        itemStyle: {
            opacity: 0.5
        },
        emphasis: {
            itemStyle: {
                opacity: 1
            }
        },
        z: 10
    });

    newOptions.series.push(
        {
            name: 'glyph',
            type: 'pictorialBar',
            barGap: '-100%',
            symbolPosition: 'end',
            symbolSize: 50,
            symbolOffset: [0, '-120%'],
            data: [{
                value: data_tmp[0],
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAO5SURBVHgBzVjdcdpAEN49foLth6AKIlcQ3AGuwLxiTwaoIE4FNhXEqQA8GczkKaYCSAWmA5MKRDJjAtjcZu8AWRL6ASHN+JsxlhC3993u3rd7AkgZ4+7Bo9UtlCEmspAirLvDCv8zQQoTYkJAikABteWFLEJMpEaQw2oCQUXfEL49giChbF/jGySIAmv2JEjvISZSIajDC1iGBJD1My4w81k+L3rGp+kA4kCFN6Gl+5kxiegSs6I/7h4+/uketqzvu+mYM7wKUsJviIlNgtPC0HFnEkDdQfbKahWjE56w5LpHGEJMbBA0GuMxy4OfQUX2GgvzB6uTKwUZ1AtAcC9ilh9AUgQVCPBXyBgTRe7h74+jmu/T7NRFHgHaetFJEgRc3EMEpKT2NjVWgryFPeBPUOUhQeSqEcXPjZwUXHvXz5X3qjGVwDbnAxUSIvgGUSAoisL8a8DTEXuvCXsCgx4oz2Bh9sA/MSECNM0balF6zMG8z3E1CeUJe28EeyJQTrUXgU63CTW8m9W1MeVN9mpS5BQw6gdKUhBz/Q3pcIAX0uPPSwTxyArQMKpPbV9bLPgilzkjkhU7MsoBgga0ED2Y5+69Oz6SoDbM5Q8B+yHhHtGLbChBX4fbNV6HftZiAa9ABNTGkgQ943xyv7rfHky0zkSv/IiSZIJCtIrVCXrGRC3OH+xZFNTeiaBj0rIqZwLxI4fX1KUNda6aXoLqTBKHHH+OOPSjWAQ3CDvy1ElQ1W5VHqMt0IhIqDwe8PFg6NxgiRyajIvnodXJfGHhbrmmBaoHZhF7iTfUrapaYWKe2qlu2aKhCX7EkIvALH+zTY3O+hrOcE6tDzpI3N28DJSXYAeIrKiRlxshE8tdL4lNtjGzJGjrk+SQrPXOjgxfYI6TPTciiU3jwl/jvODwlh1GRgSyYZzvXpeF2mVav7iLDhNj0G0WtVTjujxzBMMZXvbiLWvjSdymQfBKmxzGyPbKRRRFaNOqwrsi1zSqk/o+/aAdg5VXykFC7DOSO57Xmmt1WMRZqPViuWKsyF3DnrCbBTUR/7WL1X/HKl+UNoWO5KaAF9Pa/B5LPP40CXIugk68EoWIfg7LVueo7vxmSW6/JhWiCK6hvMATHod5E4Wsucck02atEXm8VhNqbyoN8wV7cZujaExsff43zp8uA0OefzIhJez0gkKHXD6fbIY8X4KUsPMbFFXy9FEgapcnhFiveLx5iRl5JoT4AClg737Q22V7G9Y3A+vu6IbrNEHCSO4FJi1iv8EKw38o/7EXShPjGAAAAABJRU5ErkJggg==',
                symbolSize: [40, 40]
            }, {
                value: data_tmp[1],
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH/SURBVHgB7ZbBVdtAEIb/GewXyResCiIqiNNB6IAcbQ7gCuxUEFwBcQWYAza3PCqIUwFKBVEHWg5gHEc7mbUBE+KE8KRH/PL2O612V7uz/47+EeDxeDwej+dfQiiJ7Khe5+Bbx7U3m1c9lEQFJcHh7L0Iuq5tTsOGTF60o7YxKAijBLJhbUdEuncdQjsUTD+iBDgbBTEKQiSdFb1vLk7DQ3f1KACZUU00EQcWthc1r1M8keyk2iCunj86kZCotKnk9AUkBrkk+B4kj6WBBhh+cqfVdqrX1I9akw/3J+j4V5XI6MJ9IAdvbLyCSF1P1YBFrBsXUmgZOJ+B8/FDkSgbhl0iOrzrERiwjAmc2lwuiNApHMSTkLFYPo52LweLAEfBvgZzhPUjFdjtuQ+aYS17XpX+mrSSnQT7axfcTZrpN3HGxLT3cFCE+mq6b1XiLQFvz1947hgtPusHM6ioqTZuC97cbugXu0k1BVYtoXMoRtmBqTiYVg9u7YcX16tyakJqDW2v8kJVs798cArLu3pzsrVQ2LZ1/LiQym5NoOfWi1qX3fveWBE7ex3tzpI/LqBe5YJSg00wXZrrzWEGWjE29eR7ywPpXHBMbF/q5i6/458DIqP2lVgRZ9pJ1Loe/37rEnDlTGvvubtyp0TUvDrAuuFKnvtpgMfj8Xg8nv+KH8gv82t7SknoAAAAAElFTkSuQmCC',
                symbolSize: [40, 40]
            }, {
                value: data_tmp[2],
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALRSURBVHgB7VddXtpAEJ/ZikR8MDlB0xPIDYo3sI/ah8oJkBMgJyg9AfKA8GZ7ArmB3KC5QcKDErDsdHZDQkJAQcHy+zX/h3zMTmb/u/OVBciQIUOG/xu4ipLbNE0A3wzfrbLvwAYw6B5U5DDfssqeB+sSVKSEMa4QUInVSmkNcvjisAUPQThyQgMA6cwsCw8mcunEIofHRNjI70vbf4RPICae9fWpP6+3lyLWMWwEbAKMS/TsGtDmiw2sxItgPnraOesCloEC4zAaiT7ugcmvJwBPKb2EhUGnUOPd+L14x7YEBDO4iaZ7UzhND0PgTjRGt+9KbAmY0NXR2WM99g7gdQv37KUi7AqQftIwX1bJg4Pu4XciuoTdg0MgTwSRPIXdhE5WMc3G3QRiUZCEOvwLEHCNpN4zYw7fzSCLO4UrfqjBO4Hnupb+fjXsIKr26gHf8GKyCwHic1SF3ZuDS/Z5LaxLWwHvDCFWrbOH61U/SbQJt50rIubutkWS+015HXIKiU6ieiG3ra3EJPfdH+uSUxBr6qvaVFaT6QDXwfwyNLnzh1fV2qSLgx+Fu2WlZ5GL3DYnmFieYNwEqtb5sAGvhEiynSenf6nCQW+hixC3l1SQcjHa4ZNaOcdjGWaC/mITFCfopOuqsOENmCMY7JiqU8ot1pkfxRnvrrPIACJ9jL4GrMN4v5GITZQ2bIwgot4lCbI1mxR+BTKyXrDlqBBQhTZeCXhhx7ApguyeQfAgzJiwF0wER0ts2FpN7d4UOikIwpCwgzPNBgiGQEHfVNHWL5LPHVqIRbd9eJFSpiBJBMrjpFh+icLjYNSM2tnbCE4TgfAURe5ek/xj9Pn80NKN+wNV3M4cSQy+4Vp3qdplKOb4dcLw0PZQ3EaLXgOpExGvtISIFST0OBbraqKp3OabrRMnrq/clx9daKK+0Y8fISPXGr765+yFtjJkyJAhw+r4CyTENS0D74OkAAAAAElFTkSuQmCC',
                symbolSize: [40, 40]
            }, {
                value: data_tmp[3],
                symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMeSURBVHgBzVhdVtpQEJ65gkT6ElYgrqDuoLAC8VH7oKwAXYG4AnUF6oOlLz3HHZgdNK6g6QoSH4qB02Y6c0sgAoH8UfM9QDL3cvky/xOAkgOhpHAfqvuoKlcKSgb31jRfBvULVNXvROq5VBp0H4xTRHXFdjX51jGPhnsVeGeIxqA2YmLQY49rTsQOQdCWi3cj6N4aTWWoE6LxGSCa0TUiOG8c+45c/1eCQgpq2GFtHbC2WiTCOSdj2WXjePgY3qfyQW2Oir8Pvw270fW8RPtr45ZS+Iko6ERMuBSa3NGwH5UlIugOjCYC3spTR354F/jb5/NEhZQyxj0CakX3r8MycoK1Jtb5iNTTJLKiB56iMWryZTuUvXzd6VEw7vOamcY4ceQEK/Og/CFidYHcDNhi7bb0Xs5dRHgdvzeGHNF5HDn9D8uEYRZPZiKy2PwWa6EPaUDgEQaHjSPfWrVtSjAMAKxiDwg7cgAgeescOxMQbA4aIees3RomSiZlTgg5gIEd/bE7qPf5SS6gCIjmAO/Ztp5SsKtFSCbLTZ0PWU5+7TAMPnQf6n1Qwd26p/EGO09pojITd8IbGFX70cxQEdZJVM1p4xI3RpAsOZ+rhzW/ok2cJOkKCtViaGr887gqUNJVEk4pCJwTM5DhT4dLnB0QPbOv2+uiNxNBgfvlwzUi9VZskU6kK99yk8R9ViF9s8BODMboIC798BNbZkLtJEHqjlr8lR26G7dOCB0oEJlafvEfqZ9LFzmfheWvCGSeSaR+cmN5v2yN01ExSR1yENQYbZ+xxuzFhVkTkRe5CGp/5ILPdnUWFmmrEF8sZKqbNLRPbyIbORG/bu8lLQJxKGQullzHkd1+o0kp/gaPBzlR2OA+Ixk9XJ1AThT6ZkFXDYTpRFZETiz81Qc3ojezGzBfvxm7kAOFE9RNwL/mQMP3t9qQA5t5eaTAml4j5AqUjRCkAH+G14jBR8iBzWiQaJb7EMunQZ5xrGkJlOZBBrOsR8EGoLsdwq7MGlogU2NGbOwNa+PzL1vGR93xILSgrJA67Q3qP6DMkGkwjx+WGn8BRsNVBuX4uakAAAAASUVORK5CYII=',
                symbolSize: [40, 40]
            },]
        }
    )


    return newOptions;
}

async function ForestAreaPercentage(setDescription, newOptions) {

    setDescription({
        source: "The World Bank Group Organization",
        apiDoc: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
        url: "https://data.worldbank.org/indicator/AG.LND.FRST.ZS?view=chart",
        about: "This graph shows information about Forest area in Peru, in percentages of land area, per year. Data from Food and Agriculture Organization, electronic files and web site.",
    });

    newOptions = {
        title: {
            text: "Forest area [Perú]",
            subtext: "(% of land area)",
            textStyle: {
                color: "black",
                fontSize: 14,
            },
            left: 0,
            top: 0,
        },
        grid: { top: 75, right: 0, bottom: '30%', left: 15 },
        legend: {
            show: true,
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
            data: ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
            offset: 10
        },
        yAxis: [
            {
                show: true,
                type: 'value',
                name: '%',
                axisLabel: {
                    formatter: value => (value).toFixed(0),
                    align: 'left'
                },
                padding: 10
            },
            {
                show: true,
            }
        ],
        series: [],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: "shadow"
            }
        },
        color: '#2A9D8F'
    };

    let url = [
        `https://api.worldbank.org/v2/country/per/indicator/AG.LND.FRST.ZS?format=json`,
    ];

    const { data } = await axios.get(url[0]);

    let data_tmp = [];

    for (let i = (data[1].length - 1); i >= 0; i--) {
        if (data[1][i].value !== null)
            data_tmp.push(data[1][i].value?.toFixed(2));
    }
    newOptions.series.push({
        name: 'Forest area',
        data: data_tmp,
        type: 'line',
        areaStyle: {
            color: '#2A9D8F'
        }
    });


    return newOptions;
}

async function ForestAreaKm(setDescription, newOptions) {

    setDescription({
        source: "The World Bank Group Organization",
        apiDoc: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
        url: "https://data.worldbank.org/indicator/AG.LND.FRST.K2?locations=PE&view=chart",
        about: "This graph shows information about Forest area in Peru, in sq. km, per year. Data from Food and Agriculture Organization, electronic files and web site.",
    });

    newOptions = {
        title: {
            text: "Forest area [Perú]",
            subtext: "(sq. km)",
            textStyle: {
                color: "black",
                fontSize: 14,
            },
            left: 0,
            top: 0,
        },
        grid: { top: 75, right: 0, bottom: '30%', left: 40 },
        legend: {
            show: true,
            bottom: 0,
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            show: true,
            type: 'category',
            data: ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
            offset: 10
        },
        yAxis: [
            {
                show: true,
                type: 'value',
                name: 'Thousands',
                axisLabel: {
                    formatter: value => (value / 1000).toFixed(0),
                    align: 'left'
                },
                min: function (value) {
                    return value.min - 10;
                },
                max: function (value) {
                    return value.max + 10;
                },
                offset: 10
            },
            {
                show: true,
            }
        ],
        series: [],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: "shadow"
            }
        },
        color: '#6DCE83',
    };

    let url = [
        `https://api.worldbank.org/v2/country/per/indicator/AG.LND.FRST.K2?format=json`,
    ];

    const { data } = await axios.get(url[0]);

    let data_tmp = [];

    for (let i = (data[1].length - 1); i >= 0; i--) {
        if (data[1][i].value !== null)
            data_tmp.push(data[1][i].value?.toFixed(2));
    }
    newOptions.series.push({
        name: 'Forest area',
        data: data_tmp,
        type: 'line',
        areaStyle: {
            color: '#6DCE83'
        },
    });


    return newOptions;
}

async function TerrestrialAndMarineProtectedAreas(setDescription, newOptions) {

    setDescription({
        source: "The World Bank Group Organization",
        apiDoc: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
        url: "https://data.worldbank.org/indicator/AG.LND.FRST.K2?locations=PE&view=chart",
        about: "This graph shows information about terrestrial and marine protected areas in Peru, in % of total territorial area , per year. Data from World Database on Protected Areas ( WDPA ) where the compilation and management is carried out by United Nations Environment World Conservation Monitoring Centre ( UNEP-WCMC ) in collaboration with governments, non-governmental organizations, academia and industry. The data is available online through the Protected Planet website ( protectedplanet.net ).",
    });

    newOptions = {
        title: {
            text: "Terrestrial and marine protected areas [Perú]",
            subtext: "% of total territorial area",
            textStyle: {
                color: "black",
                fontSize: 14,
            },
            left: 0,
            top: 0,
        },
        grid: { top: 75, right: 0, bottom: '20%', left: 25 },
        legend: {
            show: true,
            bottom: 0,
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            show: true,
            type: 'category',
            data: ['2016', '2017', '2018'],
            offset: 10
        },
        yAxis: [
            {
                show: true,
                type: 'value',
                name: '%',
                axisLabel: {
                    formatter: value => (value).toFixed(0),
                    align: 'left'
                },
                min: function (value) {
                    return value.min - 10;
                },
                max: function (value) {
                    return value.max + 10;
                },
                offset: 10
            }
        ],
        series: [],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: "shadow"
            }
        },
        color: '#5189DE',
    };

    let url = [
        `https://api.worldbank.org/v2/country/per/indicator/ER.PTD.TOTL.ZS?format=json`,
    ];

    const { data } = await axios.get(url[0]);

    let data_tmp = [];

    for (let i = (data[1].length - 1); i >= 0; i--) {
        if (data[1][i].value !== null)
            data_tmp.push(data[1][i].value?.toFixed(2));
    }
    newOptions.series.push({
        name: '% protected areas',
        data: data_tmp,
        type: 'bar',
    });


    return newOptions;
}

async function AveragePrecipitationInDepth(setDescription, newOptions) {

    setDescription({
        source: "The World Bank Group Organization",
        apiDoc: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
        url: "https://data.worldbank.org/indicator/AG.LND.PRCP.MM?locations=PE&view=chart",
        about: "This graph shows information about Average precipitation in depth in mm per year, in Peru. Data from Food and Agriculture Organization, electronic files and web site.",
    });

    newOptions = {
        title: {
            text: "Average precipitation in depth [Perú]",
            subtext: "mm per year",
            textStyle: {
                color: "black",
                fontSize: 14,
            },
            left: 0,
            top: 0,
        },
        grid: { top: 75, right: 0, bottom: '20%', left: 25 },
        legend: {
            show: true,
            bottom: 0,
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            show: true,
            type: 'category',
            data: ['1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            offset: 10
        },
        yAxis: [
            {
                show: true,
                type: 'value',
                name: 'mm',
                axisLabel: {
                    formatter: value => (value).toFixed(0),
                    align: 'left',
                },
                min: function (value) {
                    return value.min - 10;
                },
                max: function (value) {
                    return value.max + 10;
                },
                offset: 10
            }
        ],
        series: [],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: "shadow"
            }
        },
        color: '#732C7D',
    };

    let url = [
        `https://api.worldbank.org/v2/country/per/indicator/AG.LND.PRCP.MM?format=json`,
    ];

    const { data } = await axios.get(url[0]);

    let data_tmp = [];

    for (let i = (data[1].length - 1); i >= 0; i--) {
        // if (data[1][i].value !== null)
        data_tmp.push(data[1][i].value?.toFixed(2));
    }
    newOptions.series.push({
        name: 'Average precipitation in depth',
        data: data_tmp,
        type: 'line',
    });


    return newOptions;
}

async function EnergyUseKgOilPerCapita(setDescription, newOptions) {

    setDescription({
        source: "The World Bank Group Organization",
        apiDoc: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
        url: "https://data.worldbank.org/indicator/EG.USE.PCAP.KG.OE?locations=PE&view=chart",
        about: "This graph shows information about energy use (kg of oil equivalent per capita) in Peru. Data from IEA Statistics © OECD/IEA 2014 ( iea.org/stats/index.asp ), subject to iea.org/t&c/termsandconditions",
    });

    newOptions = {
        title: {
            text: "Energy use [Perú]",
            subtext: "kg of oil equivalent per capita",
            textStyle: {
                color: "black",
                fontSize: 14,
            },
            left: 0,
            top: 0,
        },
        grid: { top: 75, right: 0, bottom: '20%', left: 25 },
        legend: {
            show: true,
            bottom: 0,
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            show: true,
            type: 'category',
            data: ['1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            offset: 10
        },
        yAxis: [
            {
                show: true,
                type: 'value',
                name: 'kg',
                axisLabel: {
                    formatter: value => (value).toFixed(0),
                    align: 'left',
                },
                min: function (value) {
                    return value.min - 10;
                },
                max: function (value) {
                    return value.max + 10;
                },
                offset: 10
            }
        ],
        series: [],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: "shadow"
            }
        },
        color: '#264653',
    };

    let url = [
        `https://api.worldbank.org/v2/country/per/indicator/EG.USE.PCAP.KG.OE?format=json`,
    ];

    const { data } = await axios.get(url[0]);

    let data_tmp = [];

    for (let i = (data[1].length - 1); i >= 0; i--) {
        // if (data[1][i].value !== null)
        data_tmp.push(data[1][i].value?.toFixed(2));
    }
    newOptions.series.push({
        name: 'Energy use (kg of oil equivalent per capita)',
        data: data_tmp,
        type: 'line',
        areaStyle: {
            color: '#E9C46A'
        }
    });

    return newOptions;
}

async function AirPollutionAnnualExposure(setDescription, newOptions) {

    setDescription({
        source: "The World Bank Group Organization",
        apiDoc: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
        url: "https://data.worldbank.org/indicator/EN.ATM.PM25.MC.M3?locations=PE&view=chart",
        about: "This graph shows information about mean annual exposure (micrograms per cubic meter) of PM2.5 Air Pollution in Peru. Data from Brauer, M. et al. 2017, for the Global Burden of Disease Study 2017.",
    });

    newOptions = {
        title: {
            text: "PM2.5 Air Pollution [Perú]",
            subtext: "Mean annual exposure (micrograms per cubic meter)",
            textStyle: {
                color: "black",
                fontSize: 14,
            },
            left: 0,
            top: 0,
        },
        grid: { top: 75, right: 0, bottom: '20%', left: 25 },
        legend: {
            show: true,
            bottom: 0,
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            show: true,
            type: 'category',
            data: ['1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            offset: 10
        },
        yAxis: [
            {
                show: true,
                type: 'value',
                // name: '',
                axisLabel: {
                    formatter: value => (value).toFixed(0),
                    align: 'left',
                },
                min: function (value) {
                    return value.min - 10;
                },
                max: function (value) {
                    return value.max + 10;
                },
                offset: 10
            }
        ],
        series: [],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: "shadow"
            }
        },
        color: '#90323D',
    };

    let url = [
        `https://api.worldbank.org/v2/country/per/indicator/EN.ATM.PM25.MC.M3?format=json`,
    ];

    const { data } = await axios.get(url[0]);

    let data_tmp = [];

    for (let i = (data[1].length - 1); i >= 0; i--) {
        // if (data[1][i].value !== null)
        data_tmp.push(data[1][i].value?.toFixed(2));
    }
    newOptions.series.push({
        name: 'PM2.5 air pollution, mean annual exposure (micrograms per cubic meter)',
        data: data_tmp,
        type: 'line'
    });

    return newOptions;
}

async function AirPollutionExposedPopulation(setDescription, newOptions) {

    setDescription({
        source: "The World Bank Group Organization",
        apiDoc: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
        url: "https://data.worldbank.org/indicator/EN.ATM.PM25.MC.ZS?locations=PE&view=chart",
        about: "This graph shows information about Population exposed to levels of PM2.5 Air Pollution exceeding WHO guideline value (% of total) in Peru. Data from Brauer, M. et al. 2017, for the Global Burden of Disease Study 2017.",
    });

    newOptions = {
        title: {
            text: "PM2.5 Air Pollution [Perú]",
            subtext: "Population exposed to levels exceeding WHO guideline value (% of total)",
            textStyle: {
                color: "black",
                fontSize: 14,
            },
            left: 0,
            top: 0,
        },
        grid: { top: 75, right: 0, bottom: '20%', left: 10 },
        legend: {
            show: true,
            bottom: 0,
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            show: true,
            type: 'category',
            data: ['1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            offset: 10
        },
        yAxis: [
            {
                show: true,
                type: 'value',
                // name: '---',
                axisLabel: {
                    formatter: value => (value).toFixed(0),
                    align: 'left',
                },
                min: function (value) {
                    return value.min - 10;
                },
                max: function (value) {
                    return value.max + 10;
                },
                offset: 10
            }
        ],
        series: [],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: "shadow"
            }
        },
        color: '#8F5C38',
    };

    let url = [
        `https://api.worldbank.org/v2/country/per/indicator/EN.ATM.PM25.MC.ZS?format=json`,
    ];

    const { data } = await axios.get(url[0]);

    let data_tmp = [];

    for (let i = (data[1].length - 1); i >= 0; i--) {
        // if (data[1][i].value !== null)
        data_tmp.push(data[1][i].value?.toFixed(2));
    }
    newOptions.series.push({
        name: 'PM2.5 air pollution, population exposed to levels exceeding WHO guideline value (% of total)',
        data: data_tmp,
        type: 'line'
    });

    return newOptions;
}

async function TotalNaturalResourcesRents(setDescription, newOptions) {

    setDescription({
        source: "The World Bank Group Organization",
        apiDoc: "https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information",
        url: "https://data.worldbank.org/indicator/NY.GDP.TOTL.RT.ZS?locations=PE&view=chart",
        about: `This graph shows information about Total natural resources rents (% of GDP) in Peru. Data from Estimates based on sources and methods described in "The Changing Wealth of Nations: Measuring Sustainable Development in the New Millennium" ( World Bank, 2011 ).`,
    });

    newOptions = {
        title: {
            text: "Total natural resources rents [Perú]",
            subtext: "% of GDP",
            textStyle: {
                color: "black",
                fontSize: 14,
            },
            left: 0,
            top: 0,
        },
        grid: { top: 75, right: 10, bottom: '20%', left: 25 },
        legend: {
            show: true,
            bottom: 0,
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            show: true,
            type: 'category',
            data: ['1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            offset: 10
        },
        yAxis: [
            {
                show: true,
                type: 'value',
                name: '%',
                axisLabel: {
                    formatter: value => (value).toFixed(0),
                    align: 'left',
                },
                offset: 10
            }
        ],
        series: [],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: "shadow"
            }
        },
        color: '#B2ABBF',
    };

    let url = [
        `https://api.worldbank.org/v2/country/per/indicator/NY.GDP.TOTL.RT.ZS?format=json`,
    ];

    const { data } = await axios.get(url[0]);

    let data_tmp = [];

    for (let i = (data[1].length - 1); i >= 0; i--) {
        // if (data[1][i].value !== null)
        data_tmp.push(data[1][i].value?.toFixed(2));
    }
    newOptions.series.push({
        name: 'PM2.5 air pollution, population exposed to levels exceeding WHO guideline value (% of total)',
        data: data_tmp,
        type: 'bar'
    });

    return newOptions;
}