import React from 'react';

import {getClassName, chunk} from '../../utils';


class Calendar extends React.Component {
    render() {
        const className = getClassName(
            'react-ui-date-picker-calendar',
            this.props.calendarClassName
        );
        const subHeaderClassName = getClassName(
            'react-ui-date-picker-calendar-sub-header',
            this.props.calendarSubHeaderClassName
        );
        const bodyClassName = getClassName(
            'react-ui-date-picker-calendar-body',
            this.props.calendarBodyClassName
        );

        return (
            <table
            className={className}
            onMouseDown={this.props.onCancelBlur}>
                {this.renderHeader()}

                <tr
                className={subHeaderClassName}
                onMouseDown={this.props.onCancelBlur}>
                    {this.renderSubHeader()}
                </tr>

                <tr
                className={bodyClassName}
                onMouseDown={this.props.onCancelBlur}>
                    {this.renderBody()}
                </tr>
            </table>
        );
    }

    renderHeader() {
        const headerClassName = getClassName(
            'react-ui-date-picker-calendar-header',
            this.props.calendarHeaderClassName
        );
        const previousClassName = getClassName(
            'react-ui-date-picker-calendar-header-previous',
            this.props.calendarHeaderPreviousClassName
        );
        const nextClassName = getClassName(
            'react-ui-date-picker-calendar-header-next',
            this.props.calendarHeaderNextClassName
        );

        return (
            <tr
            className={headerClassName}
            onMouseDown={this.props.onCancelBlur}>
                <td onClick={this.props.onPreviousClick}>
                    <span className={previousClassName}></span>
                </td>

                <td
                colSpan={5}
                onClick={this.props.onCancelBlur}
                onMouseDown={this.props.onCancelBlur}>
                    {this.renderMonthSelector()}
                    {this.renderYearSelector()}
                </td>

                <td onClick={this.props.onNextClick}>
                    <span className={nextClassName}></span>
                </td>
            </tr>
        );
    }

    renderMonthSelector() {
        const date = this.props.selectedMonth;
        const className = 'react-ui-date-picker-calendar-month-selector';
        const monthOptions = this.props.monthNames.map((name, i) => (
            <option key={i} value={i}>
                {name}
            </option>
        ));

        return (
            <select
            className={className}
            onBlur={this.props.onCancelBlur}
            onChange={this.props.onChangeMonth}
            onFocus={this.props.onCancelBlur}
            onMouseDown={this.props.onCancelBlur}
            onClick={this.props.onCancelBlur}
            value={date.getMonth()}>
                {monthOptions}
            </select>
        );
    }

    renderYearSelector() {
        const date = this.props.selectedMonth;
        const className = 'react-ui-date-picker-calendar-year-selector';
        const yearOptions = this.getYears().map((year, i) => (
            <option key={i} value={year}>
                {year}
            </option>
        ));

        return (
            <select
            className={className}
            onBlur={this.props.onCancelBlur}
            onChange={this.props.onChangeYear}
            onFocus={this.props.onCancelBlur}
            onMouseDown={this.props.onCancelBlur}
            onClick={this.props.onCancelBlur}
            value={date.getFullYear()}>
                {yearOptions}
            </select>
        );
    }

    renderSubHeader() {
        return this.props.dayNames.map((name) => name[0]).map((name, i) => (
            <td key={i}
            onClick={this.props.onCancelBlur}
            onMouseDown={this.props.onCancelBlur}>
                {name}
            </td>
        ));
    }

    renderBody() {
        return chunk(this.getDates(), 7).map((week, i) => {
            const days = week.map((day, j) => {
                const disabled = this.isDateDisabled(day);
                const value = this.props.value;
                const today = this.props.today;
                const currentDayClass = (
                    this.datesEqual(day, today) ?
                    'react-ui-date-picker-calendar-current-day' :
                    null
                );
                const disabledDayClass = (
                    disabled ?
                    'react-ui-date-picker-calendar-disabled-day' :
                    null
                );
                const selectedDayClass = (
                    value && this.datesEqual(day, value) ?
                    'react-ui-date-picker-calendar-selected-day' :
                    null
                );
                const selectedMonthClass = (
                    this.props.selectedMonth.getMonth() === day.getMonth() ?
                    'react-ui-date-picker-calendar-selected-month' :
                    null
                );
                const dayClassName = getClassName(
                    'react-ui-date-picker-calendar-day',
                    currentDayClass,
                    selectedMonthClass,
                    disabledDayClass,
                    selectedDayClass
                );

                return (
                    <td
                    className={dayClassName}
                    disabled={disabled}
                    key={j}
                    onClick={this.props.onDateClick.bind(null, day, disabled)}
                    onMouseDown={this.props.onCancelBlur}>
                        {day.getDate()}
                    </td>
                );
            });

            return (
                <tr
                className="react-ui-date-picker-calendar-week"
                key={i}>
                    {days}
                </tr>
            );
        });
    }

    getDates() {
        const startDate = this.getStartDate();
        const dates = [startDate];

        while (dates.length < 42) {
            dates.push(this.addDays(dates[dates.length - 1], 1));
        }

        return dates;
    }

    datesEqual(a, b) {
        return (
            a.getDate() === b.getDate() &&
            a.getMonth() === b.getMonth() &&
            a.getFullYear() === b.getFullYear()
        );
    }

    addDays(d, n) {
        const date = new Date(d);

        date.setDate(date.getDate() + n);

        return date;
    }

    getStartDate() {
        const date = new Date(
            this.props.selectedMonth.getFullYear(),
            this.props.selectedMonth.getMonth(),
            1
        );

        while (date.getDay() !== 0) {
            date.setDate(date.getDate() - 1);
        }

        return date;
    }

    getYears() {
        const years = [this.props.minValue.getFullYear()];
        const maxYear = this.props.maxValue.getFullYear();

        while (years[years.length - 1] < maxYear) {
            years.push(years[years.length - 1] + 1);
        }

        return years;
    }

    isDateDisabled(date) {
        return (
            this.props.isDateDisabled(date) ||
            (this.props.maxValue && date > this.props.maxValue) ||
            (this.props.minValue && date < this.props.minValue)
        );
    }
}

export default Calendar;
