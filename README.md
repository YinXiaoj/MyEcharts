## Echarts二次封装

基于原生JS，不依赖框架，灵活使用，兼容到IE8

## 快速使用

1. 引入原生Echarts库和封装的MyEchart.js

```js
<script src="js/echarts.min.js"></script>
<script src="js/MyEchart.js"></script>
```

2. 定义一块区域显示图形

```html
<div id="echartbox" style="width: 500px; height: 400px"></div>
```

3. 调用的代码

```js
//定义数据
var data= [
    {name: '周一', value: 10},
    {name: '周二', value: 50},
    {name: '周三', value: 100},
    {name: '周四', value: 30},
    {name: '周五', value: 80},
    {name: '周六', value: 90},
    {name: '周日', value: 120}
];
//传入所需参数
var option = MyEchart.optionTemplates('line', {
    type:'line',
    data:data
});
//初始化图形
MyEchart.initChart('echartbox', option);
```

# API配置项说明

基础图形：[API.md](API.md)

地图配置：[API-map.md](API-map.md)

# DEMO

[demo.html](demo.html)

## 待完善

地图自定义图标
饼图修改
雷达图

