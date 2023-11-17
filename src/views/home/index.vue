<template>
  <div class="home" ref="homeRef">

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as Cesium from 'cesium'
import "cesium/Build/Cesium/Widgets/widgets.css";


const homeRef = ref()

onMounted(() => {
  init()
})

async function init() {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjOGEwOThlNi1kMTQ3LTRmZjEtOWZiNS0yM2IwMmQ0MTM4YTciLCJpZCI6MTc4NjM2LCJpYXQiOjE3MDAwOTgxMjZ9.YAETn7fCjaCPPTCJp0fTCxbWycON4B2EfRBC8kLCFgA'



  const viewer = new Cesium.Viewer(homeRef.value, {
    // baseLayerPicker: false
    animation: false,
    timeline: false,
    infoBox: false,
    // fullscreenButton: false,
    baseLayerPicker: false,
    sceneModePicker: false,
    geocoder: false,
    homeButton: false,
    navigationHelpButton: false,
    terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(
      1
    )
  })



  // viewer.scene.globe.depthTestAgainstTerrain = true;




  try {
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2354539);

    viewer.scene.primitives.add(tileset);
    // await viewer.zoomTo(tileset);

    await viewer.flyTo(tileset, {
      duration: 3,
      maximumHeight: 10000,

    })

    // Apply the default style if it exists
    const extras = tileset.asset.extras;
    if (
      Cesium.defined(extras) &&
      Cesium.defined(extras.ion) &&
      Cesium.defined(extras.ion.defaultStyle)
    ) {
      tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
    }



    // lookAt 跳转到设置的目的地上，但是使用鼠标旋转的时候位置不会改变 会一直围绕目的地旋转
    // 只需要设置经纬度即可 无需设置高度  
    // 此方法用于锁定某个场景的视角

    const center = Cesium.Cartesian3.fromDegrees(120.2012295808, 30.2546480419)
    const heading = Cesium.Math.toRadians(50)  // 水平旋转角度
    const pitch = Cesium.Math.toRadians(-40)  // 垂直旋转角度
    const range = 1500  // 设置相机距离目标点的高度

    viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range))






    // DirectionalLight 表示 从无限远的地方向单一方向发射的光。
    // 解决模型光照问题
    viewer.scene.light = new Cesium.DirectionalLight({
      direction: new Cesium.Cartesian3(0.354925, -0.890918, -0.283358)
    });
  } catch (error) {
    console.log(error);
  }







}

</script>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
}
</style>