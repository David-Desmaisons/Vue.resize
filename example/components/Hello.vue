<template>
  <div class="hello">
    <label>Show examples: <input
        type="checkbox"
        v-model="showExample"
      /></label>

    <div
      class="container"
      v-show="showExample"
    >

      <div>
        <div class="resizable ui-widget-content keep-alive">
          <select v-model="component">
            <option>dummy</option>
            <option>counter</option>
          </select>
          <keep-alive>
            <component :is="component"></component>
          </keep-alive>
        </div>
      </div>

      <div>
        <div>
          <b>Resize count : {{resizeCount}} </b>
        </div>
        <div
          class="resizable ui-widget-content standard"
          v-resize="onResize"
        >
          <b>Standard</b>
        </div>
      </div>

      <div>
        <div>
          <b>Resize count : {{resizeThrottleCount}} </b>
        </div>
        <div
          class="resizable ui-widget-content throttle"
          v-resize:throttle.250="onResizeThrottle"
        >
          <b>Throttle</b>
        </div>
      </div>

      <div>
        <div>
          <b>Resize count : {{resizeDebounceCount}} </b>
        </div>
        <div
          class="resizable ui-widget-content debounce"
          v-resize:debounce="onResizeDebounce"
        >
          <b>Debounce</b>
        </div>
      </div>
    </div>

    <div
      class="container"
      v-show="showExample"
    >
      <div>
        <div>
          <b>Resize count : {{resizeInitialCount}} </b>
        </div>
        <div
          class="resizable ui-widget-content throttle"
          v-resize:throttle.initial.1000="onResizeInitial"
        >
          <b>Initial</b>
        </div>
      </div>

      <div>
        <div>
          <label>Show: <input
              type="checkbox"
              v-model="show"
            /></label>

          <b>Resize count : {{resizeShowCount}} </b>
        </div>
        <div
          class="resizable ui-widget-content"
          v-resize="onResizeShow"
          v-show="show"
        >
          <b>Show</b>
        </div>
      </div>

      <div>
        <div>
          <label>If: <input
              type="checkbox"
              v-model="display"
            /></label>

          <b>Resize count : {{resizeIfCount}} </b>
        </div>
        <div
          class="resizable ui-widget-content"
          v-resize="onResizeIf"
          v-if="display"
        >
          <b>If</b>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import resize from "../../src/Vueresize";
import dummy from "./dummy";
import counter from "./counter";
import $ from "jquery";
import jquery_ui from "jquery-ui/ui/widgets/resizable.js";

export default {
  components: {
    dummy,
    counter
  },
  directives: {
    resize
  },
  mounted() {
    $(".resizable").resizable();
  },
  data() {
    return {
      component: "dummy",
      resizeCount: 0,
      resizeDebounceCount: 0,
      resizeThrottleCount: 0,
      resizeShowCount: 0,
      resizeIfCount: 0,
      resizeInitialCount: 0,
      show: false,
      display: false,
      showExample: false
    };
  },
  methods: {
    onResize() {
      this.resizeCount++;
    },
    onResizeDebounce() {
      this.resizeDebounceCount++;
    },
    onResizeThrottle() {
      this.resizeThrottleCount++;
    },
    onResizeShow() {
      this.resizeShowCount++;
    },
    onResizeInitial() {
      this.resizeInitialCount++;
    },
    onResizeIf() {
      this.resizeIfCount++;
    }
  }
};
</script>
<style>
text {
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

.container {
  display: flex;
  justify-content: space-around;
  font-size: x-large;
}

.resizable.throttle {
  background: blue;
}

.resizable.debounce {
  background: yellow;
}

.resizable.keep-alive {
  background: grey;
}

.resizable.standard {
  background: green;
}

.resizable {
  overflow: hidden;
  background: green;
  height: 200px;
  width: 200px;
  vertical-align: middle;
  display: table-cell;
}
</style>
