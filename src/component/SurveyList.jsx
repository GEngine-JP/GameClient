var React = require('react/addons');
var Immutable = require('immutable');
var CheckboxWithLabel = require('./CheckboxWithLabel.jsx');

var SurveyList = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    getInitialState: function() {
        return Immutable.fromJS({
            items: [
                {
                    id: 0,
                    text: "你喜欢吃萝卜吗？",
                    on: "喜欢",
                    off: "不喜欢",
                    checked: false
                }, 
                {
                    id: 1,
                    text: "你喜欢吃西瓜吗？",
                    on: "喜欢",
                    off: "不喜欢",
                    checked: false
                }, 
                {
                    id: 2,
                    text: "你喜欢吃香蕉吗？",
                    on: "喜欢",
                    off: "不喜欢",
                    checked: false
                } 
            ]
        });
    },
    onChange: function(labelId) {
        var newState = this.state.setIn(["items", labelId, "checked"], !this.state.getIn(["items", labelId, "checked"]));
        this.replaceState(newState);
    },
    render: function() {
        var that = this;
        return (
            <div>
                {
                    this.state.get("items").map(function(label) {
                        return <div><CheckboxWithLabel label={label} onChange={that.onChange.bind(that)}></CheckboxWithLabel></div>
                    })
                }
            </div>);
    }
});

module.exports = SurveyList;
