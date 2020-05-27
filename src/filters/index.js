import Vue from 'vue'

Vue.filter('tableFilter', (srcData, segment) => {
  let newArray = [];
  if (!segment) {
    return srcData;
  };
  srcData.forEach(element => {
    if (element[0] === segment) {
      newArray.push(element);
    };
  });
  return newArray
});

Vue.filter('percentageFilter', (srcData, Number) => {
  return srcData.toFixed(Number || 2);
});

Vue.filter('segmentFilter', (srcData, propName, value) => {
  return srcData[propName] === value;
});

Vue.filter('ThousandPartitionFilter', (num) => {
  if (!num) return 0;
  var intPart = Number(num).toFixed(0);
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  return intPartFormat;
});
