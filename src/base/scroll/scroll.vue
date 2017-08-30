<template>
<div ref="wrapper">
  <slot>

  </slot>

</div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1

    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  mounted() {

    setTimeout(() => {
      //确保dom已经渲染
      this._initScroll()

    }, 20)

  },

  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
    },
    enabled(){
      this.scroll && this.scroll.enabled()
    },
    disable(){
      this.scroll && this.scroll.disable()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  },
  watch:{
    data(){
      setTimeout(()=>{
        this.refresh()
      },20)
    }
  }

}
</script>
