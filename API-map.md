## Echarts二次封装——地图

## 快速使用

1. 添加所需的省市区json文件，路径`js/map/json/china.json`

2. 引入原生Echarts库，jquery库和封装的MyEchart-map.js

```js
<script src="js/jquery-1.11.0.min.js"></script>
<script src="js/echarts.min.js"></script>
<script src="js/MyEchart-map.js"></script>
```

3. 定义一块区域显示图形

```html
<div id="mapChart" style="width: 800px; height: 600px;"></div>
```

4. 调用的代码

```js
//初始化地图，'mapChart'为显示区域的id，'china'为省市区json文件的名字
MyMap.initChart('mapChart','china',{});
```

## 配置项说明

属性|描述
-|-
label|是否显示省市区名称（布尔值），默认显示
labelColor|文字颜色
labelColorHover|文字hover颜色
areaColor|区块颜色
areaColorHover|区块hover颜色
borderColor|边界线颜色
data|添加地图标记的数据
maskType|添加标记的类型（scatter，effectScatter），默认scatter

### 数据结构

```js
//name：名称，size：标记的大小，color：标记的颜色
var mapData = [
    {name:'北京', size:20, color:'#ff2136'},
    {name:'上海', size:30, color:'#8de2a2'},
    {name:'湖北', size:10, color:'#ffa63d'}
]
````

### 添加点击事件，获取标记信息

```js
mapbox.on('click',function(data){
    console.log(data)
})
```

### 完整示例

```js
var mapData = [
    {name:'北京', size:20, color:'#ff2136'},
    {name:'上海', size:30, color:'#8de2a2'},
    {name:'湖北', size:10, color:'#ffa63d'}
]
var mapbox = MyMap.initChart('mapChart','china',{
    data:mapData,
    labelColor:'#fff',
    labelColorHover:'#ff0',
    areaColor:'#12427b',
    areaColorHover:'#5183f6',
    borderColor: '#4e80f0',
    maskType:'effectScatter'    
});
mapbox.on('click',function(data){
    console.log(data)
})
```

