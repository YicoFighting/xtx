<template>
  <nav-bar></nav-bar>
  <!-- 自定义轮播图 -->
  <xtx-swiper :list="bannerList"></xtx-swiper>
  <!-- 分类面板 -->
  <CategoryPanel :list="categoryList" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import NavBar from '@/components/nav-bar/index.vue'
import CategoryPanel from './components/category-panel/index.vue'

import type { BannerItem, CategoryItem } from '@/types/home'
import { getHomeBannerAPI, getHomeCategoryAPI } from '@/services/home'

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

// 页面加载
onLoad(async () => {
  await Promise.all([getHomeBannerData(), getHomeCategoryData()])
})
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}
</style>
