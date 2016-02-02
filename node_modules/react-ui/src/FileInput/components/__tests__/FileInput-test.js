import Mingus from 'mingus';
import React from 'react';

import FileInput from '../FileInput';


Mingus.createTestCase('FileInputTest', {
    testRender() {
        const rendered = this.renderComponent(
            <FileInput className="test-file-input" />
        );

        this.assertIsType(rendered, 'div');
        this.assertHasClass(rendered, 'react-ui-file-input');
        this.assertHasClass(rendered, 'test-file-input');
        this.assertNumChildren(rendered, 4);
    },

    testRenderHiddenFileInput() {
        const component = this.createComponent(
            <FileInput name="photo" />
        );
        const rendered = component.render();
        const input = this.getChildren(rendered)[0];

        this.assertIsType(input, 'input');
        this.assertEqual(input.props.type, 'file');
        this.assertEqual(input.props.name, 'photo');
        this.assertEqual(input.props.style.display, 'none');
        this.assertEqual(input.props.onChange, component.onChange);
    },

    testRenderChooseButton() {
        const component = this.createComponent(
            <FileInput chooseClassName="cool-btn" />
        );
        const rendered = component.render();
        const button = this.getChildren(rendered)[1];

        this.assertIsType(button, 'button');
        this.assertHasClass(button, 'react-ui-file-input-choose');
        this.assertHasClass(button, 'cool-btn');
        this.assertEqual(button.props.onClick, component.onChooseClick);
    },

    testRenderClearButton() {
        const component = this.createComponent(
            <FileInput clearClassName="neat-btn" />
        );
        const rendered = component.render();
        const button = this.getChildren(rendered)[2];

        this.assertIsType(button, 'button');
        this.assertHasClass(button, 'react-ui-file-input-clear');
        this.assertHasClass(button, 'neat-btn');
        this.assertEqual(button.props.onClick, component.onClearClick);
    },

    testRenderTextInput() {
        const component = this.createComponent(
            <FileInput placeholder="neat.png" />
        );
        const rendered = component.render();
        const input = this.getChildren(rendered)[3];

        this.assertIsType(input, 'input');
        this.assertEqual(input.props.type, 'text');
        this.assertEqual(input.props.placeholder, 'neat.png');
        this.assertEqual(input.props.onClick, component.onChooseClick);
        this.assertTrue(input.props.readOnly);
    },

    testDisabledInputs() {
        const rendered = this.renderComponent(
            <FileInput disabled={true} />
        );
        const children = this.getChildren(rendered);

        children.forEach((child) => this.assertTrue(child.props.disabled));
    },

    testHiddenControls() {
        const rendered = this.renderComponent(
            <FileInput
            showChooseButton={false}
            showClearButton={false}
            showInput={false} />
        );
        const children = this.getChildren(rendered);

        this.assertNull(children[1]);
        this.assertNull(children[2]);
        this.assertNull(children[3]);
        this.assertNotNull(children[0], 'input');
    },

    testOnChange() {
        const onChange = this.stub();
        const mockEvt = {target: {value: 'path\\cool.jpg'}};
        const component = this.createComponent(
            <FileInput onChange={onChange} />
        );

        this.stub(component, 'setState');

        component.onChange(mockEvt);
        this.assertEqual(onChange.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(onChange.calledWith(mockEvt, 'cool.jpg'));
        this.assertTrue(component.setState.calledWith({
            inputDisplay: 'cool.jpg'
        }));
    },

    testOnChooseClick() {
        const onChooseClick = this.stub();
        const mockEvt = {preventDefault: this.stub()};
        const fileInput = {click: this.stub()};
        const component = this.createComponent(
            <FileInput onChooseClick={onChooseClick} />
        );

        component.refs = {fileInput: fileInput};

        component.onChooseClick(mockEvt);
        this.assertEqual(mockEvt.preventDefault.callCount, 1);
        this.assertEqual(onChooseClick.callCount, 1);
        this.assertEqual(fileInput.click.callCount, 1);
        this.assertTrue(onChooseClick.calledWith(mockEvt));
    },

    testOnClearClick() {
        const onClearClick = this.stub();
        const mockEvt = {preventDefault: this.stub()};
        const component = this.createComponent(
            <FileInput onClearClick={onClearClick} />
        );

        this.stub(component, 'clear');

        component.onClearClick(mockEvt);
        this.assertEqual(mockEvt.preventDefault.callCount, 1);
        this.assertEqual(onClearClick.callCount, 1);
        this.assertEqual(component.clear.callCount, 1);
        this.assertTrue(onClearClick.calledWith(mockEvt));
    },

    testClear() {
        const component = this.createComponent(
            <FileInput />
        );

        this.stub(component, 'setState');

        component.clear();
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            inputDisplay: '',
            inputKey: component.state.inputKey + 1
        }));
    }
});
