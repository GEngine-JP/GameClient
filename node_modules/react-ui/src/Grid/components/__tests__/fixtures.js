import React from 'react';


export default {
    columns: [{
        dataProp: 'id',
        name: 'Id',
        nameTooltip: 'This is the user id.'
    }, {
        dataProp: 'name',
        name: 'Name',
        nameTooltip: 'This is the user\'s name',
        render(record, column, row) {
            const message = (
                `My name is ${record.name} - ` +
                `column: ${column} ` +
                `row: ${row}`
            );

            return (
                <div>
                    {message}
                </div>
            );
        }
    }],
    data: [{
        id: 1,
        name: 'Cool McCool'
    }, {
        id: 2,
        name: 'Neat O\'Neatihan'
    }, {
        id: 2,
        name: 'Tim'
    }]
};
