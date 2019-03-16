<template>
  <div
    v-resize.count="onResize"
    class="kept"
  >
    <div>
      <b>Resize count : {{resizeCount}} </b>
    </div>
    <div class="ui-widget-content">
      <b>kept alive</b>
    </div>
  </div>
</template>
<script>
import resize from "../../src/Vueresize";

export default {
  directives: {
    resize
  },
  data() {
    return {
      resizeCount: 0
    };
  },
  methods: {
    onResize() {
      this.resizeCount++;
    }
  }
};
</script>
<style>
.kept {
  width: 100%;
  height: 100%;
}
</style>


