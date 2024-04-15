# js-murmurhash
Port of MurmurHash3_x86_32 to JavaScript.

Original:
https://github.com/aappleby/smhasher/blob/master/src/MurmurHash3.cpp


### Example:

```js
import { murmurHash } from './murmurHash.js'

const hash = murmurHash('test')

// string
console.log(`${hash}`)

// number
console.log(+ hash)

// array
console.log([ ...hash ])
```

In the above:
- the `{string}` is hexadecimal
- the `{number}` of type `uint32_t`
- and the `{array}` contains the bytes


### Signature:

```js
/**
 * @param {string|Uint8Array} data.
 * @param {?number} Optional seed.
 *
 * @return {MurmurHash}
 */
murmurHash(data, ?seed): {MurmurHash}
```

A `{MurmurHash}` is a special type of `{Number}`. \
The stringifier is replaced with the hexadecimal representation of the 4 bytes. \
And an iterator was added to conveniently access those 4 bytes. \
It's otherwise no different than a regular `{Number}`.
