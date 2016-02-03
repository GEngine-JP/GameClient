var React = require('react');
var ReactDOM = require('react-dom');
var FormComponent = React.createClass({
    render: function () {
        return (
            <div>hello</div>
        )
    }
});
ReactDOM.render(<FormComponent/>,document.getElementById("app"));