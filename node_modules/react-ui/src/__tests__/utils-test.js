import Mingus from 'mingus';

import {
    chunk,
    classNames,
    debounce,
    getClassName,
    noop,
    request
} from '../utils';


Mingus.createTestCase('ChunkTest', {
    testChunkIterableWithItems() {
        const xs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result = chunk(xs, 3);

        this.assertDeepEqual(result, [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [10]
        ]);
    },

    testChunkTooLarge() {
        const xs = [1, 2, 3, 4];
        const result = chunk(xs, 10);

        this.assertDeepEqual(result, [[1, 2, 3, 4]]);
    }
});

Mingus.createTestCase('ClassNamesTest', {
    testEmptyClassNamesArgs() {
        this.assertEqual(classNames(), '');
    },

    testEmptyClassNamesConfig() {
        this.assertEqual(classNames({}), '');
    },

    testClassNamesArgs() {
        this.assertEqual(classNames('a', 'b', 'c'), 'a b c');
    },

    testClassNamesConfig() {
        this.assertEqual(classNames({
            'awesome-stuff': true,
            'bad-stuff': false,
            'cool-stuff': true
        }), 'awesome-stuff cool-stuff');
    }
});

Mingus.createTestCase('DebounceTest', {
    testCallDebouncedFunction() {
        const mock = {callCount: 0};
        const fn = debounce(() => (mock.callCount += 1), 325);

        this.stub(global, 'setTimeout', (cb) => cb());
        this.stub(global, 'clearTimeout');

        fn('a', 'b', 'c');
        this.assertEqual(global.setTimeout.callCount, 1);
        this.assertEqual(mock.callCount, 1);
        this.assertTypeOf(global.setTimeout.firstCall.args[0], 'function');
        this.assertEqual(global.setTimeout.firstCall.args[1], 325);
    }
});

Mingus.createTestCase('GetClassNameTest', {
    testGetClassName() {
        this.assertEqual(
            getClassName('react-ui-ajax-form', 'custom-form'),
            'react-ui-ajax-form custom-form'
        );
    }
});

Mingus.createTestCase('NoopTest', {
    testNoop() {
        this.assertUndefined(noop());
    }
});

Mingus.createTestCase('RequestTest', {
    before() {
        const me = this;

        class MockXMLHttpRequest {
            constructor() {
                me.request = this;
            }

            open() {

            }

            send() {
                me.spy(this, 'onload');
                me.spy(this, 'onerror');

                this.status = 200;
                this.onload();
                this.status = 404;
                this.onload();
                this.onerror();
            }
        }

        this.XMLHttpRequest = global.XMLHttpRequest;
        global.XMLHttpRequest = MockXMLHttpRequest;
    },

    beforeEach() {
        this.spy(global.XMLHttpRequest.prototype, 'open');
        this.spy(global.XMLHttpRequest.prototype, 'send');
    },

    after() {
        global.XMLHttpRequest = this.XMLHttpRequest;
    },

    testPostRequest() {
        const onResponse = this.stub();

        request.post('/api/neato/', 'mock data', onResponse);

        this.assertEqual(this.request.open.callCount, 1);
        this.assertEqual(this.request.send.callCount, 1);
        this.assertEqual(this.request.onload.callCount, 2);
        this.assertEqual(this.request.onerror.callCount, 1);
        this.assertEqual(onResponse.callCount, 3);
        this.assertTrue(this.request.open.calledWith(
            'POST',
            '/api/neato/',
            true
        ));
        this.assertTrue(this.request.send.calledWith('mock data'));
        this.assertTrue(onResponse.calledWith(
            new Error('POST: Network Error'),
            this.request
        ));
        this.assertTrue(onResponse.calledWith(
            new Error('POST: Status Error'),
            this.request
        ));
        this.assertTrue(onResponse.calledWith(
            undefined,
            this.request
        ));
    },

    testGetRequest() {
        const onResponse = this.stub();

        request.get('/api/neato/', onResponse);

        this.assertEqual(this.request.open.callCount, 1);
        this.assertEqual(this.request.send.callCount, 1);
        this.assertEqual(this.request.onload.callCount, 2);
        this.assertEqual(this.request.onerror.callCount, 1);
        this.assertEqual(onResponse.callCount, 3);
        this.assertTrue(this.request.open.calledWith(
            'GET',
            '/api/neato/',
            true
        ));
        this.assertTrue(this.request.send.calledWith());
        this.assertTrue(onResponse.calledWith(
            new Error('GET: Network Error'),
            this.request
        ));
        this.assertTrue(onResponse.calledWith(
            new Error('GET: Status Error'),
            this.request
        ));
        this.assertTrue(onResponse.calledWith(
            undefined,
            this.request
        ));
    }
});
