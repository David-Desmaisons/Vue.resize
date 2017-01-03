<template>
  <div class="hello">
    <div> 
      <b>Resize count : {{resizeCount}} </b>  
    </div>
    <div class="resizable ui-widget-content" v-resize="onResize">
        <div v-for="element in list" :key="element.id">
          {{element.name}} <br>
          {{element.id}}
        </div>
    </div>
    <button @click="addItem">Add item</button>
  </div>
</template>

<script>
import resize from '../../src/Vueresize'
import $ from 'jquery'
import jquery_ui from 'jquery-ui/ui/widgets/resizable.js'

const names= ['John', 'Ringo', 'Paul', 'George']
let count =5

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
      list: names.map((name, id)=>{ return {name, id}})
    }
  },
  methods:{
    addItem () {
      this.list.push({name: 'Jimmy', id: count++})
    },
    onResize () {
      this.resizeCount++;
    }
  }
}
</script>
<style>
.item {
  background-color: #eee;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-family: monospace;
  color: #333;
  border: 2px solid #b6b5b4;
}

.resizable {
  overflow: hidden;
}
</style>
