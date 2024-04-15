# js-murmurhash
Port of MurmurHash3_x86_32 to JavaScript.

Original:
https://github.com/aappleby/smhasher/blob/master/src/MurmurHash3.cpp

```js
import { murmurHash } from './murmurHash.js'

/** @var {MurmurHash} */
const hash = murmurHash('test')

/** @var {string} hex */
console.log(`${hash}`)

/** @var {number} uint32_t */
console.log(+ hash)

/** @var {array} bytes */
console.log([ ...hash ])
```
