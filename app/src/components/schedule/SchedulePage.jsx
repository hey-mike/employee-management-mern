import { Chart } from 'react-google-charts';
import React from 'react';

import ScheduleGanttChart from './ScheduleGanttChart.jsx';
import GanttChart from './dhtmlxGantt/Gantt.jsx';

class SchedulePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <GanttChart />
    );
  }
}
export default SchedulePage;
