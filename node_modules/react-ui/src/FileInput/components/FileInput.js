import React from 'react';

import {getClassName, noop} from '../../utils';


/**
 * @class FileInput
 * A file input that can easily be styled. Uses a hidden file input
 * and exposes stylable visible inputs.
 */
class FileInput extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {inputDisplay: '', inputKey: 0};
        this.onChange = this.onChange.bind(this);
        this.onChooseClick = this.onChooseClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
    }

    render() {
        const className = getClassName(
            'react-ui-file-input',
            this.props.className
        );

        return (
            <div className={className}>
                {this.renderHiddenInput()}
                {this.renderChooseButton()}
                {this.renderClearButton()}
                {this.renderInput()}
            </div>
        );
    }

    renderHiddenInput() {
        const style = {display: 'none'};

        return (
            <input
            disabled={this.props.disabled}
            key={this.state.inputKey}
            name={this.props.name}
            onChange={this.onChange}
            ref="fileInput"
            style={style}
            type="file" />
        );
    }

    renderChooseButton() {
        const className = getClassName(
            'react-ui-file-input-choose',
            this.props.chooseClassName
        );

        return this.props.showChooseButton ? (
            <button
            className={className}
            disabled={this.props.disabled}
            onClick={this.onChooseClick}
            type="button">
                {this.props.chooseText}
            </button>
        ) : null;
    }

    renderClearButton() {
        const className = getClassName(
            'react-ui-file-input-clear',
            this.props.clearClassName
        );

        return this.props.showClearButton ? (
            <button
            className={className}
            disabled={this.props.disabled}
            onClick={this.onClearClick}
            type="button">
                {this.props.clearText}
            </button>
        ) : null;
    }

    renderInput() {
        const className = getClassName(
            'react-ui-file-input-input',
            this.props.inputClassName
        );

        return this.props.showInput ? (
            <input
            className={className}
            disabled={this.props.disabled}
            onClick={this.onChooseClick}
            placeholder={this.props.placeholder}
            readOnly={true}
            type="text"
            value={this.state.inputDisplay} />
        ) : null;
    }

    onChange(evt) {
        const inputDisplay = evt.target.value.split('\\').pop();

        this.props.onChange(evt, inputDisplay);
        this.setState({inputDisplay});
    }

    onChooseClick(evt) {
        evt.preventDefault();
        this.props.onChooseClick(evt);
        this.refs.fileInput.click();
    }

    onClearClick(evt) {
        evt.preventDefault();
        this.props.onClearClick(evt);
        this.clear();
    }

    clear() {
        this.setState({
            inputDisplay: '',
            inputKey: this.state.inputKey + 1
        });
    }
}

FileInput.propTypes = {
    chooseClassName: React.PropTypes.string,
    chooseText: React.PropTypes.string,
    className: React.PropTypes.string,
    clearClassName: React.PropTypes.string,
    clearText: React.PropTypes.string,
    inputClassName: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onChooseClick: React.PropTypes.func,
    onClearClick: React.PropTypes.func,
    placeholder: React.PropTypes.string
};

FileInput.defaultProps = {
    chooseText: 'Choose File',
    clearText: 'Clear File',
    onChange: noop,
    onChooseClick: noop,
    onClearClick: noop,
    showChooseButton: true,
    showClearButton: true,
    showInput: true
};

export default FileInput;
