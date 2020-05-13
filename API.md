## Echarts二次封装——基础图形

### 数据结构

```js
//单项数据,适合饼图，折线图（单组数据），柱状图（单组数据）
var data= [
    {name: '周一', value: 10},
    {name: '周二', value: 50},
    {name: '周三', value: 100},
    {name: '周四', value: 30},
    {name: '周五', value: 80},
    {name: '周六', value: 90},
    {name: '周日', value: 120}
];

//分组数据，添加group属性，适合折线图（多组数据），柱状图（多组数据）
var data= [
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
````

### 通用配置项

属性|描述
-|-
type|图表类型：line，bar，pie（必填，目前只支持这三种）
data|数据（必填）
title|标题
axisColor|坐标轴颜色
textColor|文字颜色
legend|是否显示图例（布尔值）：默认显示
tooltip|是否显示提示框（布尔值）：默认显示
grid|grid的位置，分别为[上， 右， 下， 左]，默认为['3%', '3%', '3%', '3%']

- 标题默认为空
- 文字和图形的颜色使用Echart默认调色盘，也可以自定义

### 配置option

- 使用`MyEchart.optionTemplates(type, obj)`方法

- type: 图表类型：line，bar，pie（必填，目前只支持这三种）

- obj：option对象

### 折线图

属性|描述
-|-
lineColor|折线颜色
areaColor|折线区域颜色
smooth|是否平滑曲线，默认false

```js
var option = MyEchart.optionTemplates('line', {
    type:'line',
    data:data,
    title:'统计',
    lineColor: ['#339ae5','#f38051'],
    areaColor: ['#339ae5','#f38051'],
    smooth:true
});
```

### 柱状图

属性|描述
-|-
color|柱条的颜色
barWidth|柱条的宽度：默认自适应

```js
var option = MyEchart.optionTemplates('bar', {
    type:'bar',
    data:data,
    title:'统计',
    color: ['#339ae5','#f38051'],
    barWidth:20
});
```

### 饼图

属性|描述
-|-
color|图形的颜色
radius|饼图的半径：`'50%'`直接指定外半径尺寸，显示饼图。`[40,80]`第一项内半径，第二项外半径，显示圆环。
center|饼图的中心坐标：`['50%','50%']`第一项横坐标，第二项纵坐标

```js
var option = MyEchart.optionTemplates('pie', {
    type:'pie',
    data:data,
    title:'统计',
    color: ['#339ae5','#f38051','#5874c8','#fef15e','#ff6695','#a24e9c','#f7d085']
    radius : '55%',
    center : ['50%', '50%']
});
```

### 雷达图

属性|描述
-|-
color|图形的颜色
areaColor|图形区域的颜色
radius|图形的半径
center|图形的中心坐标：`['50%','50%']`第一项横坐标，第二项纵坐标
axisColor|坐标轴的颜色

```js
var option = MyEchart.optionTemplates('radar',{
    type:'radar',
    data:data,
    title: '统计',
    radius: 100,
    center: ['50%', '50%'],
    axisColor: '#495e74',
    color:['#5874c8', '#ff6695'],
    areaColor:['#5874c8', '#ff6695']
});
```

## 主题

- 若页面中使用多个图表，可以考虑配置统一主题颜色
- 优先级：自定义颜色 > 主题颜色 > Echart默认颜色

```js
var theme = {
    color: ['#339ae5','#f38051','#5874c8','#fef15e','#ff6695','#a24e9c','#f7d085'], // 图形颜色
    axisColor: '#999', // 坐标轴颜色
    textColor: '#333' // 文字颜色
}
MyEchart.setTheme(theme);
```

## 扩展
需要其他更加复杂的配置项，可以使用echart的`setOption()`方法添加，例如：

```js
var option = MyEchart.optionTemplates.pie({
    type:'pie',
    data:data,
    title:'统计',
    radius : '55%',
    center : ['50%', '50%']
});
var echart = MyEchart.initChart('echartbox', option);
//添加其他配置项
var option_other = {
    legend: {
        left: '10%',
        top: '10%',
        right: 'auto'
    },
    series: {
        type: 'pie',
        labelLine: {
            length2: 0
        },
        label: {
            formatter: '{b} {d}%'
        }
    }
}
echart.setOption(option_other);
```

## 渐变颜色

参考Echart规则，注：IE8不支持渐变

```js
new echarts.graphic.LinearGradient(
    0,1,0,0, // 0,1,0,0从下到上， 0,0,0,1从上到下，0,0,1,0从左到右，1,0,0,0从右到左
    [
        {offset: 0, color: '#2669ed'}, // 0%处的颜色                         
        {offset: 1, color: '#0bb7eb'} // 100%处的颜色
    ]
)
```

```js
// 可以直接使用
var option = MyEchart.optionTemplates('bar',{
    type:'bar',
    data:data,
    title:'统计',
    color: [
        new echarts.graphic.LinearGradient(
            0,1,0,0,
            [
                {offset: 0, color: '#2669ed'},                        
                {offset: 1, color: '#0bb7eb'}
            ]
        )
    ]
});
```

