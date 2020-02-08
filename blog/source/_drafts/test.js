// const text = String.fromCodePoint(0x20BB7);
// for (let i = 0; i < text.length; i++) {
//     console.log(text[i]);
// }
// for (let v of text) {
//     console.log(v);
// }


const str = '𠮷A';
// console.log(str.charCodeAt(0).toString(16));
// console.log(str.charCodeAt(1).toString(16));
// console.log(str.charCodeAt(2).toString(16));
// console.log(str.charAt(0));
// console.log(str.charAt(1));
// console.log(str.charAt(2));
// console.log(str.length);

// console.log(str.codePointAt(0).toString(16));
// console.log(str.codePointAt(1).toString(16));
// console.log(str.codePointAt(2).toString(16));

// const name = 'Jason';
// const age = 18;
// const result = tag`Hello, are you ${name}, ${age} years old forever?`

// function tag(args, ...values) {
//     let res = '';
//     let i;
//     for (i = 0, len = values.length; i < len; i++) {
//         res += args[i] + values[i];
//     }
//     res += args[i];
//     return res;
// }
// console.log(result);

const sender = '<script>alert("Jason")</script>';
const message = SaferHTML`<p>${sender} has sent you a message.</p>`;
function SaferHTML(args, ...values) {
        let res = '';
        let i;
        for (i = 0, len = values.length; i < len; i++) {
            const temp = String(values[i])
            const value = temp.replace(/&/g, "&amp;")
                                .replace(/</g, "&lt;")
                                .replace(/>/g, "&gt;");
            res += args[i] + value;
        }
        res += args[i];
        return res;
}
// console.log(message);

// console.log(String.fromCodePoint(0x1f680));
// console.log(String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\u{1f680}y');

// for (let val of str) {
//     console.log(val.codePointAt(0).toString(16));
// }

// [...str].forEach(val => {
//     console.log(val.codePointAt(0).toString(16));
// });

// 'hello, world'.endsWith('hello', 4);

console.log('6'.repeat(0));