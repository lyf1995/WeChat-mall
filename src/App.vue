<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
  }
  body {
      /*background: #f1f1f1;*/
      color: #999999;
      font-size: 16px;
  }
    img[lazy="loading"] {
    width: 100%;
    margin: auto;
    background-repeat:no-repeat;
    background-position:center;
    background-size: 50% 50%;
    /*background-image: url(../../static/img/loading.gif);*/
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.clearfix:after{
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}

/*修改element-ui样式*/
.el-checkbox__input.is-checked .el-checkbox__inner{
  background-color: rgb(171, 9, 35);
  border-color: rgb(171, 9, 35);
}
.el-checkbox__input.is-checked+.el-checkbox__label{
  color: rgb(171, 9, 35);
}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
  background-color: rgb(171, 9, 35);
  border-color: rgb(171, 9, 35);
}
.el-checkbox__input.is-disabled+span.el-checkbox__label{
  color: rgb(171, 9, 35);
}
</style>
