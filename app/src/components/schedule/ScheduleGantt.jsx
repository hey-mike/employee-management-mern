import React from 'react';
import { Chart } from 'react-google-charts';
// import new Date from 'new Date'


const daysToMilliseconds = days => {
    return days * 24 * 60 * 60 * 1000;
}

class ScheduleGantt extends React.Component {
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
        this.state = {
            options: {
                title: 'Age vs. Weight comparison',
                hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
                vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
                legend: 'none',
            },
            rows: [
                [
                    "Research",
                    "Find sources",
                    new Date("2014-12-31T13:00:00.000Z"),
                    new Date("2015-01-04T13:00:00.000Z"),
                    null,
                    100,
                    null
                ],
                [
                    "Write",
                    "Write paper",
                    null,
                    new Date("2015-01-08T13:00:00.000Z"),
                    259200000,
                    25,
                    "Research,Outline"
                ],
                [
                    "Cite",
                    "Create bibliography",
                    null,
                    new Date("2015-01-06T13:00:00.000Z"),
                    86400000,
                    20,
                    "Research"
                ],
                [
                    "Complete",
                    "Hand in paper",
                    null,
                    new Date("2015-01-09T13:00:00.000Z"),
                    86400000,
                    0,
                    "Cite,Write"
                ],
                [
                    "Outline",
                    "Outline paper",
                    null,
                    new Date("2015-01-05T13:00:00.000Z"),
                    86400000,
                    100,
                    "Research"
                ]
            ],
            columns: [
                {
                    "id": "Task ID",
                    "type": "string"
                },
                {
                    "id": "Task Name",
                    "type": "string"
                },
                {
                    "id": "Start Date",
                    "type": "date"
                },
                {
                    "id": "End Date",
                    "type": "date"
                },
                {
                    "id": "Duration",
                    "type": "number"
                },
                {
                    "id": "Percent Complete",
                    "type": "number"
                },
                {
                    "id": "Dependencies",
                    "type": "string"
                }
            ],
        };
    }
    render() {
        return (
            <Chart
                chartType="Gantt"
                rows={this.state.rows}
                columns={this.state.columns}
                options={this.state.options}
                graph_id="GanttChart"
                width="100%"
                height="400px"
                chartPackages={[
                    "gantt"
                ]}
                chartEvents={this.chartEvents}
            />
        );
    }
}
export default ScheduleGantt;