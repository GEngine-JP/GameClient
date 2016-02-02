import Mingus from 'mingus';
import React from 'react';

import Slider from '../Slider';


Mingus.createTestCase('SliderTest', {
    testRender() {
        const rendered = this.renderComponent(<Slider />);
        const track = this.getChildren(rendered)[0];
        const controls = this.getChildren(track);

        this.assertIsType(rendered, 'div');
        this.assertHasClass(rendered, 'react-ui-slider');
        this.assertIsType(track, 'div');
        this.assertHasClass(track, 'react-ui-slider-track');
        this.assertNumChildren(track, 2);
        this.assertEveryChildIsType(track, 'div');
        this.assertHasClass(controls[0], 'react-ui-slider-fill');
        this.assertHasClass(controls[1], 'react-ui-slider-handle');
    },

    testOnChange() {
        const onChange = this.stub();
        const component = this.createComponent(
            <Slider onChange={onChange} />
        );
        const mockEvt = {stopPropagation: this.stub()};

        this.stub(component, 'setState');

        component.onChange(mockEvt);
        this.assertEqual(mockEvt.stopPropagation.callCount, 1);
        this.assertEqual(onChange.callCount, 0);
        this.assertEqual(component.setState.callCount, 0);

        component.state.sliding = true;
        component.state.value = 44;
        component.onChange(mockEvt);
        this.assertEqual(mockEvt.stopPropagation.callCount, 2);
        this.assertEqual(onChange.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(onChange.calledWith(mockEvt, 44));
        this.assertTrue(component.setState.calledWith({sliding: false}));
    },

    testOnDragStart() {
        const component = this.createComponent(<Slider />);
        const mockEvt = {preventDefault: this.stub()};

        component.onDragStart(mockEvt);
        this.assertEqual(mockEvt.preventDefault.callCount, 1);
    },

    testOnMouseDown() {
        const component = this.createComponent(<Slider />);
        const mockEvt = {preventDefault: this.stub()};

        this.stub(component, 'setState');

        component.onMouseDown(mockEvt);
        this.assertEqual(mockEvt.preventDefault.callCount, 1);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({sliding: true}));
    },

    testOnMouseMove() {
        const component = this.createComponent(<Slider />);
        const mockEvt = {clientX: 100};

        this.stub(component, 'setState');
        component.refs = {
            handle: {
                offsetWidth: 20
            },
            track: {
                getBoundingClientRect: this.stub(),
                offsetWidth: 100
            }
        };
        component.refs.track.getBoundingClientRect.returns({left: 30});
        component.state.sliding = true;

        component.onMouseMove(mockEvt);
        this.assertEqual(component.setState.callCount, 1);
        this.assertTrue(component.setState.calledWith({
            fillWidth: 70,
            handleLeft: 50,
            value: (50 / 100 * 100) / (100 - (20 / 100 * 100)) * 100
        }));
    },

    testOnMouseMoveWithoutSlide() {
        const component = this.createComponent(<Slider />);
        const mockEvt = {};

        this.stub(component, 'setState');

        component.onMouseMove(mockEvt);
        this.assertEqual(component.setState.callCount, 0);
    },

    testGetBoundedValues() {
        const component = this.createComponent(<Slider />);

        this.assertEqual(component.getBoundedValue(55), 55);
        this.assertEqual(component.getBoundedValue(55, 0), 55);
        this.assertEqual(component.getBoundedValue(55, 0, 100), 55);
        this.assertEqual(component.getBoundedValue(-10, 0, 100), 0);
        this.assertEqual(component.getBoundedValue(305, 0, 100), 100);
    }
});
