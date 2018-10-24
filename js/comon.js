// // 货币符号
// Vue.filter('currency', function(value) {
//     if(typeof value === 'number') {
//         value = '￥' + parseFloat(value.toFixed(2)).toLocaleString();
//         // 如果有小数
//         if(value.lastIndexOf('\.') !== -1) {
//             // 获取小数位
//             const decimalLength = value.slice(value.lastIndexOf('\.') + 1).length;
//             // 只有有一位小数
//             if(decimalLength === 1) {
//                 value += "0"
//             }
//         }
//         // 如果没有小数
// 		else {
//             value += ".00"
//         }
//     }
//     return value;
// });