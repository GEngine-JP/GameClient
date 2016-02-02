import Mingus from 'mingus';
import React from 'react';

import fixtures from './fixtures';
import Header from '../Header';


Mingus.createTestCase('HeaderTest', {
    testRender() {
        const columnIndex = 0;
        const column = fixtures.columns[columnIndex];
        const rendered = this.renderComponent(
            <Header
            column={column}
            columnIndex={columnIndex} />
        );
        const title = this.getChildren(rendered)[0];

        this.assertIsType(rendered, 'th');
        this.assertIsType(title, 'span');
        this.assertEqual(title.props.title, 'This is the user id.');
    },

    testOnClick() {
        const onHeaderClick = this.stub();
        const columnIndex = 1;
        const column = fixtures.columns[columnIndex];
        const component = this.createComponent(
            <Header
            column={column}
            columnIndex={columnIndex}
            onHeaderClick={onHeaderClick} />
        );

        this.stub(component, 'setState');

        component.onClick('mock evt');
        this.assertEqual(onHeaderClick.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(onHeaderClick.calledWith(
            'mock evt',
            column,
            columnIndex,
            undefined,
            undefined,
            1
        ));
        this.assertTrue(component.setState.calledWith({numClicks: 1}));
    },

    testGetClassName() {
        const columnIndex = 0;
        const column = fixtures.columns[columnIndex];
        const component = this.createComponent(
            <Header
            activeHeader={0}
            column={column}
            columnIndex={columnIndex} />
        );

        this.assertEqual(
            component.getClassName(),
            'react-ui-grid-header react-ui-grid-header-active'
        );
    }
});
