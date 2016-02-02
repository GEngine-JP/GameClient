import Mingus from 'mingus';
import React from 'react';

import fixtures from './fixtures';
import Grid from '../Grid';


Mingus.createTestCase('GridTest', {
    testRender() {
        const rendered = this.renderComponent(
            <Grid columns={fixtures.columns} data={fixtures.data} />
        );
        const header = this.getChildren(rendered)[0];
        const body = this.getChildren(rendered)[1];

        this.assertIsType(rendered, 'table');
        this.assertIsType(header, 'thead');
        this.assertIsType(body, 'tbody');
        this.assertNumChildren(body, 3);
    },

    testOnCellClick() {
        const onCellClick = this.stub();
        const component = this.createComponent(
            <Grid
            columns={fixtures.columns}
            data={fixtures.data}
            onCellClick={onCellClick} />
        );

        this.stub(component, 'setState');

        component.onCellClick(
            'mock evt',
            'mock column',
            1,
            2,
            'mock record',
            3
        );
        this.assertEqual(onCellClick.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(onCellClick.calledWith(
            'mock evt',
            'mock column',
            1,
            2,
            'mock record',
            3
        ));
        this.assertTrue(component.setState.calledWith({
            activeCell: [1, 2]
        }));
    },

    testOnRowClick() {
        const onRowClick = this.stub();
        const component = this.createComponent(
            <Grid
            columns={fixtures.columns}
            data={fixtures.data}
            onRowClick={onRowClick} />
        );

        this.stub(component, 'setState');

        component.onRowClick(
            'mock evt',
            'mock column',
            1,
            2,
            'mock record',
            3
        );
        this.assertEqual(onRowClick.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(onRowClick.calledWith(
            'mock evt',
            'mock column',
            1,
            2,
            'mock record',
            3
        ));
        this.assertTrue(component.setState.calledWith({
            activeRow: 2
        }));
    },

    testOnHeaderClick() {
        const onHeaderClick = this.stub();
        const component = this.createComponent(
            <Grid
            columns={fixtures.columns}
            data={fixtures.data}
            onHeaderClick={onHeaderClick} />
        );

        this.stub(component, 'setState');

        component.onHeaderClick(
            'mock evt',
            'mock column',
            1,
            2,
            'mock record',
            3
        );
        this.assertEqual(onHeaderClick.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(onHeaderClick.calledWith(
            'mock evt',
            'mock column',
            1,
            2,
            'mock record',
            3
        ));
        this.assertTrue(component.setState.calledWith({
            activeHeader: 1
        }));
    }
});
