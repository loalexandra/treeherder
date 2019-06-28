import React from 'react';
import PropTypes from 'prop-types';
import { react2angular } from 'react2angular/index.es2015';
import { Button, Container, Col, Row } from 'reactstrap';

import { getData, processResponse } from '../../helpers/http';
import { getApiUrl, repoEndpoint } from '../../helpers/url';
import { createDropdowns } from '../FilterControls';
import { phTimeRanges, phDefaultTimeRangeValue } from '../../helpers/constants';
import perf from '../../js/perf';
import { endpoints } from '../constants';

import GraphsContainer from './GraphsContainer';

class GraphsViewControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRange: '',
      frameworks: [],
      projects: [],
      errorMessages: [],
    };
  }

  componentDidMount() {
    this.getDefaultTimeRange();
    this.fetchData();
  }

  async fetchData() {
    const [projects, frameworks] = await Promise.all([
      getData(getApiUrl(repoEndpoint)),
      getData(getApiUrl(endpoints.frameworks)),
    ]);

    const updates = {
      ...processResponse(projects, 'projects'),
      ...processResponse(frameworks, 'frameworks'),
    };
    this.setState(updates);
  }

  // TODO should add a custom time range option based on query param
  getDefaultTimeRange = () => {
    const { $stateParams } = this.props;

    const defaultValue = $stateParams.timerange
      ? parseInt($stateParams.timerange, 10)
      : phDefaultTimeRangeValue;
    const timeRange = phTimeRanges.find(time => time.value === defaultValue);
    this.setState({ timeRange });
  };

  render() {
    const { timeRange } = this.state;
    const timeRangeOptions = [
      {
        options: phTimeRanges.map(item => item.text),
        selectedItem: timeRange ? timeRange.text : '',
        updateData: value =>
          this.setState({
            timeRange: phTimeRanges.find(item => item.text === value),
            // TODO update graphs - replace timeRangeChanged
          }),
        title: 'Time range',
      },
    ];
    return (
      <Container fluid className="justify-content-start">
        <Row>
          {createDropdowns(timeRangeOptions, 'p-2')}
          <Col sm="auto" className="p-2">
            <Button color="info" onClick={() => {}}>
              Add test data
            </Button>
          </Col>
        </Row>
        <GraphsContainer timeRange={timeRange} />
      </Container>
    );
  }
}

GraphsViewControls.propTypes = {
  $stateParams: PropTypes.shape({}),
};

GraphsViewControls.defaultProps = {
  $stateParams: undefined,
};

perf.component(
  'graphsViewControls',
  react2angular(GraphsViewControls, [], ['$stateParams', '$state']),
);

export default GraphsViewControls;
