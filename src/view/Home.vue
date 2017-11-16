<template>
  <div>
    <producs></producs>
    <list type="fes"></list>
    <router-view></router-view>
  </div>
</template>



<script>
import producs from '@/components/ProducList'
import list from '@/components/List'

export default {
	name: 'home',
	  components: {
	    producs,
	    list
	  }
}
</script>

<style scoped>
.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>
