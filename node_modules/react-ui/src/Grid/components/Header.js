import React from 'react';

import {getClassName} from '../../utils';


class Header extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {numClicks: 0};
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <th className={this.getClassName()} onClick={this.onClick}>
                <span title={this.props.column.nameTooltip}>
                    {this.props.column.name}
                </span>
            </th>

        );
    }

    onClick(evt) {
        this.props.onHeaderClick(
            evt,
            this.props.column,
            this.props.columnIndex,
            undefined,
            undefined,
            this.state.numClicks + 1
        );

        this.setState({numClicks: this.state.numClicks + 1});
    }

    getClassName() {
        return getClassName(
            'react-ui-grid-header',
            this.props.headerClassName,
            this.getIsActive() ? getClassName(
                'react-ui-grid-header-active',
                this.props.activeHeaderClassName
            ) : null
        );
    }

    getIsActive() {
        return this.props.columnIndex === this.props.activeHeader;
    }
}

export default Header;
