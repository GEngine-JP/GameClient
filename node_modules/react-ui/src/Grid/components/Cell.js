import React from 'react';

import {getClassName} from '../../utils';


class Cell extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {numClicks: 0};
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <td
            className={this.getClassName()}
            onClick={this.onClick}>
                {this.renderData()}
            </td>
        );
    }

    renderData() {
        return (
            typeof this.props.column.render === 'function' ?
            this.props.column.render(
                this.props.record,
                this.props.columnIndex,
                this.props.rowIndex
            ) : this.props.record[this.props.column.dataProp]
        );
    }

    onClick(evt) {
        this.props.onCellClick(
            evt,
            this.props.column,
            this.props.columnIndex,
            this.props.rowIndex,
            this.props.record,
            this.state.numClicks + 1
        );

        this.setState({numClicks: this.state.numClicks + 1});
    }

    getClassName() {
        return getClassName(
            'react-ui-grid-cell',
            this.props.cellClassName,
            this.getIsActive() ? getClassName(
                'react-ui-grid-cell-active',
                this.props.activeCellClassName
            ) : null
        );
    }

    getIsActive() {
        return (
            this.props.columnIndex === this.props.activeCell[0] &&
            this.props.rowIndex === this.props.activeCell[1]
        );
    }
}

export default Cell;
