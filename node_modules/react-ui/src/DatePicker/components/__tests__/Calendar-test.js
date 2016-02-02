import Mingus from 'mingus';
import React from 'react';

import DatePicker from '../DatePicker';
import Calendar from '../Calendar';


Mingus.createTestCase('CalendarTest', {
    beforeEach() {
        this.selectedMonth = new Date(2015, 7, 1);
        this.today = new Date(2015, 7, 5);
        this.value = new Date(2015, 7, 1);
    },

    testRender() {
        const rendered = this.renderComponent(
            <Calendar
            {...DatePicker.defaultProps}
            selectedMonth={this.selectedMonth}
            today={this.today} />
        );

        this.assertIsType(rendered, 'table');
        this.assertNumChildren(rendered, 3);
    },

    testRenderCurrentDate() {
        const rendered = this.renderComponent(
            <Calendar
            {...DatePicker.defaultProps}
            selectedMonth={this.selectedMonth}
            today={this.value} />
        );
        const body = this.getChildren(rendered)[2];
        const dateRow = this.getChildren(body)[0];
        const date = this.getChildren(dateRow)[6];

        this.assertHasClass(
            date,
            'react-ui-date-picker-calendar-current-day'
        );
    },

    testRenderDisabledDates() {
        const component = this.createComponent(
            <Calendar
            {...DatePicker.defaultProps}
            selectedMonth={this.selectedMonth}
            today={this.today} />
        );

        this.stub(component, 'isDateDisabled', () => true);

        const rendered = component.render();
        const body = this.getChildren(rendered)[2];
        const dateRow = this.getChildren(body)[0];
        const date = this.getChildren(dateRow)[0];

        this.assertHasClass(
            date,
            'react-ui-date-picker-calendar-disabled-day'
        );
    },

    testRenderSelectedDates() {
        const rendered = this.renderComponent(
            <Calendar
            {...DatePicker.defaultProps}
            selectedMonth={this.selectedMonth}
            today={this.today}
            value={this.value} />
        );
        const body = this.getChildren(rendered)[2];
        const dateRow = this.getChildren(body)[0];
        const date = this.getChildren(dateRow)[6];

        this.assertHasClass(
            date,
            'react-ui-date-picker-calendar-selected-day'
        );
    },

    testGetDisabledDate() {
        const isDateDisabled = (date) => date.getDate() === 25;
        const maxValue = new Date(2015, 6, 1);
        const minValue = new Date(2015, 4, 1);
        const component = this.createComponent(
            <Calendar
            isDateDisabled={isDateDisabled}
            maxValue={maxValue}
            minValue={minValue} />
        );

        this.assertFalse(component.isDateDisabled(new Date(2015, 5, 1)));
        this.assertTrue(component.isDateDisabled(new Date(2015, 5, 25)));
        this.assertTrue(component.isDateDisabled(new Date(2015, 3, 1)));
        this.assertTrue(component.isDateDisabled(new Date(2015, 7, 1)));
    }
});
