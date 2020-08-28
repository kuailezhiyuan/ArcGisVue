<template>
  <div id="map"></div>
</template>

<script>
  import esriLoader from  'esri-loader'
  import {gis} from '@/assets/js/gis.js'
    export default {
      name: "gis",
      mounted() {
        var options={
          // url: "@/../static/3.33/init.js",//这里千万小心，要用绝对路径，这是托管在本地服务器上的地址
          css: true,
          version: '3.33'
        }
        esriLoader
          .loadModules(['esri/map'],options)
          .then(([ArcGISMap]) => {
            var map = new ArcGISMap('map', {
              basemap: 'gray',
              center: [110.26, 20.0],
              zoom: 10,
              logo: false
            });

              map.on('load', function () {
                //绑定单击点触发回调
                map.graphics.on('mouse-down', function (event) {
                  gis.triggerEvent(event)
                });

                //模拟坐标数据
                let arr_polygon = [[110.21, 20.1], [110.20, 20.2], [110.22, 20.2], [110.28, 20.1],[110.25, 20.0] ,[110.21, 20.1]]
                let arr_point = [[110.26, 20.0], [110.21, 20.0], [110.22, 20.0], [110.23, 20.0], [110.231, 20.0]]
                //遍历模拟数据添加点
                arr_point.forEach((item, index, array) => {
                  gis.addPoint(item[0], item[1], {name: "点 - "+index},map)
                })
                //添加线
                gis.addPolyline([[110.3, 20.0], [110.28, 20.1], [110.295, 20.2]], {name:"线"},map)
                //添加面
                gis.addPolygon(arr_polygon, {name:"面"},map)
              })
          });
      },
      beforeDestroy() {
        if (this.view) {
          // destroy the map view
          this.view.container = null;
        }
      }
    };


</script>

<style scoped>

</style>
