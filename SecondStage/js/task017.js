/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var oChartDiv = document.getElementById('aqi-chart-wrap');
  var graTime = pageState['nowGraTime'], width;
  
  switch(graTime){
    case 'day':
      width = 5;
      break;
    case 'week':
      width = 10;
      break;
    case 'month':
      width = 15;
      break;
  }
  var charStr = '';
  for(var key in chartData){
    var color = '#'+(Math.random()*0xffffff<<0).toString(16);
    charStr += '<div style="display:inline-block; background:'+ color +'; width:' + width + 'px; \
    height:' + chartData[key] + 'px" title="' + key + ': ' + chartData[key] + '"></div>';
  }
  oChartDiv.innerHTML = charStr;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  var oInputs = document.getElementsByName('gra-time');
  for(var i = 0; i < oInputs.length; i++){
    // 确定是否选项发生了变化 
    if(oInputs[i].checked === true && oInputs[i].value !== pageState['nowGraTime']){
      pageState['nowGraTime'] = oInputs[i].value;
      break;
    }
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  var oSelect = document.getElementById('city-select').value;
    // 确定是否选项发生了变化 
  if(oSelect !== pageState['nowSelectCity']){
    pageState['nowSelectCity'] = oSelect;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var oField = document.getElementById('form-gra-time');
  oField.onclick = function(e){
    var oEvent = e || window.event;
    if(oEvent.target.nodeName === 'INPUT'){
      graTimeChange();
    }
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var oSelect = document.getElementById('city-select');
  var cityStr = '';
  for(var key in aqiSourceData){
    cityStr += '<option>' + key + '</option>';
  }
  oSelect.innerHTML = cityStr;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  oSelect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData = {};
  var tmpData = aqiSourceData[pageState['nowSelectCity']];
  var key, preKey, curWeekDay, numOfDays = 0, aqiNum = 0, dateStr = '', link;
  var preMonth = -1, curMonth;
  if(pageState['nowGraTime'] === 'day'){
      chartData = tmpData;
    }
    else{
      if(pageState['nowGraTime'] === 'week'){
        for(key in tmpData){
          curWeekDay = new Date(key).getDay();
          if(curWeekDay === 1 && numOfDays !== 0){
            link = dateStr === '' ? '' : '~';
            dateStr += link + preKey;
            chartData[dateStr] = aqiNum / numOfDays;
            numOfDays = 0;
            dateStr = key;
            aqiNum = 0;
          }
          else{
            numOfDays +=1;
            aqiNum += tmpData[key];
            preKey = key;
          }
        }
        if(numOfDays !== 0){
          link = dateStr === '' ? '' : '~';
          dateStr += link + preKey;
          chartData[dateStr] = aqiNum / numOfDays;
        }
      }
      else{
            for(key in tmpData){
              curMonth = new Date(key).getMonth();
              if(curMonth !== preMonth && numOfDays !== 0){
                link = dateStr === '' ? '' : '~';
                dateStr += link + preKey;
                chartData[dateStr] = aqiNum / numOfDays;
                numOfDays = 0;
                dateStr = key;
                aqiNum = 0;
              }
              else{
                numOfDays +=1;
                aqiNum += tmpData[key];
                preMonth = curMonth;
              }
            }
            if(numOfDays !== 0){
              link = dateStr === '' ? '' : '~';
              dateStr += link + preKey;
              chartData[dateStr] = aqiNum / numOfDays;
            }
      }
    }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

window.onload = init;
