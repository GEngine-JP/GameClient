import React from 'react';

import {
    BLUR_DELAY_MS,
    debounce,
    getClassName,
    KEY_CODES,
    noop,
    request
} from '../../utils';


class SearchBox extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            selectedIndex: -1,
            showDropDown: false,
            results: []
        };
        this.onResponse = this.onResponse.bind(this);
        this.onDropDownMouseDown = this.onDropDownMouseDown.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.delayBlur = debounce(
            this.onBlur.bind(this),
            BLUR_DELAY_MS
        );
        this.delaySearch = debounce(
            this.onSearch.bind(this),
            this.props.delay
        );
        this.canHideDropDown = true;
    }

    componentWillUnmount() {
        this.delayBlur.cancel();
        this.delaySearch.cancel();
    }

    render() {
        const className = getClassName(
            'react-ui-search-box',
            this.props.className
        );

        return (
            <div
            className={className}
            onBlur={this.delayBlur}
            tabIndex={9999}>
                <input
                disabled={this.props.disabled}
                onChange={this.delaySearch}
                onKeyDown={this.onKeyDown}
                placeholder={this.props.placeholder}
                ref="search"
                type="text" />

                {this.renderDropDown()}
            </div>
        );
    }

    renderDropDown() {
        if (!this.state.showDropDown) {
            return null;
        }

        const dropDownClassName = getClassName(
            'react-ui-search-box-drop-down',
            this.props.resultsWapperClassName
        );
        const results = this.state.results.map((result, i) => {
            const resultClassName = getClassName(
                'react-ui-search-box-result',
                this.props.resultClassName,
                (
                    i === this.state.selectedIndex ?
                    'react-ui-search-box-result-selected' :
                    ''
                )
            );

            return (
                <div
                className={resultClassName}
                key={i}
                onClick={this.onChange.bind(this, result)}>
                    {this.props.renderResult(result)}
                </div>
            );
        });

        return (
            <div
            className={dropDownClassName}
            onMouseDown={this.onDropDownMouseDown}
            onMouseUp={this.onDropDownMouseUp}>
                {results}
            </div>
        );
    }

    onBlur() {
        if (this.canHideDropDown) {
            this.hideDropDown();
        }
    }

    onKeyDown(evt) {
        if (evt.keyCode === KEY_CODES.ENTER && this.state.selectedIndex > -1) {
            this.onChange(
                this.state.results[this.state.selectedIndex],
                evt
            );
        } else if (evt.keyCode === KEY_CODES.ARROW_DOWN) {
            this.selectIndex(this.state.selectedIndex + 1);
        } else if (evt.keyCode === KEY_CODES.ARROW_UP) {
            this.selectIndex(this.state.selectedIndex - 1);
        }
    }

    onChange(result, evt) {
        this.delayBlur.cancel();
        this.props.onChange(evt, result);
        this.select(result);
        this.hideDropDown();
    }

    onDropDownMouseDown() {
        this.canHideDropDown = false;
    }

    onDropDownMouseUp() {
        this.canHideDropDown = true;
    }

    onResponse(err, req) {
        const results = this.parseResults(req) || [];

        this.props.onResponse(err, req, results);
        this.setState({
            results: results,
            selectedIndex: -1,
            showDropDown: true
        });
    }

    onSearch(evt) {
        const value = this.refs.search.value;
        const url = this.props.getUrl(value);

        if (value) {
            this.props.onSearch(evt, url);
            request.get(url, this.onResponse);
        } else {
            this.hideDropDown();
        }
    }

    select(value) {
        this.setState({value});
    }

    selectIndex(i) {
        let selectedIndex = i;

        if (selectedIndex >= this.state.results.length) {
            selectedIndex = this.state.results.length - 1;
        }

        if (selectedIndex < 0) {
            selectedIndex = 0;
        }

        this.setState({selectedIndex: selectedIndex});
    }

    hideDropDown() {
        this.setState({showDropDown: false});
    }

    showDropDown() {
        this.setState({showDropDown: true});
    }

    parseResults(req) {
        return this.props.parseResults(req);
    }
}

SearchBox.propTypes = {
    className: React.PropTypes.string,
    delay: React.PropTypes.number,
    dropDownClassName: React.PropTypes.string,
    getUrl: React.PropTypes.func,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onResponse: React.PropTypes.func,
    onSearch: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    resultClassName: React.PropTypes.string,
    renderResult: React.PropTypes.func
};

SearchBox.defaultProps = {
    delay: 400,
    disabled: false,
    getUrl: () => '',
    onChange: noop,
    onResponse: noop,
    onSearch: noop,
    placeholder: '',
    parseResults: (req) => req,
    renderResult: (result) => result
};

export default SearchBox;
