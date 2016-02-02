import React from 'react';

import {
    BLUR_DELAY_MS,
    debounce,
    getClassName,
    noop
} from '../../utils';
import Calendar from './Calendar';


class DatePicker extends React.Component {
    constructor(...args) {
        super(...args);

        const today = this.getToday();

        this.state = {
            showCalendar: false,
            today: today,
            selectedMonth: this.getSelectedMonth(
                this.props.defaultValue || today
            ),
            value: (
                this.props.defaultValue ?
                this.cleanDate(this.props.defaultValue) :
                undefined
            )
        };
        this.delayBlur = debounce(
            this.onBlur.bind(this),
            BLUR_DELAY_MS
        );
        this.onCalendarMouseDown = this.onCalendarMouseDown.bind(this);
        this.onCalendarMouseUp = this.onCalendarMouseUp.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.onDateClick = this.onDateClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
        this.onCancelBlur = this.onCancelBlur.bind(this);
        this.canHideCalendar = true;
    }

    componentWillUnmount() {
        this.delayBlur.cancel();
    }

    render() {
        const className = getClassName(
            'react-ui-date-picker',
            this.props.className,
            this.state.showCalendar ? 'react-ui-date-picker-open' : ''
        );
        const value = this.state.value ? (
            this.props.getValue(this.state.value)
        ) : undefined;

        return (
            <div
            className={className}
            onBlur={this.delayBlur}
            onClick={this.onClick}
            tabIndex={9999}>
                <input
                disabled={this.props.disabled}
                name={this.props.name}
                type="hidden"
                value={value} />

                <div className="react-ui-date-picker-inner">
                    {this.renderValue()}

                    <div className="react-ui-date-picker-controls">
                        {this.renderClear()}
                        {this.renderTrigger()}
                    </div>
                </div>

                {this.renderCalendar()}
            </div>
        );
    }

    renderValue() {
        const className = getClassName(
            'react-ui-date-picker-value',
            this.props.valueClassName,
            !this.state.value ? 'react-ui-date-picker-placeholder' : ''
        );
        const display = (
            this.state.value ?
            this.props.getDisplay(this.state.value) :
            this.props.placeholder
        );
        const value = (
            this.state.value ?
            this.props.getValue(this.state.value) :
            this.state.value
        );

        return (
            <span className={className}>
                <input
                disabled={this.props.disabled}
                name={this.props.name}
                type="hidden"
                value={value} />

                {display}
            </span>
        );
    }

    renderTrigger() {
        const className = getClassName(
            'react-ui-date-picker-trigger',
            this.props.triggerClassName
        );

        return (<span className={className}></span>);
    }

    renderClear() {
        const className = getClassName(
            'react-ui-date-picker-clear',
            this.props.clearClassName
        );
        const showClear = (
            this.props.showClear &&
            this.state.value &&
            !this.props.disabled
        );

        return showClear ? (
            <span
            className={className}
            onClick={this.onClearClick}>
            </span>
        ) : null;
    }

    renderCalendar() {
        return this.state.showCalendar ? (
            <Calendar
            {...this.props}
            {...this.state}
            onCalendarMouseDown={this.onCalendarMouseDown}
            onCalendarMouseUp={this.onCalendarMouseUp}
            onChangeMonth={this.onChangeMonth}
            onChangeYear={this.onChangeYear}
            onDateClick={this.onDateClick}
            onNextClick={this.onNextClick}
            onPreviousClick={this.onPreviousClick}
            onCancelBlur={this.onCancelBlur} />
        ) : null;
    }

    onBlur() {
        if (this.canHideCalendar) {
            this.hideCalendar();
        }
    }

    onClearClick(evt) {
        evt.stopPropagation();
        this.props.onClearClick(evt);
        this.clear();
    }

    onClick(evt) {
        if (!this.props.disabled) {
            this.props.onClick(evt, this.state.showCalendar);

            if (this.state.showCalendar) {
                this.hideCalendar();
            } else {
                this.showCalendar();
            }
        }
    }

    onCalendarMouseDown() {
        this.canHideCalendar = false;
    }

    onCalendarMouseUp() {
        this.canHideCalendar = true;
    }

    onCancelBlur(evt) {
        evt.stopPropagation();
        this.delayBlur.cancel();
    }

    onDateClick(date, disabled, evt) {
        evt.stopPropagation();
        this.delayBlur.cancel();

        if (!disabled) {
            this.props.onDateClick(evt, date);
            this.setState({
                selectedMonth: this.getSelectedMonth(date),
                showCalendar: false,
                value: date
            });
        }
    }

    onChangeMonth(evt) {
        evt.stopPropagation();
        this.delayBlur.cancel();
        this.setState({
            selectedMonth: new Date(
                this.state.selectedMonth.getFullYear(),
                evt.target.options[evt.target.selectedIndex].value,
                1
            )
        });
    }

    onChangeYear(evt) {
        evt.stopPropagation();
        this.delayBlur.cancel();
        this.setState({
            selectedMonth: new Date(
                evt.target.options[evt.target.selectedIndex].value,
                this.state.selectedMonth.getMonth(),
                1
            )
        });
    }

    onNextClick(evt) {
        evt.stopPropagation();
        this.delayBlur.cancel();
        this.setState({
            selectedMonth: this.addMonths(this.state.selectedMonth, 1)
        });
    }

    onPreviousClick(evt) {
        evt.stopPropagation();
        this.delayBlur.cancel();
        this.setState({
            selectedMonth: this.addMonths(this.state.selectedMonth, -1)
        });
    }

    clear() {
        this.setState({value: undefined});
    }

    hideCalendar() {
        this.setState({showCalendar: false});
    }

    showCalendar() {
        this.setState({showCalendar: true});
    }

    addMonths(d, n) {
        const date = new Date(d);

        date.setMonth(date.getMonth() + n);

        return date;
    }

    getToday() {
        return this.cleanDate(new Date());
    }

    getSelectedMonth(date) {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            1
        );
    }

    cleanDate(date) {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
    }
}

DatePicker.propTypes = {
    calendarClassName: React.PropTypes.string,
    calendarHeaderClassName: React.PropTypes.string,
    calendarSubHeaderClassName: React.PropTypes.string,
    calendarBodyClassName: React.PropTypes.string,
    calendarHeaderNextClassName: React.PropTypes.string,
    calendarHeaderPreviousClassName: React.PropTypes.string,
    className: React.PropTypes.string,
    getDisplay: React.PropTypes.func,
    getValue: React.PropTypes.func,
    isDateDisabled: React.PropTypes.func,
    name: React.PropTypes.string,
    onClearClick: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onDateClick: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    showClear: React.PropTypes.bool,
    triggerClassName: React.PropTypes.string,
    valueClassName: React.PropTypes.string
};

DatePicker.defaultProps = {
    getValue: (date) => (
        `${date.getFullYear()}-` +
        `${date.getMonth() + 1}-` +
        `${date.getDate()}`
    ),
    getDisplay: (date) => (
        `${date.getMonth() + 1}/` +
        `${date.getDate()}/` +
        `${date.getFullYear()}`
    ),
    dayNames: [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ],
    isDateDisabled: () => false,
    maxValue: new Date(2100, 1, 1),
    minValue: new Date(1900, 1, 1),
    monthNames: [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ],
    onClearClick: noop,
    onClick: noop,
    onDateClick: noop,
    placeholder: '',
    showClear: true
};

export default DatePicker;
