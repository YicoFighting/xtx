import XtxSwiper from '@/components/xtx-swiper/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
  }
}

// 组件实例类型
export type XtxSwiperInstance = InstanceType<typeof XtxSwiper>
