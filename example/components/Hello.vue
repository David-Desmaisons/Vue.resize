<template>
  <div class="hello">
     <div class="container"> 
        <div> 
            <div> 
              <b>Resize count : {{resizeCount}} </b>    
            </div>
          <div class="resizable ui-widget-content" v-resize="onResize">
            <b>Standard</b>
          </div>
        </div>

      <div> 
          <div> 
            <b>Resize count : {{resizeThrottleCount}} </b>  
          </div>
          <div class="resizable ui-widget-content" v-resize:throttle.250="onResizeThrottle">
             <b>Throttle</b>  
          </div>
        </div>

          <div> 
          <div> 
            <b>Resize count : {{resizeDebounceCount}} </b>  
          </div>
          <div class="resizable ui-widget-content" v-resize:debounce="onResizeDebounce">
              <b>Debounce</b>  
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import resize from '../../src/Vueresize'
import $ from 'jquery'
import jquery_ui from 'jquery-ui/ui/widgets/resizable.js'

export default {
  directives: {
    resize
  },
  mounted() {
    $('.resizable').resizable()
  },
  data () {
    return {
      resizeCount: 0,
      resizeDebounceCount:0,
      resizeThrottleCount:0
    }
  },
  methods:{
    onResize () {
      this.resizeCount++;
    },
    onResizeDebounce () {
      this.resizeDebounceCount++;
    },
     onResizeThrottle () {
      this.resizeThrottleCount++;
    }
  }
}
</script>
<style>
text{
  font-size: 20px;
}

.item {
  background-color: #eee;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-family: monospace;
  color: #333;
  border: 2px solid #b6b5b4;
}

.container{
  display: flex;
  justify-content: space-around;
  font-size: x-large;
}

.resizable {
  overflow: hidden;
  background: green !important;
  height: 200px;
  width: 200px;
  vertical-align: middle;
  display: table-cell;
}
</style>
