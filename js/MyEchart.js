
//定义MyEchart
var MyEchart = {
    //格式化数组
    FormateDataGroup: function(data, type) {
        var categories = [];
        var series = [];
        //判断是否分组
        if(JSON.stringify(data[0]).indexOf(JSON.stringify('group')) == 1){                      
            var groups = [];            
            for (var i = 0; i < data.length; i++) {
                if (groups.indexOf(data[i].group) == -1) {
                    groups.push(data[i].group);
                }
                if (categories.indexOf(data[i].name) == -1) {
                    categories.push(data[i].name);
                }
            }
            
            for (var i = 0; i < groups.length; i++) {
                var temp_data = [];
                for (var j = 0; j < data.length; j++) {
                    for (var k = 0; k < categories.length; k++){
                        if (groups[i] == data[j].group && data[j].name == categories[k])
                            temp_data.push(data[j].value);
                    }                   
                }
                series.push( { name: groups[i], type: type, data: temp_data });    
            }
            return { legend: groups, category: categories, series: series };

        } else {
            var temp_data = [];
            for (var i = 0; i < data.length; i++) {
                categories.push(data[i].name);
                if(type == 'pie'){
                    temp_data.push({name: data[i].name, value:data[i].value});
                } else {
                    temp_data.push(data[i].value);
                }                  
            }
            series.push({ data: temp_data, type: type});
            return { category: categories, series: series };
        }

    },
    echartBox: '',
    //初始化echart
    initChart: function(container,option) {
        MyEchart.echartBox = echarts.init(document.getElementById(container));
        MyEchart.echartBox.setOption(option);
        return MyEchart.echartBox;
    },

    theme:{
        color:'',
        axisColor:'',
        textColor:''
    },
    //配置主题
    setTheme: function(obj){
        MyEchart.theme.color = obj.color;
        MyEchart.theme.axisColor = obj.axisColor;
        MyEchart.theme.textColor = obj.textColor;
    },
    //设置标题
    setTitle: function(obj){
        var arr = {
            text: obj.title || '',
            subtext: obj.subtitle || '',
            x: 'center',
            textStyle: {
                color: obj.textColor || '#000'
            }
        };
        return arr;       
    },
    //设置图例
    setLegend: function(obj,data){
        var arr = {
            show: obj.legend==false ? obj.legend : true,
            data: data.legend || '',
            right: 0,
            orient:'horizontal',
            textStyle: {
                color: obj.textColor || '#000'
            }
        };
        if(obj.type == 'pie'){
            arr.orient = 'vertical'
        }
        return arr;       
    },
    //设置x轴
    setxAxis: function(obj,data){
        var arr = {
            type: 'category',
            data: data.category,
            boundaryGap:true,
            axisLine: {
                lineStyle: {
                    color: obj.axisColor || '#000'
                }
            }
        };
        if(obj.type == 'line'){
            arr.boundaryGap = false
        }
        return arr;   
    },
    //设置y轴
    setyAxis: function(obj){
        var arr = {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: obj.axisColor || '#000'
                }
            }
        };
        return arr;   
    },
    //设置弹出框
    setTooltip: function(obj){
        var arr = {
            show: obj.tooltip ==false ? obj.tooltip : true,
            trigger: 'item',
            axisPointer: {
                type: 'line',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        };
        if(obj.type == 'line'){
            arr.trigger = 'axis'
        }
        return arr;   
    },
    //初始化option
    optionTemplates: {
        //折线图
        line: function(obj) {
            var datas = MyEchart.FormateDataGroup(obj.data, obj.type);
            var newSeries = [];
            for(var i=0; i<datas.series.length; i++){
                var lineSeries = {};
                obj.lineColor = obj.lineColor || (MyEchart.theme.color || '');
                lineSeries.itemStyle = {
                    color: obj.lineColor[i]
                };
                lineSeries.lineStyle = {
                    color: obj.lineColor[i]
                };
                obj.areaColor = obj.areaColor || (MyEchart.theme.color || '');      
                lineSeries.areaStyle = {
                    color: obj.areaColor[i]
                };
                lineSeries.smooth = obj.smooth || false;
                lineSeries.stack = 'line';                
                newSeries.push(extend(datas.series[i], lineSeries));    
            };
            var option = {
                title: MyEchart.setTitle(obj),
                legend: MyEchart.setLegend(obj,datas),
                tooltip: MyEchart.setTooltip(obj),
                xAxis: MyEchart.setxAxis(obj,datas),
                yAxis: MyEchart.setyAxis(obj),
                series: newSeries
            };
            return option;
        },
        //柱状图
        bar: function(obj) {
            var datas = MyEchart.FormateDataGroup(obj.data, obj.type);
            var newSeries = [];
            for(var i=0; i< datas.series.length; i++){              
                var lineSeries = {};
                obj.color = obj.color || (MyEchart.theme.color || '');
                lineSeries.itemStyle = {
                    color: obj.color[i] || obj.color
                };      
                if(obj.barWidth){
                    lineSeries.barWidth = obj.barWidth
                };
                newSeries.push(extend(datas.series[i], lineSeries));                
            };
            var option = {
                title: MyEchart.setTitle(obj),
                legend: MyEchart.setLegend(obj,datas),
                tooltip: MyEchart.setTooltip(obj),
                xAxis: MyEchart.setxAxis(obj,datas),
                yAxis: MyEchart.setyAxis(obj),
                series: newSeries
            };
            return option;
        },
        //饼图
        pie: function(obj) {
            var datas = MyEchart.FormateDataGroup(obj.data, obj.type);
            var pieSeries = {
                radius: obj.radius,
                center: obj.center,
                color: obj.color || (MyEchart.theme.color || []),
            };
            var newSeries = [extend(datas.series[0], pieSeries)];
            var option = {
                title: MyEchart.setTitle(obj),
                legend: MyEchart.setLegend(obj,datas),
                tooltip: MyEchart.setTooltip(obj),
                series: newSeries
            };
            return option;
        },
    }  
}

//合并两个对象
function extend() {
    var length = arguments.length;
    var target = arguments[0] || {};
    if (typeof target!="object" && typeof target != "function") {
        target = {};
    }
    if (length == 1) {
        target = this;
        i--;
    }
    for (var i = 1; i < length; i++) { 
        var source = arguments[i]; 
        for (var key in source) { 
            if (Object.prototype.hasOwnProperty.call(source, key)) { 
                target[key] = source[key]; 
            } 
        } 
    }
    return target; 
}
//indexOf兼容IE8
if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj) {
        for(var i = 0;i < this.length;i++){
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    }
}