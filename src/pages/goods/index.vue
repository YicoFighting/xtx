<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

import { getGoodsByIdAPI } from '@/services/goods'
import type { GoodsResult } from '@/types/goods'
import AddressPanel from './components/address-panel/index.vue'
import ServicePanel from './components/service-panel/index.vue'
import PageSkeleton from './components/page-skeleton/index.vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 接收页面参数
const query = defineProps<{
  id: string
}>()

// 获取商品详情信息
const goods = ref<GoodsResult>()
const loading = ref(false)
const getGoodsByIdData = async () => {
  loading.value = true
  const res = await getGoodsByIdAPI(query.id)
  goods.value = res.result
  loading.value = false
}

// 轮播图变化时
const currentIndex = ref(0)
const onChange: UniHelper.SwiperOnChange = (ev) => {
  currentIndex.value = ev.detail.current
}

// 点击图片时
const onTapImage = (url: string) => {
  // 大图预览
  uni.previewImage({
    current: url,
    urls: goods.value!.mainPictures,
  })
}

// uni-ui 弹出层组件 ref
const popup = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()

// 弹出层条件渲染
const popupName = ref<'address' | 'service'>()
const openPopup = (name: typeof popupName.value) => {
  // 修改弹出层名称
  popupName.value = name
  // 打开弹出层
  popup.value?.open()
}

// 页面加载
onLoad(() => {
  getGoodsByIdData()
})
</script>

<template>
  <page-skeleton v-if="loading"> </page-skeleton>
  <template v-else>
    <scroll-view scroll-y enable-back-to-top class="viewport">
      <!-- 基本信息 -->
      <view class="goods">
        <!-- 商品主图 -->
        <view class="preview">
          <swiper @change="onChange" circular>
            <swiper-item v-for="item in goods?.mainPictures" :key="item">
              <image class="image" @tap="onTapImage(item)" mode="aspectFill" :src="item" />
            </swiper-item>
          </swiper>
          <view class="indicator">
            <text class="current">{{ currentIndex + 1 }}</text>
            <text class="split">/</text>
            <text class="total">{{ goods?.mainPictures.length }}</text>
          </view>
        </view>

        <!-- 商品简介 -->
        <view class="meta">
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods?.price }}</text>
          </view>
          <view class="name ellipsis">{{ goods?.name }}</view>
          <view class="desc"> {{ goods?.desc }} </view>
        </view>

        <!-- 操作面板 -->
        <view class="action">
          <view class="item arrow">
            <text class="label">选择</text>
            <text class="text ellipsis"> 请选择商品规格 </text>
          </view>
          <view class="item arrow" @tap="openPopup('address')">
            <text class="label">送至</text>
            <text class="text ellipsis"> 请选择收获地址 </text>
          </view>
          <view class="item arrow" @tap="openPopup('service')">
            <text class="label">服务</text>
            <text class="text ellipsis"> 无忧退 快速退款 免费包邮 </text>
          </view>
        </view>
      </view>

      <!-- 商品详情 -->
      <view class="detail panel">
        <view class="title">
          <text>详情</text>
        </view>
        <view class="content">
          <view class="properties">
            <!-- 属性详情 -->
            <view class="item" v-for="item in goods?.details.properties" :key="item.name">
              <text class="label">{{ item.name }}</text>
              <text class="value">{{ item.value }}</text>
            </view>
          </view>
          <!-- 图片详情 -->
          <image
            v-for="item in goods?.details.pictures"
            :key="item"
            class="image"
            mode="widthFix"
            :src="item"
          ></image>
        </view>
      </view>

      <!-- 同类推荐 -->
      <view class="similar panel">
        <view class="title">
          <text>同类推荐</text>
        </view>
        <view class="content">
          <navigator
            v-for="item in goods?.similarProducts"
            :key="item.id"
            class="goods"
            hover-class="none"
            :url="`/pages/goods/goods?id=${item.id}`"
          >
            <image class="image" mode="aspectFill" :src="item.picture"></image>
            <view class="name ellipsis">{{ item.name }}</view>
            <view class="price">
              <text class="symbol">¥</text>
              <text class="number">{{ item.price }}</text>
            </view>
          </navigator>
        </view>
      </view>
    </scroll-view>

    <!-- 用户操作 -->
    <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      <view class="icons">
        <button class="icons-button"><text class="icon-heart"></text>收藏</button>
        <button class="icons-button" open-type="contact">
          <text class="icon-handset"></text>客服
        </button>
        <navigator class="icons-button"><text class="icon-cart"></text>购物车</navigator>
      </view>
      <view class="buttons">
        <view class="addcart"> 加入购物车 </view>
        <view class="payment"> 立即购买 </view>
      </view>
    </view>

    <!-- uni-ui 弹出层 -->
    <uni-popup ref="popup" type="bottom" background-color="#fff">
      <AddressPanel v-if="popupName === 'address'" @close="popup?.close()" />
      <ServicePanel v-if="popupName === 'service'" @close="popup?.close()" />
    </uni-popup>
  </template>
</template>

<style lang="scss">
@import './style/goods.scss';
</style>
