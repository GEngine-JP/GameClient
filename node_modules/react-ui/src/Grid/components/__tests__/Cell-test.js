import Mingus from 'mingus';
import React from 'react';

import fixtures from './fixtures';
import Cell from '../Cell';


Mingus.createTestCase('CellTest', {
    testRender() {
        const rendered = this.renderComponent(
            <Cell
            activeCell={[0, 0]}
            columns={fixtures.columns}
            column={fixtures.columns[0]}
            record={fixtures.data[0]} />
        );

        this.assertIsType(rendered, 'td');
        this.assertNumChildren(rendered, 1);
    },

    testColumnRenderer() {
        const rendered = this.renderComponent(
            <Cell
            activeCell={[0, 0]}
            columns={fixtures.columns}
            column={fixtures.columns[1]}
            columnIndex={5}
            record={fixtures.data[0]}
            rowIndex={4} />
        );
        const content = this.getChildren(this.getChildren(rendered)[0]);

        this.assertSomeChildIsType(rendered, 'div');
        this.assertNumChildren(rendered, 1);
        this.assertEqual(content, 'My name is Cool McCool - column: 5 row: 4');
    },

    testOnClick() {
        const onCellClick = this.stub();
        const component = this.createComponent(
            <Cell
            activeCell={[0, 0]}
            column={fixtures.columns[0]}
            columnIndex={0}
            onCellClick={onCellClick}
            record={fixtures.data[0]}
            rowIndex={0} />
        );

        this.stub(component, 'setState');

        component.onClick('mock evt');
        this.assertEqual(onCellClick.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(onCellClick.calledWith(
            'mock evt',
            fixtures.columns[0],
            0,
            0,
            fixtures.data[0],
            1
        ));
        this.assertTrue(component.setState.calledWith({
            numClicks: 1
        }));
    },

    testGetClassName() {
        const component = this.createComponent(
            <Cell
            activeCell={[0, 0]}
            column={fixtures.columns[0]}
            columnIndex={0}
            record={fixtures.data[0]}
            rowIndex={0} />
        );

        this.assertEqual(
            component.getClassName(),
            'react-ui-grid-cell react-ui-grid-cell-active'
        );
    }
});
