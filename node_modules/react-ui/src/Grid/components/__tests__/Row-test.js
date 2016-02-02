import Mingus from 'mingus';
import React from 'react';

import fixtures from './fixtures';
import Row from '../Row';


Mingus.createTestCase('RowTest', {
    testRender() {
        const rendered = this.renderComponent(
            <Row
            columns={fixtures.columns}
            rowIndex={0} />
        );

        this.assertIsType(rendered, 'tr');
        this.assertHasClass(rendered, 'react-ui-grid-row');
    },

    testOnClick() {
        const onRowClick = this.stub();
        const component = this.createComponent(
            <Row
            columns={fixtures.columns}
            onRowClick={onRowClick}
            rowIndex={1} />
        );

        this.stub(component, 'setState');

        component.onClick('mock evt');
        this.assertEqual(onRowClick.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(onRowClick.calledWith(
            'mock evt',
            undefined,
            undefined,
            1,
            undefined,
            1
        ));
        this.assertTrue(component.setState.calledWith({numClicks: 1}));
    },

    testGetClassName() {
        const component = this.createComponent(
            <Row
            activeRow={1}
            columns={fixtures.columns}
            rowIndex={1} />
        );

        this.assertEqual(
            component.getClassName(),
            'react-ui-grid-row react-ui-grid-row-active'
        );
    }
});
