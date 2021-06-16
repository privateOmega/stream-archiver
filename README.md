stream-archiver
============

[![NPM Version][npm-image]][npm-url]

stream-archiver is a node.js library to generate an archive stream from any number of files on the web with concurrency.


## Installation

Use the npm to install foobar.

```bash
npm install stream-archiver
```

## Usage

```js
const streamArchiver = new StreamArchiver(
  format,
  archiverOptions,
  concurrency,
  streams,
  files,
  debug
);

await streamArchiver.process();
```

full fledged examples can be found under [examples]

### Parameters

- `format` <?"zip"|"tar"> archive formats supported by [node-archiver].
- `archiverOptions` <?[Object]> options to be passed to [node-archiver]. Defaults to `{ store: true }`.
- `concurrency` <?[Number]> number of concurrent connections. Defaults to `2`.
- `streams` <?[Array]<[Object]>>
  - `stream` <?[Stream]> Defaults to [PassThrough] stream.
  - `selfDestroy` <?[Boolean]> Defaults to `false`.
- `files` <?[Array]<[Object]>>
  - `fileNameWithExt` <?[String]> file name with extension.
  - `url` <?[String]> url of the file.
- `debug` <?[Boolean]> show log statements in console. Defaults to `false`.

### Returns

<[Promise]>

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License

[ISC](LICENSE)

[npm-image]: https://img.shields.io/npm/v/stream-archiver.svg
[npm-url]: https://npmjs.org/package/stream-archiver
[node-archiver]: https://www.npmjs.com/package/node-archiver "Node Archiver"
[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String"
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
[Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number"
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
[Boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[examples]: examples/ "Examples"
[Stream]: https://nodejs.org/api/stream.html
[PassThrough]: https://nodejs.org/api/stream.html#stream_class_stream_passthrough
