/** @see https://github.com/aappleby/smhasher/blob/master/src/MurmurHash3.cpp */

const { imul } = Math

const fmix32 = h => {
    h ^= h >>> 16
    h = imul(h, 0x85ebca6b)
    h ^= h >>> 13
    h = imul(h, 0xc2b2ae35)
    h ^= h >>> 16

    return h >>> 0
}

const rotl32 = (x, r) => (x << r) | (x >>> (32 - r))

/**
 * @param {Uint8Array} uint8Array
 * @param {?number} seed
 *
 * @return {number}
 */
const MurmurHash3_x86_32 = (uint8Array, seed) => { // murmur3a

    const { byteLength } = uint8Array
    const offset = (byteLength >> 2) * 4 // tail start, body end

    const c1 = 0xcc9e2d51
    const c2 = 0x1b873593

    let h1 = seed

    //----------
    // body
    for (let k1 of new Uint32Array(uint8Array.slice(0, offset).buffer)) {
        k1 = imul(k1, c1)
        k1 = rotl32(k1, 15)
        k1 = imul(k1, c2)
        
        h1 ^= k1
        h1 = rotl32(h1, 13)
        h1 = h1 * 5 + 0xe6546b64
    }

    //----------
    // tail
    let k1

    switch (byteLength & 3) {
        case 3:
            k1 ^= uint8Array[offset + 2] << 16

        case 2:
            k1 ^= uint8Array[offset + 1] << 8

        case 1:
            k1 ^= uint8Array[offset]
            k1 = imul(k1, c1)
            k1 = rotl32(k1, 15)
            k1 = imul(k1, c2)
            h1 ^= k1
    }

    //----------
    // finalization
    h1 ^= byteLength

    h1 = fmix32(h1)

    return h1
}

/**
 * @param {string} string
 *
 * @return {Uint8Array}
 */
const encode = string => new TextEncoder().encode(string)

/**
 * const hash = murmurHash('test')
 *
 * {MurmurHash} | console.log(hash)
 * {string}     | console.log(`${hash}`, hash.toString())
 * {number}     | console.log(+ hash, hash + 0)
 * {array}      | console.log([ ...hash ])
 *
 * for (const byte of hash)
 *     console.log(byte, '{number}')
 */
class MurmurHash extends Number
{
    toString() {
        return (+ this).toString(16).padStart(8, '0')
    }

    *[Symbol.iterator]() {
        let arr = new Uint32Array([ this ])
            arr = new Uint8Array(arr.buffer)
            arr = arr.toReversed()

        for (const byte of arr)
            yield byte
    }
}

/**
 * @param {string|Uint8Array} data - The data to hash.
 * @param {?number}           seed - Optional seed.
 *
 * @return {MurmurHash}
 */
const murmurHash = (data, seed) => new MurmurHash(
    MurmurHash3_x86_32(typeof data === 'string' ? encode(data) : data, seed)
)

export { MurmurHash3_x86_32, murmurHash }
