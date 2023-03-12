# base64-search

> JavaScript library for searching for strings in base64-encoded blobs.

![Illustration of a large pink glowing crystal in a cave system.](https://static.bn.al/img/base64-search-hero.jpg)

I sometimes need to check whether a blob of data with both plain and base64-encoded text contains a certain string. This may happen when analysing the traffic dump of a program or app for security or data protection research, for example.

However, depending on the offset of the search string in the source string, it can be [base64-encoded in different ways](https://www.leeholmes.com/searching-for-content-in-base-64-strings/). Take a look at this JSON blob as an example:

```json
{
    "attr1": "Hello, world!",
    "attr2": "WW91IGNhbiBnZW5lcmF0ZSBHRFBSIHJlcXVlc3RzIGF0IGRhdGFyZXF1ZXN0cy5vcmchIENoZWNrIGl0IG91dDogaHR0cHM6Ly93d3cuZGF0YXJlcXVlc3RzLm9yZy9nZW5lcmF0b3I=",
    "attr3": "base64-search",
    "attr4": "SGVsbG8sIHdvcmxkIQ=="
}
```

Imagine I want to check whether it contains the string `datarequests.org` anywhere. If we base64-encode that, we get `ZGF0YXJlcXVlc3RzLm9yZw==`. This is not contained anywhere in the JSON. But concluding that the JSON doesn't contain `datarequests.org` based on that would be wrong.

Using `base64-search`, we find that there are in fact three different ways that `datarequests.org` could be encoded that we all need to check (to learn more about why that is, have a look at this great [blog post](https://www.leeholmes.com/searching-for-content-in-base-64-strings/), which this library is inspired by):

```js
> base64Encodings('datarequests.org')
[
  'ZGF0YXJlcXVlc3RzLm9yZ',
  'RhdGFyZXF1ZXN0cy5vcm',
  'YXRhcmVxdWVzdHMub3Jn'
]
```

And indeed we can see that both `ZGF0YXJlcXVlc3RzLm9yZ` and `RhdGFyZXF1ZXN0cy5vcm` _are_ present in the JSON blob, so it _does_ contain `datarequests.org`, twice even.

Now, in this case, I could of course have just decoded both base64 strings and then performed string matching on the results. But this method is for when you want to search arbitrary data that you don't know the shape of and without manual work.

## Installation

You can install base64-search using yarn or npm:

```sh
yarn add base64-search
# or `npm i base64-search`
```

## Example usage

```js
import { base64Regex, base64Encodings } from 'base64-search';

console.log(base64Regex('ea70edc1'));
// (VhNzBlZGMx|YTcwZWRjM|ZWE3MGVkYz)

console.log(base64Encodings('ea70edc1'));
// [ 'ZWE3MGVkYz', 'VhNzBlZGMx', 'YTcwZWRjM' ]
```

## API

This library provides the following two functions:

### `base64Regex(input)`

**Parameters:**

- `input` (required) – The string or other data that you want to search for. Can be a `string` or `Buffer`.

**returns:** `string` – A regex that matches all possible base64 encodings of `input` in a single capture group.

### `base64Encodings(input)`

**Parameters:**

- `input` (required) – The string or other data that you want to search for. Can be a `string` or `Buffer`.

**returns:** `string[]` – An array of all possible base64 encodings of `input`.

## License

base64-search is licensed under the MIT license, see the [`LICENSE`](/LICENSE) file for details. It was inspired by this [blog post](https://www.leeholmes.com/searching-for-content-in-base-64-strings/), which contains an alternative implementation of the method for PowerShell.

Issues and pull requests are welcome!
