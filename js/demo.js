//定义数据
var data1= [
    {name: '周一', value: 10},
    {name: '周二', value: 50},
    {name: '周三', value: 100},
    {name: '周四', value: 30},
    {name: '周五', value: 80},
    {name: '周六', value: 90},
    {name: '周日', value: 120}
]
var data2= [
    {group:'北京',name: '周一', value: 10},
    {group:'北京',name: '周二', value: 50},
    {group:'北京',name: '周三', value: 100},
    {group:'北京',name: '周四', value: 30},
    {group:'北京',name: '周五', value: 80},
    {group:'北京',name: '周六', value: 90},
    {group:'北京',name: '周日', value: 120},
    {group:'上海',name: '周一', value: 30},
    {group:'上海',name: '周二', value: 60},
    {group:'上海',name: '周三', value: 150},
    {group:'上海',name: '周四', value: 50},
    {group:'上海',name: '周五', value: 100},
    {group:'上海',name: '周六', value: 140},
    {group:'上海',name: '周日', value: 180}
]


//定义统一主题
var theme = {
    color: ['#339ae5','#f38051','#5874c8','#fef15e','#ff6695','#a24e9c','#f7d085'],
    axisColor: '#999',
    textColor: '#333'
}
MyEchart.setTheme(theme);


var option1 = MyEchart.optionTemplates('line',{
    type:'line',
    data:data1,
    title:'折线图单组数据',
    grid: ["16%", "3%", "3%", "3%"],
    smooth:true
});
MyEchart.initChart('echart1', option1);


var option2 = MyEchart.optionTemplates('line',{
    type:'line',
    data:data2,
    title:'折线图多组数据',
    grid: ["16%", "3%", "3%", "3%"]
});
MyEchart.initChart('echart2', option2);


var option3 = MyEchart.optionTemplates('bar',{
    type:'bar',
    data:data1,
    title:'柱状图自定义颜色和柱条宽度',
    grid: ["16%", "3%", "3%", "3%"],
    color: ['#a24e9c'],
    barWidth:20
});
MyEchart.initChart('echart3', option3);


var option4 = MyEchart.optionTemplates('bar',{
    type:'bar',
    data:data2,
    title:'柱状图渐变颜色',
    grid: ["16%", "3%", "3%", "3%"],
    color: [
        new echarts.graphic.LinearGradient(
            0,1,0,0,
            [
                {offset: 0, color: '#2669ed'},                        
                {offset: 1, color: '#0bb7eb'}
            ]
        ),
        new echarts.graphic.LinearGradient(
            0,1,0,0,
            [
                {offset: 0, color: '#f38051'},                        
                {offset: 1, color: '#f7d085'}
            ]
        )
    ]
});
MyEchart.initChart('echart4', option4);

var option5 = MyEchart.optionTemplates('pie',{
    type:'pie',
    data:data1,
    title:'饼图',
    radius : '55%',
    center : ['50%', '50%']
});
MyEchart.initChart('echart5', option5);


var option6 = MyEchart.optionTemplates('pie',{
    type:'pie',
    data:data1,
    title:'饼图圆环',
    radius : [50,100],
    center : ['50%', '45%']
});
MyEchart.initChart('echart6', option6);

var option7 = MyEchart.optionTemplates('radar',{
    type:'radar',
    data:data2,
    title: '多组数据雷达图',
    radius: 100,
    center: ['50%', '50%'],
    axisColor: '#495e74',
   // textColor: '#50a5d3',
    color:['#5874c8', '#ff6695'],
    areaColor:['#5874c8', '#ff6695']
});
MyEchart.initChart('echart7', option7);

var option8 = MyEchart.optionTemplates('radar',{
    type:'radar',
    data:data1,
    title: '单组数据雷达图',
    radius: 100,
    center: ['50%', '50%']
});
console.log(option8)
MyEchart.initChart('echart8', option8);


var mapData = [
    {name:'北京', size:20, color:'#ff2136'},
    {name:'上海', size:30, color:'#8de2a2'},
    {name:'湖北', size:10, color:'#ffa63d'}
]
var mapbox = MyMap.initChart('mapChart','china',{
    data:mapData,
    label:true,
    labelColor:'#fff',
    labelColorHover:'#ff0',
    areaColor:'#12427b',
    areaColorHover:'#5183f6',
    borderColor: '#4e80f0',
    maskType:'scatter'
    //maskType:'effectScatter' 
    // 
    
});
mapbox.on('click',function(data){
    console.log(data)
})