import Mingus from 'mingus';
import React from 'react';

import SearchBox from '../SearchBox';
import {KEY_CODES, request} from '../../../utils';


Mingus.createTestCase('SearchBoxTest', {
    testRender() {
        const rendered = this.renderComponent(<SearchBox />);

        this.assertIsType(rendered, 'div');
    },

    testComponentWillUnmount() {
        const component = this.createComponent(<SearchBox />);

        component.delayBlur = {cancel: this.stub()};
        component.delaySearch = {cancel: this.stub()};

        component.componentWillUnmount();
        this.assertEqual(component.delayBlur.cancel.callCount, 1);
        this.assertEqual(component.delaySearch.cancel.callCount, 1);
    },

    testRenderDropDown() {
        const component = this.createComponent(<SearchBox />);

        component.state.showDropDown = true;
        component.state.results = ['a', 'b', 'c'];

        const renderedDropDown = component.renderDropDown();

        this.assertNumChildren(renderedDropDown, 3);
    },

    testRenderDropDownSelectedResult() {
        const component = this.createComponent(<SearchBox />);

        component.state.showDropDown = true;
        component.state.results = ['a', 'b', 'c'];
        component.state.selectedIndex = 1;

        const renderedDropDown = component.renderDropDown();

        this.assertNumChildren(renderedDropDown, 3);
        this.assertHasClass(
            this.getChildren(renderedDropDown)[1],
            'react-ui-search-box-result'
        );
        this.assertHasClass(
            this.getChildren(renderedDropDown)[1],
            'react-ui-search-box-result-selected'
        );
    },

    testOnBlur() {
        const component = this.createComponent(<SearchBox />);

        this.stub(component, 'hideDropDown');

        component.onBlur();
        this.assertEqual(component.hideDropDown.callCount, 1);

        component.canHideDropDown = false;
        component.onBlur();
        this.assertEqual(component.hideDropDown.callCount, 1);
    },

    testOnKeyDown() {
        const mockEvt = {};
        const component = this.createComponent(<SearchBox />);

        this.stub(component, 'onChange');
        this.stub(component, 'selectIndex');

        component.onKeyDown(mockEvt);
        this.assertEqual(component.onChange.callCount, 0);
        this.assertEqual(component.selectIndex.callCount, 0);

        mockEvt.keyCode = KEY_CODES.ARROW_DOWN;
        component.onKeyDown(mockEvt);
        this.assertEqual(component.onChange.callCount, 0);
        this.assertEqual(component.selectIndex.callCount, 1);
        this.assertTrue(component.selectIndex.calledWith(0));

        mockEvt.keyCode = KEY_CODES.ARROW_UP;
        component.onKeyDown(mockEvt);
        this.assertEqual(component.onChange.callCount, 0);
        this.assertEqual(component.selectIndex.callCount, 2);
        this.assertTrue(component.selectIndex.calledWith(-2));

        mockEvt.keyCode = KEY_CODES.ENTER;
        component.state.selectedIndex = 1;
        component.state.results = ['a', 'b', 'c'];
        component.onKeyDown(mockEvt);
        this.assertEqual(component.onChange.callCount, 1);
        this.assertEqual(component.selectIndex.callCount, 2);
        this.assertTrue(component.onChange.calledWith('b', mockEvt));
    },

    testOnChange() {
        const onChange = this.stub();
        const component = this.createComponent(
            <SearchBox onChange={onChange} />
        );
        const mockEvt = {stopPropagation: this.stub()};

        component.delayBlur = {cancel: this.stub()};
        this.stub(component, 'select');
        this.stub(component, 'hideDropDown');

        component.onChange('mock result', mockEvt);
        this.assertEqual(component.delayBlur.cancel.callCount, 1);
        this.assertEqual(onChange.callCount, 1);
        this.assertEqual(component.select.callCount, 1);
        this.assertEqual(component.hideDropDown.callCount, 1);
        this.assertTrue(onChange.calledWith(mockEvt, 'mock result'));
        this.assertTrue(component.select.calledWith('mock result'));
    },

    testOnDropDownMouseDown() {
        const component = this.createComponent(<SearchBox />);

        component.canHideDropDown = true;
        component.onDropDownMouseDown();
        this.assertFalse(component.canHideDropDown);
    },

    testOnDropDownMouseUp() {
        const component = this.createComponent(<SearchBox />);

        component.canHideDropDown = false;
        component.onDropDownMouseUp();
        this.assertTrue(component.canHideDropDown);
    },

    testOnResponse() {
        const onResponse = this.stub();
        const parseResults = this.stub();
        const component = this.createComponent(
            <SearchBox
            onResponse={onResponse}
            parseResults={parseResults} />
        );

        this.stub(component, 'setState');
        parseResults.returns('mock results');

        component.onResponse('mock err', 'mock req');
        this.assertEqual(parseResults.callCount, 1);
        this.assertEqual(onResponse.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(parseResults.calledWith('mock req'));
        this.assertTrue(
            onResponse.calledWith('mock err', 'mock req', 'mock results')
        );
        this.assertTrue(component.setState.calledWith({
            results: 'mock results',
            selectedIndex: -1,
            showDropDown: true
        }));
    },

    testOnResponseNoResults() {
        const onResponse = this.stub();
        const parseResults = this.stub();
        const component = this.createComponent(
            <SearchBox
            onResponse={onResponse}
            parseResults={parseResults} />
        );

        this.stub(component, 'setState');
        parseResults.returns(null);

        component.onResponse('mock err', 'mock req');
        this.assertEqual(parseResults.callCount, 1);
        this.assertEqual(onResponse.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(parseResults.calledWith('mock req'));
        this.assertTrue(
            onResponse.calledWith('mock err', 'mock req', [])
        );
        this.assertTrue(component.setState.calledWith({
            results: [],
            selectedIndex: -1,
            showDropDown: true
        }));
    },

    testOnSearch() {
        const mockNode = {value: 'mock value'};
        const onSearch = this.stub();
        const getUrl = () => '/mock/url/';
        const component = this.createComponent(
            <SearchBox
            getUrl={getUrl}
            onSearch={onSearch} />
        );

        this.stub(request, 'get');

        component.refs = {search: mockNode};
        component.onSearch('mock evt');
        this.assertEqual(onSearch.callCount, 1);
        this.assertEqual(request.get.callCount, 1);
        this.assertTrue(request.get.calledWith(
            '/mock/url/',
            component.onResponse
        ));
    },

    testOnSearchEmpty() {
        const mockNode = {value: ''};
        const onSearch = this.stub();
        const component = this.createComponent(
            <SearchBox onSearch={onSearch} />
        );

        this.stub(component, 'hideDropDown');

        component.refs = {search: mockNode};
        component.onSearch('mock evt');
        this.assertEqual(component.hideDropDown.callCount, 1);
    },

    testSelect() {
        const component = this.createComponent(
            <SearchBox queryParam="query" url="/mock/url/" />
        );

        this.stub(component, 'setState');

        component.select('mock value');
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            value: 'mock value'
        }));
    },

    testSelectIndex() {
        const component = this.createComponent(
            <SearchBox queryParam="query" url="/mock/url/" />
        );

        this.stub(component, 'setState');
        component.state.results = ['a', 'b', 'c'];

        component.selectIndex(1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            selectedIndex: 1
        }));

        component.selectIndex(-2);
        this.assertEqual(component.setState.callCount, 2);
        this.assertTrue(component.setState.calledWith({
            selectedIndex: 0
        }));

        component.selectIndex(10);
        this.assertEqual(component.setState.callCount, 3);
        this.assertTrue(component.setState.calledWith({
            selectedIndex: 2
        }));
    },

    testHideDropDown() {
        const component = this.createComponent(
            <SearchBox queryParam="query" url="/mock/url/" />
        );

        this.stub(component, 'setState');

        component.hideDropDown();
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            showDropDown: false
        }));
    },

    testShowDropDown() {
        const component = this.createComponent(
            <SearchBox queryParam="query" url="/mock/url/" />
        );

        this.stub(component, 'setState');

        component.showDropDown();
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            showDropDown: true
        }));
    },

    testParseResults() {
        const component = this.createComponent(
            <SearchBox />
        );

        this.assertEqual(
            component.parseResults('mock results'),
            'mock results'
        );
    },

    testParseResultsCustom() {
        const parseResults = (req) => {
            const results = JSON.parse(req.responseText);

            results.forEach((result, i) => result.id = i + 1);

            return results;
        };
        const component = this.createComponent(
            <SearchBox parseResults={parseResults} />
        );
        const req = {
            responseText: JSON.stringify([{
                age: 28,
                name: 'Cool McCool'
            }])
        };

        this.assertDeepEqual(component.parseResults(req), [{
            age: 28,
            id: 1,
            name: 'Cool McCool'
        }]);
    }
});
