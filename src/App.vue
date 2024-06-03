<template>
  <h1>Hello World</h1>
  <div id="app">
    <Content />
  </div>
</template>

<script>
import Content from './components/content.vue';

export default {
  name: 'App',
  components: {
    Content,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

#app {
  font-family: 'Space Mono', monospace;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #00ffff; /* Aqua background color */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
