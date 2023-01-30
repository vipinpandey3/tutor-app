/* eslint-disable react-hooks/exhaustive-deps */
import {
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import React, { useEffect } from 'react'

import { Grid } from "@material-ui/core";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import {getChartData} from '../../../../redux/actions/dashboardAction.js'

const Chart = ({dashboard: {chartData}, getChartData}) => {
    useEffect(() => {
        getChartData()
    }, [])
  return (
    <Grid item xs={6}>
        <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
            <XAxis dataKey="date" />
            <YAxis />
            {/* <CartesianGrid stroke="#eee" strokeDasharray="5 5" /> */}
            <Line dataKey="students" />
            <Line dataKey="tutors" />
            <Tooltip />
        </LineChart>
    </Grid>
  )
}

Chart.propTypes = {
    dashboard: PropTypes.object.isRequired,
    getChartData: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
      dashboard: state.dashboard
    }
  }

export default connect(mapStateToProps, {getChartData})(Chart)
