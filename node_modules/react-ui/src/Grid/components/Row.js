import React from 'react';

import Cell from './Cell';
import {getClassName} from '../../utils';


class Row extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {numClicks: 0};
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <tr
            className={this.getClassName()}
            onClick={this.onClick}>
                {this.renderCells()}
            </tr>
        );
    }

    renderCells() {
        return this.props.columns.map((column, i) => (
            <Cell
            {...this.props}
            column={column}
            columnIndex={i}
            key={i}
            rowIndex={this.props.rowIndex} />
        ));
    }

    onClick(evt) {
        this.props.onRowClick(
            evt,
            undefined,
            undefined,
            this.props.rowIndex,
            undefined,
            this.state.numClicks + 1
        );

        this.setState({numClicks: this.state.numClicks + 1});
    }

    getClassName() {
        return getClassName(
            'react-ui-grid-row',
            this.props.headerClassName,
            this.getIsActive() ? getClassName(
                'react-ui-grid-row-active',
                this.props.activeRowClassName
            ) : null
        );
    }

    getIsActive() {
        return this.props.rowIndex === this.props.activeRow;
    }
}

export default Row;
