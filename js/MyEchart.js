/*
title: Echart二次封装
author: yinxiaojing
API：https://github.com/YinXiaoj/MyEcharts
*/

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
            if(type == 'radar'){
                series.push({ type: 'radar', data: []});

                for (var i = 0; i < groups.length; i++) {
                    var temp_data = [];
                    for (var j = 0; j < data.length; j++) {
                        for (var k = 0; k < categories.length; k++){
                            if (groups[i] == data[j].group && data[j].name == categories[k])
                                temp_data.push(data[j].value);
                        }                   
                    }
                    series[0].data.push({ name: groups[i], value: temp_data });    
                }
                return { category: categories, series: series };
            }else{
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
            }


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
            if(type == 'radar'){
                series.push({ type: 'radar', data: [{ name: '', value: temp_data }]});
                
            } else {
               series.push({ data: temp_data, type: type});
            }
            return { category: categories, series: series };
        }

    },
    echartBox: '',
    //初始化echart
    initChart: function(container,option) {
        this.echartBox = echarts.init(document.getElementById(container));
        this.echartBox.setOption(option);
        return this.echartBox;
    },

    theme:{
        color:'',
        axisColor:'',
        textColor:''
    },
    //配置主题
    setTheme: function(obj){
        this.theme.color = obj.color;
        this.theme.axisColor = obj.axisColor;
        this.theme.textColor = obj.textColor;
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
                color: obj.color || '#000'
            }
        };
        if(obj.type == 'pie' || obj.type == 'radar'){
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
            },
            splitLine: {
                lineStyle: {
                    color: obj.axisColor || '#000'
                }
            },
            axisLabel: {
                color: obj.textColor || '#000'
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
            },
            splitLine: {
                lineStyle: {
                    color: obj.axisColor || '#000'
                }
            },
            axisLabel: {
                color: obj.textColor || '#000'
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
        if(obj.type == 'line' || obj.type == 'radar'){
            arr.trigger = 'axis'
        }
        return arr;   
    },
    // 设置雷达图坐标系
    setRadar: function(obj, data){
        var list = [];
        var self = this;
        for(var i=0; i<data.length; i++) {
            list.push({name: data[i]})
        }
        var arr = [
            {
                indicator: list,
                radius: obj.radius,
                center: obj.center,
                nameGap: 4, 
                name: {
                    formatter:'{value}',
                    textStyle: {
                        color: obj.textColor || (self.theme.textColor || '')
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: obj.axisColor || (self.theme.axisColor || '')
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: obj.axisColor || (self.theme.axisColor || '')
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: 'none'
                   
                    }
                }
            },
            
        ];
        return arr;
    },
    //初始化option
    optionTemplates: function(type, obj){
        var self = this;
        var option;
        switch(type) {
            case 'line':
                line(obj);
                break;
            case 'bar':
                bar(obj);
                break;
            case 'pie':
                pie(obj);
                break;
            case 'radar':
                radar(obj);
                break;
        };
        return option;
        
        //折线图
        function line(obj) {
            var datas = self.FormateDataGroup(obj.data, obj.type);
            var newSeries = [];
            for(var i=0; i<datas.series.length; i++){
                var lineSeries = {};
                obj.lineColor = obj.lineColor || (self.theme.color || '');
                lineSeries.itemStyle = {
                    color: obj.lineColor[i]
                };
                lineSeries.lineStyle = {
                    color: obj.lineColor[i]
                };
                obj.areaColor = obj.areaColor || (self.theme.color || '');      
                lineSeries.areaStyle = {
                    color: obj.areaColor[i]
                };
                lineSeries.smooth = obj.smooth || false;
                lineSeries.stack = 'line';                
                newSeries.push(extend(datas.series[i], lineSeries));    
            };
            option = {
                grid: {
                    top: obj.grid ? obj.grid[0] : '3%',
                    right: obj.grid ? obj.grid[1] : '3%',
                    bottom: obj.grid ? obj.grid[2] : '3%',
                    left: obj.grid ? obj.grid[3] : '3%',
                    containLabel: true
                },
                title: self.setTitle(obj),
                legend: self.setLegend(obj,datas),
                tooltip: self.setTooltip(obj),
                xAxis: self.setxAxis(obj,datas),
                yAxis: self.setyAxis(obj),
                series: newSeries
            };
        };
        //柱状图
        function bar(obj) {
            var datas = self.FormateDataGroup(obj.data, obj.type);
            var newSeries = [];
            for(var i=0; i< datas.series.length; i++){              
                var lineSeries = {};
                obj.color = obj.color || (self.theme.color || '');
                lineSeries.itemStyle = {
                    color: obj.color[i] || obj.color
                };      
                if(obj.barWidth){
                    lineSeries.barWidth = obj.barWidth
                };
                newSeries.push(extend(datas.series[i], lineSeries));                
            };
            option = {
                grid: {
                    top: obj.grid ? obj.grid[0] : '3%',
                    right: obj.grid ? obj.grid[1] : '3%',
                    bottom: obj.grid ? obj.grid[2] : '3%',
                    left: obj.grid ? obj.grid[3] : '3%',
                    containLabel: true
                },
                title: self.setTitle(obj),
                legend: self.setLegend(obj,datas),
                tooltip: self.setTooltip(obj),
                xAxis: self.setxAxis(obj,datas),
                yAxis: self.setyAxis(obj),
                series: newSeries
            };
        };
        //饼图
        function pie(obj) {
            var datas = self.FormateDataGroup(obj.data, obj.type);
            var pieSeries = {
                radius: obj.radius,
                center: obj.center,
                color: obj.color || (self.theme.color || []),
            };
            var newSeries = [extend(datas.series[0], pieSeries)];
            option = {
                title: self.setTitle(obj),
                legend: self.setLegend(obj,datas),
                tooltip: self.setTooltip(obj),
                series: newSeries
            }; 
        };
        // 雷达图
        function radar(obj){
            var datas = self.FormateDataGroup(obj.data, obj.type);
            var datav = datas.series[0].data;
            var newSeries = [];
            for(var i=0; i< datav.length; i++){              
                var lineSeries = {};
                obj.color = obj.color || (self.theme.color || '');
                obj.areaColor = obj.areaColor || (self.theme.color || '');
                lineSeries.itemStyle = {
                    color: obj.color[i] || obj.color
                };
                lineSeries.areaStyle = {
                    type: 'default',
                    color: obj.areaColor[i] || obj.areaColor
				};
                lineSeries.lineStyle = {
					color: obj.color[i] || obj.color
				}
                newSeries.push(extend(datav[i], lineSeries));                
            };
            datas.series.data = newSeries;
            option = {
                title: self.setTitle(obj),
                legend: self.setLegend(obj,datas),
                tooltip: self.setTooltip(obj),
                radar: self.setRadar(obj,datas.category)[0],
                series: datas.series
            }
        }
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