import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';

export default class ScheduleGanttChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {
          // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
          console.log('Selected ', Chart.chart.getSelection());
        },
      },
    ];
  }
  render() {
    const columns = [{
      "id": "Task ID",
      "type": "string"
    }, {
      "id": "Task Name",
      "type": "string"
    }, {
      "id": "Start Date",
      "type": "date"
    }, {
      "id": "End Date",
      "type": "date"
    }, {
      "id": "Duration",
      "type": "number"
    }, {
      "id": "Percent Complete",
      "type": "number"
    }, {
      "id": "Dependencies",
      "type": "string"
    }];
    const rows = [
      ["Research", "Find sources", new Date("2014-12-31T13:00:00.000Z"), new Date("2015-01-04T13:00:00.000Z"), null, 100, null],
      ["Write", "Write paper", null, new Date("2015-01-08T13:00:00.000Z"), 259200000, 25, "Research,Outline"],
      ["Cite", "Create bibliography", null, new Date("2015-01-06T13:00:00.000Z"), 86400000, 20, "Research"],
      ["Complete", "Hand in paper", null, new Date("2015-01-09T13:00:00.000Z"), 86400000, 0, "Cite,Write"],
      ["Outline", "Outline paper", null, new Date("2015-01-05T13:00:00.000Z"), 86400000, 100, "Research"]
    ];
    return (
      <div className={'my-pretty-chart-container'}>
        <Chart
          chartType="Gantt"
          columns={columns}
          rows={rows}
          options={{}}
          width={'100%'}
          graph_id="ScatterChart"
          chartPackages={["gantt"]}
          chartEvents={this.chartEvents}
        />
      </div>
    );
  }
}
// export default class ExampleChart extends React.Component {
//   constructor(props) {
//     super(props);
//     this.chartEvents = [
//       {
//         eventName: 'select',
//         callback(Chart) {
//             // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
//           console.log('Selected ', Chart.chart.getSelection());
//         },
//       },
//     ];
//     this.state = {
//       options: {
//         title: 'Age vs. Weight comparison',
//         hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
//         vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
//         legend: 'none',
//       },
//       rows: [
//         [8, 12],
//         [4, 5.5],
//         [11, 14],
//         [4, 5],
//         [3, 3.5],
//         [6.5, 7],
//       ],
//       columns: [
//         {
//           type: 'number',
//           label: 'Age',
//         },
//         {
//           type: 'number',
//           label: 'Weight',
//         },
//       ],
//     };
//   }
//   render() {
//     return (
//       <Chart
//         chartType="ScatterChart"
//         rows={this.state.rows}
//         columns={this.state.columns}
//         options={this.state.options}
//         graph_id="ScatterChart"
//         width="100%"
//         height="400px"
//         chartEvents={this.chartEvents}
//       />
//     );
//   }
// }
