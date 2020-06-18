import React, { Component } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

class Graph extends Component {
  renderLineChart = (
    <LineChart width={700} height={400} data={this.props.data}>
      <Line type="monotone" dataKey="invested" stroke="#6c5ce7" />
      <Line type="monotone" dataKey="worth" stroke="green" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );

  render() {
    return <>{this.renderLineChart}</>;
  }
}

export default Graph;
