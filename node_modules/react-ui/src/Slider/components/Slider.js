import React from 'react';

import {getClassName, noop} from '../../utils';


class Slider extends React.Component {
    constructor(...args) {
        super(...args);

        const value = Math.round(this.getBoundedValue(
           this.props.defaultValue,
            0,
            100
        ));

        this.state = {
            clientX: 0,
            fillWidth: `${value + 1}%`,
            handleLeft: `${value}%`,
            sliding: false,
            value: value
        };
        this.onChange = this.onChange.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    render() {
        const className = getClassName(
            'react-ui-slider',
            this.props.className
        );

        return (
            <div
            className={className}
            onDragStart={this.onDragStart}
            onMouseLeave={this.onChange}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onChange}>
                {this.renderTrack()}
            </div>
        );
    }

    renderTrack() {
        const trackClassName = getClassName(
            'react-ui-slider-track',
            this.props.trackClassName
        );
        const fillClassName = getClassName(
            'react-ui-slider-fill',
            this.props.fillClassName
        );
        const handleClassName = getClassName(
            'react-ui-slider-handle',
            this.props.handleClassName
        );
        const trackStyle = {
            backgroundColor: this.props.trackColor,
            position: 'relative'
        };
        const handleStyle = {
            backgroundColor: this.props.handleColor,
            left: this.state.handleLeft,
            position: 'absolute'
        };
        const fillStyle = {
            backgroundColor: this.props.fillColor,
            position: 'absolute',
            width: this.state.fillWidth
        };

        return (
            <div
            className={trackClassName}
            onDragStart={this.onDragStart}
            ref="track"
            style={trackStyle}>
                <div
                className={fillClassName}
                onDragStart={this.onDragStart}
                style={fillStyle}></div>

                <div
                className={handleClassName}
                onDragStart={this.onDragStart}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onChange}
                ref="handle"
                style={handleStyle}></div>
            </div>
        );
    }

    onChange(evt) {
        evt.stopPropagation();

        if (this.state.sliding) {
            this.props.onChange(evt, this.state.value);
            this.setState({sliding: false});
        }
    }

    onDragStart(evt) {
        evt.preventDefault();
    }

    onMouseDown(evt) {
        evt.preventDefault();
        this.setState({sliding: true});
    }

    onMouseMove(evt) {
        if (this.state.sliding) {
            const track = this.refs.track;
            const handle = this.refs.handle;
            const mouseOffset = (
                evt.clientX -
                track.getBoundingClientRect().left
            );
            const trackOffset = this.getBoundedValue(track.offsetWidth, 1);
            const handleOffset = this.getBoundedValue(handle.offsetWidth, 1);
            const state = {};

            state.handleLeft = this.getBoundedValue(
                mouseOffset - handleOffset,
                0,
                trackOffset - handleOffset
            );
            state.fillWidth = this.getBoundedValue(
                state.handleLeft + handleOffset,
                0,
                trackOffset
            );
            state.value = this.getBoundedValue(
                (state.handleLeft / trackOffset * 100) /
                (100 - (handleOffset / trackOffset * 100)) * 100,
                0,
                100
            );

            this.setState(state);
        }
    }

    getBoundedValue(value, min=-Math.Infinity, max=Math.Infinity) {
        if (value < min) {
            return min;
        }

        if (value > max) {
            return max;
        }

        return value;
    }
}

Slider.propTypes = {
    defaultValue: React.PropTypes.number,
    className: React.PropTypes.string,
    fillClassName: React.PropTypes.string,
    fillColor: React.PropTypes.string,
    handleClassName: React.PropTypes.string,
    handleColor: React.PropTypes.string,
    onChange: React.PropTypes.func,
    trackClassName: React.PropTypes.string,
    trackColor: React.PropTypes.string
};

Slider.defaultProps = {
    defaultValue: 0,
    fillColor: undefined,
    handleColor: undefined,
    onChange: noop,
    trackColor: undefined
};

export default Slider;
