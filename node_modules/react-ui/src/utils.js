export function chunk(xs, n) {
    const chunks = [];

    for (let i = 0; i < xs.length; i += n) {
        chunks.push(xs.slice(i, i + n));
    }

    return chunks;
}

export function classNames(...args) {
    return (
        typeof args[0] === 'object' ?
        Object.keys(args[0]).filter((key) => args[0][key]) :
        args
    ).join(' ');
}

export function debounce(fn, ms) {
    const debounced = {};

    debounced.fn = (...args) => {
        debounced.fn.cancel();
        debounced.timeout = setTimeout(() => fn(...args), ms);
    };
    debounced.fn.cancel = () => clearTimeout(debounced.timeout);

    return debounced.fn;
}

export function getClassName(cls, ...args) {
    const classNameConfig = {
        [cls]: true
    };

    args.forEach((arg) => classNameConfig[arg] = arg);

    return classNames(classNameConfig);
}

export function noop() {

}

export const request = {
    post(url, data, cb) {
        const req = new global.XMLHttpRequest();

        req.onload = () => (
            req.status > 199 && req.status < 400 ?
            cb(undefined, req) :
            cb(new Error('POST: Status Error'), req)
        );
        req.onerror = () => cb(
            new Error('POST: Network Error'),
            req
        );
        req.open('POST', url, true);
        req.send(data);
    },

    get(url, cb) {
        const req = new global.XMLHttpRequest();

        req.onload = () => (
            req.status > 199 && req.status < 400 ?
            cb(undefined, req) :
            cb(new Error('GET: Status Error'), req)
        );
        req.onerror = () => cb(
            new Error('GET: Network Error'),
            req
        );
        req.open('GET', url, true);
        req.send();
    }
};

export const BLUR_DELAY_MS = 100;

export const KEY_CODES = {
    ARROW_DOWN: 40,
    ARROW_UP: 38,
    ENTER: 13
};
