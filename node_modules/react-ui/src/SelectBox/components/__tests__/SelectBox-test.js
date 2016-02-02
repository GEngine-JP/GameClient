import Mingus from 'mingus';
import React from 'react';

import SelectBox from '../SelectBox';
import {KEY_CODES} from '../../../utils';


Mingus.createTestCase('SelectBoxTest', {
    testRender() {
        const rendered = this.renderComponent(
            <SelectBox>
                <option>1</option>
            </SelectBox>
        );

        this.assertIsType(rendered, 'div');
        this.assertHasClass(rendered, 'react-ui-select-box');
        this.assertNumChildren(rendered, 2);
    },

    testComponentWillUnMount() {
        const component = this.createComponent(<SelectBox />);

        component.delayBlur = {cancel: this.stub()};
        component.delaySearch = {cancel: this.stub()};

        component.componentWillUnmount();
        this.assertEqual(component.delayBlur.cancel.callCount, 1);
        this.assertEqual(component.delaySearch.cancel.callCount, 1);
    },

    testRenderValue() {
        const component = this.createComponent(<SelectBox />);

        component.state.value = {display: 'Cool', value: 55};

        const renderedValue = component.renderValue();
        const renderedChildren = this.getChildren(renderedValue);

        this.assertIsType(renderedValue, 'span');
        this.assertIsType(renderedChildren[0], 'input');
        this.assertEqual(renderedChildren[0].props.value, 55);
        this.assertEqual(renderedChildren[1], 'Cool');
    },

    testRenderSearch() {
        const options = [{display: 1, value: 1}, {display: 2, value: 2}];
        const component = this.createComponent(
            <SelectBox searchThreshold={1}>
                <option>1</option>
                <option>2</option>
            </SelectBox>
        );
        const search = component.renderSearch(options);

        this.assertIsType(search, 'div');
        this.assertIsType(this.getChildren(search)[0], 'input');
        this.assertNumChildren(search, 1);
    },

    testRenderSearchUnderThreshold() {
        const options = [{display: 1, value: 1}, {display: 2, value: 2}];
        const component = this.createComponent(
            <SelectBox searchThreshold={5}>
                <option>1</option>
                <option>2</option>
            </SelectBox>
        );

        this.assertNull(component.renderSearch(options));
    },

    testRenderOpen() {
        const component = this.createComponent(
            <SelectBox>
                <option>1</option>
            </SelectBox>
        );

        component.state.showDropDown = true;

        const rendered = component.render();

        this.assertHasClass(
            rendered,
            'react-ui-select-box'
        );
        this.assertHasClass(
            rendered,
            'react-ui-select-box-open'
        );
    },

    testRenderDropDownOneChild() {
        const component = this.createComponent(
            <SelectBox>
                <option>1</option>
            </SelectBox>
        );

        component.state.showDropDown = true;

        const renderedDropDown = component.renderDropDown();
        const renderedOptionsWrapper = this.getChildren(renderedDropDown)[1];
        const renderedOptions = this.getChildren(renderedOptionsWrapper);

        this.assertNumChildren(renderedOptionsWrapper, 1);
        this.assertText(renderedOptions[0], '1');
    },

    testRenderDropDownManyChildren() {
        const component = this.createComponent(
            <SelectBox>
                <option>1</option>
                <option>2</option>
            </SelectBox>
        );

        component.state.showDropDown = true;

        const renderedDropDown = component.renderDropDown();
        const renderedOptionsWrapper = this.getChildren(renderedDropDown)[1];
        const renderedOptions = this.getChildren(renderedOptionsWrapper);

        this.assertNumChildren(renderedOptionsWrapper, 2);
        this.assertText(renderedOptions[0], '1');
        this.assertText(renderedOptions[1], '2');
    },

    testRenderDropDownChildArray() {
        const options = [
            (<option key={0}>1</option>),
            (<option key={1}>2</option>)
        ];
        const component = this.createComponent(
            <SelectBox>
                {options}
            </SelectBox>
        );

        component.state.showDropDown = true;

        const renderedDropDown = component.renderDropDown();
        const renderedOptionsWrapper = this.getChildren(renderedDropDown)[1];
        const renderedOptions = this.getChildren(renderedOptionsWrapper);

        this.assertNumChildren(renderedOptionsWrapper, 2);
        this.assertText(renderedOptions[0], '1');
        this.assertText(renderedOptions[1], '2');
    },

    testRenderDropDownNoChildren() {
        const component = this.createComponent(
            <SelectBox />
        );

        component.state.showDropDown = true;

        const renderedDropDown = component.renderDropDown();

        this.assertNull(this.getChildren(renderedDropDown)[0]);
    },

    testRenderClearButton() {
        const component = this.createComponent(
            <SelectBox />
        );

        this.assertNull(component.renderClear());
        component.state.value = 'mock value';

        const clear = component.renderClear();

        this.assertHasClass(clear, 'react-ui-select-box-clear');
        this.assertEqual(clear.props.onClick, component.onClearClick);
    },

    testRenderOptions() {
        const options = [
            {display: 'A', value: 'A'},
            {display: 'B', value: 'B'}
        ];
        const component = this.createComponent(
            <SelectBox>
                <option>A</option>
                <option>B</option>
            </SelectBox>
        );

        component.state.value = {display: 'B', value: 'B'};
        component.state.highlightedIndex = 0;

        const renderedOptions = component.renderOptions(options);

        this.assertEqual(renderedOptions.length, 2);
        this.assertHasClass(
            renderedOptions[0],
            'react-ui-select-box-option'
        );
        this.assertHasClass(
            renderedOptions[0],
            'react-ui-select-box-option-highlighted'
        );
        this.assertHasClass(
            renderedOptions[1],
            'react-ui-select-box-option'
        );
        this.assertHasClass(
            renderedOptions[1],
            'react-ui-select-box-option-selected'
        );
    },

    testOnChange() {
        const onChange = this.stub();
        const component = this.createComponent(
            <SelectBox onChange={onChange} />
        );
        const mockEvt = {stopPropagation: this.stub()};

        component.delayBlur = {cancel: this.stub()};
        this.stub(component, 'setState');

        component.onChange('mock value', mockEvt);
        this.assertEqual(component.delayBlur.cancel.callCount, 1);
        this.assertEqual(onChange.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(onChange.calledWith(mockEvt, 'mock value'));
        this.assertTrue(component.setState.calledWith({
            highlightedIndex: -1,
            showDropDown: false,
            query: '',
            value: 'mock value'
        }));
    },

    testOnClearClick() {
        const onClearClick = this.stub();
        const component = this.createComponent(
            <SelectBox onClearClick={onClearClick} />
        );
        const mockEvt = {stopPropagation: this.stub()};

        this.stub(component, 'clear');
        component.delayBlur = {cancel: this.stub()};

        component.onClearClick(mockEvt);
        this.assertEqual(mockEvt.stopPropagation.callCount, 1);
        this.assertEqual(onClearClick.callCount, 1);
        this.assertEqual(component.clear.callCount, 1);
        this.assertEqual(component.delayBlur.cancel.callCount, 1);
        this.assertTrue(onClearClick.calledWith(mockEvt));
    },

    testOnClick() {
        const onClick = this.stub();
        const component = this.createComponent(
            <SelectBox onClick={onClick} />
        );

        this.stub(component, 'hideDropDown');
        this.stub(component, 'showDropDown');

        component.onClick('mock evt');
        this.assertEqual(onClick.callCount, 1);
        this.assertEqual(component.showDropDown.callCount, 1);
        this.assertEqual(component.hideDropDown.callCount, 0);
        this.assertTrue(onClick.calledWith('mock evt', false));

        component.state.showDropDown = true;
        component.onClick('mock evt');
        this.assertEqual(onClick.callCount, 2);
        this.assertEqual(component.showDropDown.callCount, 1);
        this.assertEqual(component.hideDropDown.callCount, 1);
        this.assertTrue(onClick.calledWith('mock evt', true));
    },

    testOnClickDisabled() {
        const onClick = this.stub();
        const component = this.createComponent(
            <SelectBox disabled={true} onClick={onClick} />
        );

        this.stub(component, 'hideDropDown');
        this.stub(component, 'showDropDown');

        const rendered = component.render();

        this.assertHasClass(
            rendered,
            'react-ui-select-box'
        );
        this.assertHasClass(
            rendered,
            'react-ui-select-box-disabled'
        );

        component.onClick('mock evt');
        this.assertEqual(onClick.callCount, 0);
        this.assertEqual(component.showDropDown.callCount, 0);
        this.assertEqual(component.hideDropDown.callCount, 0);

        component.state.showDropDown = true;
        component.onClick('mock evt');
        this.assertEqual(onClick.callCount, 0);
        this.assertEqual(component.showDropDown.callCount, 0);
        this.assertEqual(component.hideDropDown.callCount, 0);
    },

    testOnDropDownMouseDown() {
        const component = this.createComponent(<SelectBox />);

        component.canHideDropDown = true;
        component.onDropDownMouseDown();
        this.assertFalse(component.canHideDropDown);
    },

    testOnDropDownMouseUp() {
        const component = this.createComponent(<SelectBox />);

        component.canHideDropDown = false;
        component.onDropDownMouseUp();
        this.assertTrue(component.canHideDropDown);
    },

    testOnBlur() {
        const component = this.createComponent(<SelectBox />);

        this.stub(component, 'hideDropDown');
        this.stub(component, 'clearQuery');

        component.onBlur();
        this.assertEqual(component.hideDropDown.callCount, 1);
        this.assertEqual(component.clearQuery.callCount, 1);

        component.canHideDropDown = false;
        component.onBlur();
        this.assertEqual(component.hideDropDown.callCount, 1);
        this.assertEqual(component.clearQuery.callCount, 1);
    },

    testOnSearch() {
        const onSearch = this.stub();
        const component = this.createComponent(
            <SelectBox onSearch={onSearch} />
        );
        const mockNode = {value: 'Mock Value'};

        this.stub(component, 'setState');
        component.refs = {search: mockNode};

        component.onSearch();
        this.assertEqual(onSearch.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(onSearch.calledWith('mock value'));
        this.assertTrue(component.setState.calledWith({query: 'mock value'}));

        onSearch.returns(true);
        component.onSearch();
        this.assertEqual(onSearch.callCount, 2);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(onSearch.calledWith('mock value'));
    },

    testOnSearchFocus() {
        const component = this.createComponent(<SelectBox />);
        const mockEvt = {stopPropagation: this.stub()};

        component.delayBlur = {cancel: this.stub()};
        component.onSearchFocus(mockEvt);
        this.assertEqual(mockEvt.stopPropagation.callCount, 1);
    },

    testOnSearchKeyDown() {
        const mockEvt = {};
        const component = this.createComponent(<SelectBox />);

        this.stub(component, 'onChange');
        this.stub(component, 'highlightIndex');

        component.onSearchKeyDown([], mockEvt);
        this.assertEqual(component.onChange.callCount, 0);
        this.assertEqual(component.highlightIndex.callCount, 0);

        mockEvt.keyCode = KEY_CODES.ARROW_DOWN;
        component.onSearchKeyDown([], mockEvt);
        this.assertEqual(component.onChange.callCount, 0);
        this.assertEqual(component.highlightIndex.callCount, 1);
        this.assertTrue(component.highlightIndex.calledWith(0));

        mockEvt.keyCode = KEY_CODES.ARROW_UP;
        component.onSearchKeyDown([], mockEvt);
        this.assertEqual(component.onChange.callCount, 0);
        this.assertEqual(component.highlightIndex.callCount, 2);
        this.assertTrue(component.highlightIndex.calledWith(-2));

        mockEvt.keyCode = KEY_CODES.ENTER;
        component.state.highlightedIndex = 1;
        component.onSearchKeyDown(['a', 'b', 'c'], mockEvt);
        this.assertEqual(component.onChange.callCount, 1);
        this.assertEqual(component.highlightIndex.callCount, 2);
        this.assertTrue(component.onChange.calledWith('b', mockEvt));
    },

    testGetFilteredOptions() {
        const component = this.createComponent(
            <SelectBox>
                <option>1</option>
                <option value={2}>Two</option>
                <option>3</option>
                <option>Four</option>
            </SelectBox>
        );

        component.state.query = 'o';
        this.assertDeepEqual(component.filterOptions(), [{
            display: 'Two',
            value: 2
        }, {
            display: 'Four',
            value: 'Four'
        }]);
    },

    testGetFilteredOptionsNoProps() {
        const options = [{name: 'a'}, {name: 'b'}];
        const component = this.createComponent(
            <SelectBox displayProp="name" options={options} />
        );

        component.state.query = 'a';
        this.assertDeepEqual(component.filterOptions(), [{name: 'a'}]);
    },

    testIsOptionSelected() {
        const component = this.createComponent(
            <SelectBox />
        );

        this.assertFalse(component.isOptionSelected());
        this.assertFalse(component.isOptionSelected({}));
        component.state.value = {display: 'A', value: 'A'};
        this.assertTrue(component.isOptionSelected(
            {display: 'A', value: 'A'}
        ));
        this.assertFalse(component.isOptionSelected(
            {display: 'A', value: 'B'}
        ));
        this.assertFalse(component.isOptionSelected(
            {display: 'B', value: 'A'}
        ));
    },

    testHighlightIndex() {
        const component = this.createComponent(<SelectBox />);
        const options = ['a', 'b', 'c'];

        this.stub(component, 'setState');

        component.highlightIndex(1, options);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            highlightedIndex: 1
        }));

        component.highlightIndex(-2, options);
        this.assertEqual(component.setState.callCount, 2);
        this.assertTrue(component.setState.calledWith({
            highlightedIndex: 0
        }));

        component.highlightIndex(10, options);
        this.assertEqual(component.setState.callCount, 3);
        this.assertTrue(component.setState.calledWith({
            highlightedIndex: 2
        }));
    },

    testClear() {
        const component = this.createComponent(<SelectBox />);

        this.stub(component, 'setState');

        component.clear();
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            highlightedIndex: -1,
            value: undefined
        }));
    },

    testClearQuery() {
        const component = this.createComponent(<SelectBox />);

        this.stub(component, 'setState');

        component.clearQuery();
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({query: ''}));
    },

    testHideDropDown() {
        const component = this.createComponent(<SelectBox />);

        this.stub(component, 'setState');

        component.hideDropDown();
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({showDropDown: false}));
    },

    testShowDropDown() {
        const component = this.createComponent(<SelectBox />);

        this.stub(component, 'setState');

        component.showDropDown();
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({showDropDown: true}));
    }
});
