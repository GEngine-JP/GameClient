var React = require('react');
var ReactDOM = require('react-dom');
var ReactUI = require('rctui');
var Form = ReactUI.Form;
var FormComponent = React.createClass({
    render: function () {
        return (
            <Form layout="aligned" onSubmit={data => console.log(data)} data={dataSource("json/form.json")}>
                <FormControl name="email" label="email" type="email">
                </FormControl>
                <FormControl name="datetime" type="datetime" label="datetime"/>
                <FormControl name="radiogroup" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} label="radio group"
                             inline={true} type="radio-group"/>
                <FormSubmit>
                    <span>提交</span>
                    <span>处理中</span>
                </FormSubmit>
            </Form>
        )
    }
});
ReactDOM.render(<FormComponent/>,document.getElementById("app"));