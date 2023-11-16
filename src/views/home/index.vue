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








  try {

    const terrainProviderUrl = await Cesium.CesiumTerrainProvider.fromIonAssetId(
      1
    )
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2354539);
    console.log(terrainProviderUrl)
    const viewer = new Cesium.Viewer(homeRef.value, {
      // baseLayerPicker: false
      animation: false,
      timeline: false,
      infoBox: false,
      terrainProvider: terrainProviderUrl
    })
    console.log(viewer)

    viewer.scene.primitives.add(tileset);
    // await viewer.zoomTo(tileset);
    // await viewer.flyTo(tileset, {
    //   duration: 10,
    //   maximumHeight: 10000
    // })

    // Apply the default style if it exists
    const extras = tileset.asset.extras;
    if (
      Cesium.defined(extras) &&
      Cesium.defined(extras.ion) &&
      Cesium.defined(extras.ion.defaultStyle)
    ) {
      tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);


    }
    viewer.camera.flyTo({
      destination: tileset,
      // orientation: {
      // }
    })

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

<style scoped lang="less"></style>