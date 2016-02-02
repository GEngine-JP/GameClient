var React = require('react');
var Hello = React.createClass({
    render: function () {
        return (
            <div> hello</div>
        )
    }
});
React.render(<Hello/>, document.body);

