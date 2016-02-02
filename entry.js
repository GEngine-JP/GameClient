var React = require('react');
var ReactDOM = require('react-dom');
var FormControl = require('rctui/FormControl');
var FormComponent = React.createClass({
    render: function () {
        return (
            <FormControl
                required={true}
                maxValue={10}
                tip="亲，给个好评吧"
                type="rating"
                icons={[<Icon icon="favorite-outline" style={{color: 'red'}} />, <Icon icon="favorite" style={{color: 'red'}} />]}
            />
        )
    }
});
ReactDOM.render(<FormComponent/>,document.getElementById("app"));