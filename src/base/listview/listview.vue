<template>
<scroll class="listview" :data="data" ref="listview">
  <slot>
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="i in group.items" class="list-group-item">
            <img v-lazy="i.avatar" class="avatar" />
            <span class="name">{{i.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutlist" class="item" :data-index="index">
          {{item}}
        </li>

      </ul>

    </div>

  </slot>
</scroll>
</template>



<script>
import Scroll from 'base/scroll/scroll'
import {
  getData
} from 'common/js/dom'
const ANCHOR_HEIGHT = 18
export default {
  created() {
    //不需要观测变化的值
    this.touch = {}
  },

  props: {
    data: {
      type: Array,
      default: []
    },

  },
  computed: {
    shortcutlist() {
      return this.data.map((i) => { //只取第一个字
        return i.title.substring(0, 1)
      })
    }

  },
  methods: {
    onShortcutTouchStart(e) {
      // console.log(e.target.getAttribute('data-index'));
      let anchorIndex = getData(e.target, 'index')
      //获取第一个手势的位置
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      //滑动扫过的item个数
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 //向下取整
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      console.log(anchorIndex + 'now');
      this._scrollTo(anchorIndex)

    },
    _scrollTo(index) {
      //定位到listGroup对应到位置
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)//缓存动画时间为0
    }

  },
  components: {
    Scroll
  },
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
