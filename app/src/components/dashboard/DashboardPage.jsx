import React from 'react';
import PropTypes from 'prop-types'
import { Panel, Table } from 'react-bootstrap';
import qs from 'query-string';
import Grid from 'material-ui/Grid';

import StatCard from './StatCard.jsx'
import ReportDataTable from './ReportDataTable.jsx'
import LineChart from './charts/LineChart.jsx'


class DashboardPage extends React.Component {
  static dataFetcher({ urlBase, location }) {
    const search = location.query ? `${location.query}&_summary` : '?_summary';
    return fetch(`${urlBase || ''}/api/employee${search}`).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ DashboardPage: data }));
    });
  }
  constructor(props, context) {
    super(props, context);

    // const stats = context.initialState.DashboardPage ? context.initialState.DashboardPage : {};
    this.state = {
      stats: {}
    };
    this.setFilter = this.setFilter.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    const oldQuery = qs.parse(prevProps.location.search);
    const newQuery = qs.parse(this.props.location.search);

    if (newQuery === undefined) return;

    if (oldQuery.status === newQuery.status
      && oldQuery.effort_gte === newQuery.effort_gte
      && oldQuery.effort_lte === newQuery.effort_lte) {
      return;
    }
    this.loadData();
  }
  setFilter(query) {
    let qs = qs.stringify(query);
    this.props.history.push({ pathname: this.props.location.pathname, search: qs })
  }

  loadData() {
    DashboardPage.dataFetcher({ location: this.props.location })
      .then(data => {
        this.setState({ stats: data.DashboardPage });
      }).catch(err => {
        this.props.showError(`Error in fetching data from server: ${err}`);
      });
  }
  render() {
    return (
      <div>
        <ReportDataTable stats={this.state.stats} />
      </div >
    );
  }
}
DashboardPage.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object,
};

export default DashboardPage;
