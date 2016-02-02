var React = require('react/addons');
var CheckboxWithLabel = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.label !== this.props.label;
    },
    onChange: function() {
        this.props.onChange(this.props.label.get("id"));
    },
    render: function() {
        return (
            <label>
                {this.props.label.get("text")}
                <input type = "checkbox" checked={this.props.label.get("checked")} onChange={this.onChange}/> 
                {this.props.label.get("checked") ? this.props.label.get("on") : this.props.label.get("off")} 
            </label>);
    }
});

module.exports = CheckboxWithLabel;
