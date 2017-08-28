import { Chart } from 'react-google-charts';
import React from 'react';

import ScheduleGantt from './ScheduleGantt.jsx';

class SchedulePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScheduleGantt />
    );
  }
}
export default SchedulePage;