# refetch
服务端数据获取，支持ajax和jsonp，使用promise A＋规范，支持cache。ajax使用了[qwest](https://github.com/pyrsmk/qwest)(修改了qwest返回接口参数顺序)

# Install
npm install refetch

# Api
```
refetch[method](url, data, options)
```

method: get, post, put, delete, jsonp

url: 必填

data: Object

options:
- dataType: method 为jsonp时无效。可选值 post (default), json, text, arraybuffer, blob, document, formdata
- responseType: method 为jsonp时无效。可选值 json (default), text, xml, arraybuffer, blob, document
- headers: method 为jsonp时无效。object
- timeout: 毫秒
- cache: 缓存，单位秒，大于0时有效。使用localStorage做长期缓存，需要注意缓存数据大小。
- withCredentials: method 为jsonp时无效。是否支持跨域 default false
- async: method 为jsonp时无效。是否同步 default true
- delay: 延时处理，单位毫秒，默认为0。

# Example
```
// jsonp 无xhr

refetch.get('hello.html')
    .then(function () {response, xhr} {
        console.log(response);
    });

refetch.post('hello.html', { name: 'world' })
    .then(function (response, xhr) {
        console.log(response);
    })
    .catch(function (error, response, xhr) {
        console.log(error);
    });
```

# 默认数据处理
提供了一个setPeer方法，用来预处理返回数据

```
const peer = (promise) => promise.then((res, xhr) => {
    if (res.success) {
       return res.data;
    } else {
        // ... 处理异常
        // 返回 new Error，cache将会忽略这个错误数据
        return new Error(res.msg);
    }
})
// 增加默认异常处理
.catch((err, res, xhr) => {
    // ... 处理异常
});

fetch.setPeer(peer);

fetch.get(...);
```
