/*
title: Echart二次封装
author: yinxiaojing
API：https://github.com/YinXiaoj/MyEcharts
*/

var MyMap = {
    echartBox: '',
    Series:[],
    data:{
        provinces: ['shanghai', 'hebei','shanxi','neimenggu','liaoning','jilin','heilongjiang','jiangsu','zhejiang','anhui','fujian','jiangxi','shandong','henan','hubei','hunan','guangdong','guangxi','hainan','sichuan','guizhou','yunnan','xizang','shanxi1','gansu','qinghai','ningxia','xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'],
    },
    //初始化
    initChart: function(container,name,obj) {
        this.echartBox = echarts.init(document.getElementById(container));
        this.setMap(name, obj);
        return this.echartBox;
    },
    setSeries :function(obj,data){
        this.Series.push({
            type: obj.maskType,      
            coordinateSystem: 'geo',
            animation: true,
            rippleEffect: {
               brushType: 'stroke'
            },
            data: data        
        });
    },
    setMap: function(name, obj) {  
        var self = this;    
        $.get('js/map/json/' + name + '.json', function (geoJson) {
             echarts.registerMap(name, geoJson);
            // var FlagArr = ['images/map_icon1.png','images/map_icon2.png','images/map_icon3.png'],
                 var mapData; 
                 if(obj.data){
                    mapData = obj.data;
                    geoJson.features.forEach(function(o,i){
                      mapData.forEach(function(p,j){
                        if(p.name == o.properties.name){
                            p.value = o.properties.cp;
                        };
                        p.itemStyle = {
                            color: p.color
                        }
                        p.symbolSize = p.size
                      })                    
                    });
                    self.setSeries(obj, mapData);
                }

                 var option = {	
                    geo:{
                        map: name,
                        label: {
                            normal: {
                               show: obj.label==false ? obj.label : true,
                               color: obj.labelColor || '#000'
                            },
                            emphasis: {
                                show: obj.label==false ? obj.label : true,
                                color: obj.labelColorHover || '#000'
                            },
                        },
                        itemStyle: {
                            normal: {
                                borderColor: obj.borderColor || '#000',
                                areaColor: obj.areaColor,
                                borderWidth: 0.5
                            },
                            emphasis: {
                                areaColor: obj.areaColorHover
                            }
                        }
                    },  
                    series: self.Series
                   /* series: [
                        {              
                             type: 'custom',//配置显示方式为用户自定义
                             coordinateSystem: 'geo',
                             itemStyle: {
                             normal: {
                               color: '#46bee9'
                             }
                       },
                       renderItem: function (params, api) {//具体实现自定义图标的方法
                           return {
                               type: 'image',
                               style: {
                                   image: mapData[params.dataIndex].img,
                                   x: api.coord([
                                       mapData[params.dataIndex].value[0], mapData[params.dataIndex]
                                           .value[1]
                                   ])[0],
                                   y: api.coord([
                                       mapData[params.dataIndex].value[0], mapData[params.dataIndex]
                                           .value[1]
                                   ])[1]
                               }
                           }
                       },
                       data: mapData
                   }
                    ]*/  
                };
                self.echartBox.setOption(option);
       });
 }

}



