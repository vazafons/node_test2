module.exports = function () {  
var fs = require('fs');
var obj;
var kiwis;

fs.readFile('fruits.json', 'utf8', function (err, data) {
if (err) throw err;
obj = JSON.parse(data);
kiwis = obj.fruits[0].kiwis;
console.log(typeof kiwis);
});

return { title : kiwis };
}
