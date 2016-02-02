import Mingus from 'mingus';
import React from 'react';

import DatePicker from '../DatePicker';


Mingus.createTestCase('DatePickerTest', {
    testRender() {
        const rendered = this.renderComponent(<DatePicker />);

        this.assertIsType(rendered, 'div');
        this.assertNumChildren(rendered, 3);
    },

    testComponentWillUnmount() {
        const component = this.createComponent(<DatePicker />);

        component.delayBlur = {cancel: this.stub()};
        component.componentWillUnmount();
        this.assertEqual(component.delayBlur.cancel.callCount, 1);
    },

    testRenderDefaultValue() {
        const date = new Date(2015, 6, 1);
        const rendered = this.renderComponent(
            <DatePicker defaultValue={date} />
        );
        const input = this.getChildren(rendered)[0];

        this.assertEqual(input.props.value, '2015-7-1');
    },

    testRenderOpenDropDown() {
        const component = this.createComponent(<DatePicker />);

        component.state.showCalendar = true;
        this.assertHasClass(component.render(), 'react-ui-date-picker-open');
    },

    testOnBlur() {
        const component = this.createComponent(<DatePicker />);

        this.stub(component, 'hideCalendar');

        component.onBlur();
        this.assertEqual(component.hideCalendar.callCount, 1);
    },

    testOnBlurCanNotHide() {
        const component = this.createComponent(<DatePicker />);

        this.stub(component, 'hideCalendar');

        component.canHideCalendar = false;
        component.onBlur();
        this.assertEqual(component.hideCalendar.callCount, 0);
    },

    testOnClearClick() {
        const onClearClick = this.stub();
        const component = this.createComponent(
            <DatePicker onClearClick={onClearClick} />
        );
        const mockEvt = {stopPropagation: this.stub()};

        this.stub(component, 'clear');

        component.onClearClick(mockEvt);
        this.assertEqual(mockEvt.stopPropagation.callCount, 1);
        this.assertEqual(onClearClick.callCount, 1);
        this.assertEqual(component.clear.callCount, 1);
        this.assertTrue(onClearClick.calledWith(mockEvt));
    },

    testOnClick() {
        const onClick = this.stub();
        const component = this.createComponent(
            <DatePicker onClick={onClick} />
        );

        this.stub(component, 'hideCalendar');
        this.stub(component, 'showCalendar');

        component.onClick('mock evt');
        this.assertEqual(onClick.callCount, 1);
        this.assertEqual(component.hideCalendar.callCount, 0);
        this.assertEqual(component.showCalendar.callCount, 1);
        this.assertTrue(onClick.calledWith('mock evt', false));

        component.state.showCalendar = true;
        component.onClick('mock evt');
        this.assertEqual(onClick.callCount, 2);
        this.assertEqual(component.showCalendar.callCount, 1);
        this.assertEqual(component.hideCalendar.callCount, 1);
        this.assertTrue(onClick.calledWith('mock evt', true));
    },

    testOnClickDisabled() {
        const onClick = this.stub();
        const component = this.createComponent(
            <DatePicker disabled={true} onClick={onClick} />
        );

        this.stub(component, 'hideCalendar');
        this.stub(component, 'showCalendar');

        component.onClick('mock evt');
        this.assertEqual(onClick.callCount, 0);
        this.assertEqual(component.hideCalendar.callCount, 0);
        this.assertEqual(component.showCalendar.callCount, 0);
    },

    testOnCalendarMouseDown() {
        const component = this.createComponent(<DatePicker />);

        this.assertTrue(component.canHideCalendar);
        component.onCalendarMouseDown();
        this.assertFalse(component.canHideCalendar);
    },

    testOnCalendarMouseUp() {
        const component = this.createComponent(<DatePicker />);

        component.canHideCalender = false;
        component.onCalendarMouseUp();
        this.assertTrue(component.canHideCalendar);
    },

    testOnCancelBlur() {
        const component = this.createComponent(<DatePicker />);
        const mockEvt = {stopPropagation: this.stub()};

        component.delayBlur = {cancel: this.stub()};

        component.onCancelBlur(mockEvt);
        this.assertEqual(mockEvt.stopPropagation.callCount, 1);
        this.assertEqual(component.delayBlur.cancel.callCount, 1);
    },

    testOnDateClick() {
        const mockEvt = {stopPropagation: this.stub()};
        const onDateClick = this.stub();
        const component = this.createComponent(
            <DatePicker onDateClick={onDateClick} />
        );
        const date = new Date(2015, 1, 3);

        this.stub(component, 'setState');
        component.delayBlur = {cancel: this.stub()};

        component.onDateClick(date, true, mockEvt);
        this.assertEqual(mockEvt.stopPropagation.callCount, 1);
        this.assertEqual(component.delayBlur.cancel.callCount, 1);
        this.assertEqual(onDateClick.callCount, 0);
        this.assertEqual(component.setState.callCount, 0);

        component.onDateClick(date, false, mockEvt);
        this.assertEqual(mockEvt.stopPropagation.callCount, 2);
        this.assertEqual(component.delayBlur.cancel.callCount, 2);
        this.assertEqual(onDateClick.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(onDateClick.calledWith(mockEvt, date));
        this.assertTrue(component.setState.calledWith({
            selectedMonth: new Date(2015, 1, 1),
            showCalendar: false,
            value: date
        }));
    },

    testOnChangeMonth() {
        const mockEvt = {
            stopPropagation: this.stub(),
            target: {
                options: [{value: 4}],
                selectedIndex: 0
            }
        };
        const date = new Date(2015, 1, 1);
        const component = this.createComponent(
            <DatePicker defaultValue={date} />
        );

        component.delayBlur = {cancel: this.stub()};
        this.stub(component, 'setState');

        component.onChangeMonth(mockEvt);
        this.assertEqual(mockEvt.stopPropagation.callCount, 1);
        this.assertEqual(component.delayBlur.cancel.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            selectedMonth: new Date(2015, 4, 1)
        }));
    },

    testOnChangeYear() {
        const mockEvt = {
            stopPropagation: this.stub(),
            target: {
                options: [{value: 1987}],
                selectedIndex: 0
            }
        };
        const date = new Date(2015, 1, 1);
        const component = this.createComponent(
            <DatePicker defaultValue={date} />
        );

        component.delayBlur = {cancel: this.stub()};
        this.stub(component, 'setState');

        component.onChangeYear(mockEvt);
        this.assertEqual(mockEvt.stopPropagation.callCount, 1);
        this.assertEqual(component.delayBlur.cancel.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            selectedMonth: new Date(1987, 1, 1)
        }));
    },

    testOnNextClick() {
        const mockEvt = {stopPropagation: this.stub()};
        const date = new Date(2015, 0, 8);
        const component = this.createComponent(
            <DatePicker defaultValue={date} />
        );

        component.delayBlur = {cancel: this.stub()};
        this.stub(component, 'setState');

        component.onNextClick(mockEvt);
        this.assertEqual(mockEvt.stopPropagation.callCount, 1);
        this.assertEqual(component.delayBlur.cancel.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            selectedMonth: new Date(2015, 1, 1)
        }));
    },

    testOnPreviousClick() {
        const mockEvt = {stopPropagation: this.stub()};
        const date = new Date(2015, 0, 8);
        const component = this.createComponent(
            <DatePicker defaultValue={date} />
        );

        component.delayBlur = {cancel: this.stub()};
        this.stub(component, 'setState');

        component.onPreviousClick(mockEvt);
        this.assertEqual(mockEvt.stopPropagation.callCount, 1);
        this.assertEqual(component.delayBlur.cancel.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            selectedMonth: new Date(2014, 11, 1)
        }));
    },

    testClear() {
        const component = this.createComponent(<DatePicker />);

        this.stub(component, 'setState');

        component.clear();
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            value: undefined
        }));
    },

    testHideCalendar() {
        const component = this.createComponent(<DatePicker />);

        this.stub(component, 'setState');

        component.hideCalendar();
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            showCalendar: false
        }));
    },

    testShowCalendar() {
        const component = this.createComponent(<DatePicker />);

        this.stub(component, 'setState');

        component.showCalendar();
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            showCalendar: true
        }));
    }
});
