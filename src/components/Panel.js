import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import faker from '../faker';
import * as actions from '../actions';

const actionCreators = {
    cleanTasks: actions.cleanTasks,
    replaceTasksBy: actions.replaceTasksBy,
  };


class Panel extends React.Component {
    handleCleanTasks = () => {
        const {cleanTasks} = this.props;
        cleanTasks();
    }

    handleGenerateSamples = () => {
        const { replaceTasksBy } = this.props;
        const getNewTask = () => ({ id: _.uniqueId(), text: faker.lorem.sentence() });
        const newTasks = _.times(5, getNewTask);
        replaceTasksBy(newTasks);
      };




  render() {
    return (
        <div className="py-3">
        <button type="button" data-test="clean" className="btn btn-warning btn-sm mr-3" onClick={this.handleCleanTasks}>Clean</button>
        <button type="button" data-test="generate" className="btn btn-primary btn-sm" onClick={this.handleGenerateSamples}>Generate</button>
      </div>
    );
  }
}

export default connect(null, actionCreators)(Panel);
