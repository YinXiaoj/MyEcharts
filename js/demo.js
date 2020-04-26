var data1= [
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
var data2= [
    {name: '周一', value: 10},
    {name: '周二', value: 50},
    {name: '周三', value: 100},
    {name: '周四', value: 30},
    {name: '周五', value: 80},
    {name: '周六', value: 90},
    {name: '周日', value: 120}
]
var theme = {
    color: ['#339ae5','#f38051','#5874c8','#fef15e','#ff6695','#a24e9c','#f7d085'],
    axisColor: '#999',
    textColor: '#333'
}
MyEchart.setTheme(theme);
var option1 = MyEchart.optionTemplates.line({
    type:'line',
    data:data1,
    title:'统计',
    subtitle:'',
    //lineColor: theme.color,
    //areaColor:['#a24e9c','#f7d085'],
    axisColor: theme.axisColor,
    textColor: theme.textColor,
    legend:true,
    tooltip:true
});
var option2 = MyEchart.optionTemplates.bar({
    type:'bar',
    data:data1,
    title:'统计',
    subtitle:'',
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
    ],
    axisColor: '#666',
    legend:true,
    tooltip:true
});
var option3 = MyEchart.optionTemplates.pie({
    type:'pie',
    data:data2,
    title:'统计',
    subtitle:'',
    color: theme.color,
    radius : '55%',
    center : ['50%', '50%'],
    legend:true,
    tooltip:true
});
var option4 = MyEchart.optionTemplates.bar({
    type:'bar',
    data:data2,
    title:'统计',
    subtitle:'',
    color: new echarts.graphic.LinearGradient(
        0,1,0,0,
        [
            {offset: 0, color: '#2669ed'},                        
            {offset: 1, color: '#0bb7eb'}
        ]
    ),
    barWidth:20,
    legend:false,
    tooltip:true
});
MyEchart.initChart('echart1', option1);
MyEchart.initChart('echart2', option2);
MyEchart.initChart('echart3', option3);
MyEchart.initChart('echart4', option4);
