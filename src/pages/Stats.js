import React from 'react'
import ReactECharts from 'echarts-for-react';

const Stats = () => {

    const options = {
        grid: { top: 8, right: 8, bottom: 24, left: 36 },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true,
            },
        ],
        tooltip: {
            trigger: 'axis',
        },
    };

    return (
        <div className="stats-container">
            <header>
                <h2>Ecological Statistics in Perú</h2>
            </header>

            <section className="title">
                <h4>
                    <b>Statistics about </b>
                    <select name="type">
                        <option value="volvo">Gas Emission</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                    <b> in Perú </b>
                </h4>
            </section>

            <section className="description">
                <div>
                    <b>Source:</b>
                    Open Data Org
                </div>
                <p>
                    <b>API url:</b>
                    htttps://opendata.org/gas-emissions/
                </p>
                <p>
                    <b>About:</b>
                    This graphic shows gas emission per year since 1995 until 2005. Data is represented in CO2 cubic meters per year, taking data from installed stations thtat collected data about this kind of gas emissions in Perú.
                </p>
            </section>

            <section className="graphic">

                <ReactECharts option={options}  style={{minHeight: '50%', width: '100%'}}/>
            </section>
        </div>
    )
}

export default Stats
