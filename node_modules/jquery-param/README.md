# jquery-param [![Circle CI](https://circleci.com/gh/knowledgecode/jquery-param.svg?style=shield)](https://circleci.com/gh/knowledgecode/jquery-param)

## Features
- equivalent to jQuery.param
- no jQuery necessary
- no dependencies
- legacy IE support

## What is this good for?
When making a GET/POST request in Web Workers etc., which cannot use jQuery. Especially when sending Array as a parameter.

## Install
Node.js:
```shell
$ npm install jquery-param --save
```
Bower:
```shell
$ bower install jquery-param
```
browser:
```html
<script src="./src/jquery-param.min.js"></script>
```

## Usage
Node.js:
```javascript
var param = require('jquery-param');
var obj = { key1: 'value1', key2: [10, 20, 30] };

var str = param(obj);
// => "key1=value1&key2[]=10&key2[]=20&key2[]=30"
```
browser:
```javascript
var obj = { key1: { value1: [10, 20, 30] }, key2: '?a=b&c=d' };

var str = window.param(obj);
// => "key1[value1][]=10&key1[value1][]=20&key1[value1][]=30&key2=?a=b&c=d"
```

## Browser Support
Chrome, Firefox, Safari, Opera, and Internet Explorer 6+.

## License
MIT
