import esriLoader from 'esri-loader';
export var gis = {}
var options = {
  // url: "@/../static/3.33/init.js",//这里千万小心，要用绝对路径，这是托管在本地服务器上的地址
  css: true,
  version: '3.33'
}
esriLoader
  .loadModules([
    "esri/map",
    "esri/Color",
    'esri/geometry/Point',
    'esri/geometry/Polyline',
    'esri/geometry/Polygon',
    'esri/graphic',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/SimpleFillSymbol',
    'esri/SpatialReference'
  ], options)
  .then(([
           AMap,
           Color,
           Point,
           Polyline,
           Polygon,
           Graphic,
           SimpleLineSymbol,
           SimpleMarkerSymbol,
           SimpleFillSymbol,
           SpatialReference]) => {
    /**
     * 地图图层增加点坐标
     * @param x 经度
     * @param y 纬度
     * @param data 点击回调返回数据
     * @constructor
     */
    gis.addPoint = function (x, y, data, map) {
      var point = new Point(x, y, new SpatialReference({wkid: 4326}))
      //目前项目使用海南当地坐标系，需要转换坐标系
      var simpleMarkerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 25,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
          new Color([0, 255, 0, 1]), 1),
        new Color([0, 255, 0, 0.6]));
      var infoTemplate = infoTemplate ? new InfoTemplate(infoTemplate) : '';
      var attributes = data
      var graphic = new Graphic(point, simpleMarkerSymbol, attributes, infoTemplate)
      map.graphics.add(graphic)
    }
    /**
     * 地图图层增加线
     * @param arr 坐标数组
     * @param data 点击回调返回数据
     * @constructor
     */
    gis.addPolyline = function (arr, data, map) {
      var polyline = new Polyline(arr, new SpatialReference({wkid: 4326}));
      //目前项目使用海南当地坐标系，需要转换坐标系
      var simpleLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([255, 0, 0]), 2)
      var infoTemplate = infoTemplate ? new InfoTemplate(infoTemplate) : '';
      var attributes = data
      var graphic = new Graphic(polyline, simpleLineSymbol, attributes, infoTemplate)
      map.graphics.add(graphic)
    }

    /**
     * 地图图层增加面
     * @param arr 坐标数组
     * @param data 点击回调返回数据
     * @constructor
     */
    gis.addPolygon = function (arr, data, map) {
      var polygon = new Polygon(arr, new SpatialReference({wkid: 4326}))
      //目前项目使用海南当地坐标系，需要转换坐标系
      var simpleFillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH,
          new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]));
      var infoTemplate = infoTemplate ? new InfoTemplate(infoTemplate) : '';
      var attributes = data
      var graphic = new Graphic(polygon, simpleFillSymbol, attributes, infoTemplate)
      map.graphics.add(graphic)
    }
    /**
     * 单击点触发回调事件
     * @param data
     */
    gis.triggerEvent = function (data) {
      console.log("点击触发")
      console.log(data.graphic.attributes)
    }
  })
