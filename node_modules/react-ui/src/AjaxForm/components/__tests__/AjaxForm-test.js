import Mingus from 'mingus';
import React from 'react';

import AjaxForm from '../AjaxForm';
import {request} from '../../../utils';


Mingus.createTestCase('AjaxFormTest', {
    testRender() {
        const component = this.createComponent(
            <AjaxForm action="/login/" className="cool-form">
                <input />
                <button>Submit</button>
            </AjaxForm>
        );
        const rendered = component.render();

        this.assertIsType(rendered, 'form');
        this.assertHasClass(rendered, 'react-ui-ajax-form');
        this.assertHasClass(rendered, 'cool-form');
        this.assertEqual(rendered.props.action, '/login/');
        this.assertEqual(rendered.props.method, 'POST');
        this.assertEqual(rendered.props.onSubmit, component.onSubmit);
        this.assertNumChildren(rendered, 2);
        this.assertNthChildIsType(rendered, 0, 'input');
        this.assertNthChildIsType(rendered, 1, 'button');
    },

    testUrlInsteadOfAction() {
        const rendered = this.renderComponent(
            <AjaxForm url="/login/">
                <input />
                <button>Submit</button>
            </AjaxForm>
        );

        this.assertEqual(rendered.props.action, '/login/');
    },

    testOnResponse() {
        const onResponse = this.stub();
        const component = this.createComponent(
            <AjaxForm onResponse={onResponse} />
        );

        component.onResponse('mock error', 'mock response');
        this.assertEqual(onResponse.callCount, 1);
        this.assertTrue(onResponse.calledWith('mock error', 'mock response'));
    },

    testOnSubmit() {
        const onSubmit = this.stub();
        const mockEvt = {preventDefault: this.stub()};
        const component = this.createComponent(
            <AjaxForm onSubmit={onSubmit} />
        );

        this.stub(component, 'submit');

        component.onSubmit(mockEvt);
        this.assertEqual(mockEvt.preventDefault.callCount, 1);
        this.assertEqual(onSubmit.callCount, 1);
        this.assertEqual(component.submit.callCount, 1);
        this.assertTrue(onSubmit.calledWith(mockEvt));
    },

    testSubmitWithFormData() {
        const component = this.createComponent(
            <AjaxForm />
        );

        component.refs = {form: 'mock form'};
        global.FormData = true;
        this.stub(component, 'submitFormData');

        component.submit();
        this.assertEqual(component.submitFormData.callCount, 1);
        this.assertTrue(component.submitFormData.calledWith('mock form'));

        delete global.FormData;
    },

    testSubmitWithoutFormData() {
        const form = {submit: this.stub()};
        const component = this.createComponent(
            <AjaxForm />
        );

        component.refs = {form: form};

        component.submit();
        this.assertEqual(form.submit.callCount, 1);
    },

    testSubmitData() {
        const form = {action: '/login/'};
        const component = this.createComponent(
            <AjaxForm />
        );

        global.FormData = function() {};
        this.stub(request, 'post');

        component.submitFormData(form);
        this.assertEqual(request.post.callCount, 1);
        this.assertTrue(request.post.calledWith(
            '/login/',
            new global.FormData(form),
            component.onResponse
        ));

        delete global.FormData;
    }
});
