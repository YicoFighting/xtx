<template>
  <nav-bar></nav-bar>
  <xtx-swiper :list="bannerList"></xtx-swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import NavBar from '@/components/nav-bar/index.vue'

import type { BannerItem } from '@/types/home'
import { getHomeBannerAPI } from '@/services/home'

// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 页面加载
onLoad(async () => {
  await Promise.all([getHomeBannerData()])
})
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}
</style>
