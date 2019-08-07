import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const LegendCard = ({
  series,
  testData,
  updateState,
  updateStateParams,
  selectedDataPoint,
  color,
}) => {
  const updateSelectedTest = () => {
    const newTestData = [...testData].map(item => {
      if (item.signature_id === series.signature_id) {
        item.visible = !item.visible;
        item.highlightedPoints = [];
      }
      return item;
    });
    updateStateParams({ testData: newTestData });
  };

  const addTestData = option => {
    const options = { option, relatedSeries: series };
    updateState({ options, showModal: true });
  };

  const resetParams = testData => {
    const updates = { testData };

    if (
      selectedDataPoint &&
      selectedDataPoint.signatureId === series.signature_id
    ) {
      updates.selectedDataPoint = null;
    }

    if (testData.length === 0) {
      updates.highlightedRevisions = ['', ''];
      updates.zoom = {};
    }
    updateStateParams(updates);
  };

  const removeTest = () => {
    const index = testData.findIndex(test => test === series);
    const newData = [...testData];

    if (index === -1) {
      return;
    }

    newData.splice(index, 1);
    resetParams(newData);
  };

  const subtitleStyle = 'p-0 mb-0 border-0 text-secondary text-left';

  return (
    <FormGroup check className="pl-0 border">
      <span className="close mr-3 my-2 ml-2" onClick={removeTest}>
        <FontAwesomeIcon
          className="pointer"
          icon={faTimes}
          size="xs"
          title=""
        />
      </span>
      <div
        className={`${
          series.visible ? color : 'border-secondary'
        } graph-legend-card p-3`}
      >
        <p
          className={`p-0 mb-0 pointer border-0 ${
            series.visible ? color : 'text-muted'
          } text-left`}
          onClick={() => addTestData('addRelatedConfigs')}
          title="Add related configurations"
          type="button"
        >
          {series.name}
        </p>
        <p
          className={subtitleStyle}
          onClick={() => addTestData('addRelatedBranches')}
          title="Add related branches"
          type="button"
        >
          {series.project}
        </p>
        <p
          className={subtitleStyle}
          onClick={() => addTestData('addRelatedPlatform')}
          title="Add related branches"
          type="button"
        >
          {series.platform}
        </p>
        <span className="small">{`${series.signatureHash.slice(
          0,
          16,
        )}...`}</span>
      </div>
      <Input
        className="show-hide-check"
        type="checkbox"
        checked={series.visible}
        aria-label="Show/Hide series"
        title="Show/Hide series"
        onChange={updateSelectedTest}
      />
    </FormGroup>
  );
};

LegendCard.propTypes = {
  series: PropTypes.PropTypes.shape({
    visible: PropTypes.bool,
  }).isRequired,
  updateState: PropTypes.func.isRequired,
  testData: PropTypes.arrayOf(PropTypes.shape({})),
  updateStateParams: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  selectedDataPoint: PropTypes.shape({}),
};

LegendCard.defaultProps = {
  testData: [],
  selectedDataPoint: null,
};

export default LegendCard;