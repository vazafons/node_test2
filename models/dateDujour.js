module.exports = function () {
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  
  return { title: 'Express', date: day + "." + month + "." + year + " " + hour + ":" + min + ":" + sec };
}