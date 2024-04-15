import { murmurHash } from './murmurHash.js'

const tests = [
    {
        txt: 'test',
        hex: 'ba6bd213'
    },
    {
        txt: 'test',
        hex: '704b81dc',
        seed: 0x9747b28c
    },
    {
        txt: 'Hello, world!',
        hex: 'c0363e43'
    },
    {
        txt: 'Hello, world!',
        hex: '24884cba',
        seed: 0x9747b28c
    },
    {
        txt: 'The quick brown fox jumps over the lazy dog',
        hex: '2e4ff723'
    },
    {
        txt: 'The quick brown fox jumps over the lazy dog',
        hex: '2fa826cd',
        seed: 0x9747b28c
    },
    {
        txt: '',
        hex: '00000000'
    },
    {
        txt: '\u0000\u0000\u0000\u0000',
        hex: '2362f9de'
    },
    {
        txt: 'abcd',
        hex: '43ed676a'
    },
    {
        txt: 'aaa',
        hex: 'b4d05fb7'
    },
    {
        txt: 'ab',
        hex: '9bbfd75f'
    },
    {
        txt: 'a',
        hex: '3c2569b2'
    },
    {
        txt: '\u03c0\u03c0\u03c0\u03c0\u03c0\u03c0\u03c0\u03c0',
        hex: 'ec72b6e8'
    },
    {
        txt: 'a'.repeat(256),
        hex: 'a8796809'
    },
    {
        txt: '\ud83d\ude80',
        hex: '7f675865'
    }
]

for (const { txt, hex, seed } of tests) {
    let result = murmurHash(txt, seed).toString()

    if (result === hex)
        console.log('OK', txt, hex)
    else
        console.error('FAIL', { txt, hex, result })
}
