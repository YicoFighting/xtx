<template>
  <view class="viewport">
    <!-- 自定义导航栏 -->
    <nav-bar></nav-bar>
    <!-- 滚动容器 -->
    <scroll-view scroll-y @scrolltolower="onScrolltolower">
      <!-- 自定义轮播图 -->
      <xtx-swiper :list="bannerList"></xtx-swiper>
      <!-- 分类面板 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <xtx-guess ref="guessRef"></xtx-guess>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import NavBar from '@/components/nav-bar/index.vue'
import CategoryPanel from './components/category-panel/index.vue'
import HotPanel from './components/hot-panel/index.vue'

import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { XtxGuessInstance } from '@/types/components'

// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

// 获取猜你喜欢组件实例
const guessRef = ref<XtxGuessInstance>()

// 滚动触底事件
const onScrolltolower = () => {
  guessRef.value?.getMore()
}

// 页面加载
onLoad(async () => {
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
})
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
}
</style>
