var React = require('react');
var ReactDOM = require('react-dom');
var ReactUI = require('rctui');
var Form = ReactUI.Form;
var FormComponent = React.createClass({
    render: function () {
        return (
            <Form layout="aligned" onSubmit={data => console.log(data)} data={dataSource("json/form.json")}>
                <FormControl name="text" label="text" type="text" grid={{width:12/24}} min={2} max={6}/>
                <FormControl name="email" label="email" type="email">
    <span className="rct-input-group">
      <span className="addon"><Icon icon="email"/></span>
      <Input type="email"/>
    </span>
                </FormControl>
                <FormControl name="checkbox" type="checkbox" text="It's a checkbox"/>
                <FormControl name="datetime" type="datetime" label="datetime"/>
                <FormControl name="radiogroup" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} label="radio group"
                             inline={true} type="radio-group"/>
                <FormControl name="rating" label="rating" required={true} maxValue={10} tip="亲，给个好评吧" type="rating"/>
                <FormControl name="tree" selectAble={true} label="tree" type="tree" data={dataSource("json/tree.json")}
                             textTpl='{text}({id})' valueTpl="{id}"/>
                <FormControl grid={{width:18/24}} name="textarea" label="textarea" rows={5} type="textarea"/>
                <FormControl label="upload" type="upload" autoUpload={true} grid={{width:12/24}} name="upload"
                             action="http://216.189.159.94:8080/upload" accept="image/*" limit={3}
                             content={<Button><Icon icon="upload" /> 选择文件</Button>}/>

                <FormSubmit>
                    <span>提交</span>
                    <span>处理中</span>
                </FormSubmit>
            </Form>
        )
    }
});
ReactDOM.render(<FormComponent/>,document.getElementById("app"));