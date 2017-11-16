<template>
	<div>
		<x-header title="slot:overwrite-title">
	      <div class="overwrite-title-demo" slot="overwrite-title">
	        <button-tab>
	          <button-tab-item selected>A</button-tab-item>
	          <button-tab-item>B</button-tab-item>
	        </button-tab>
	      </div>
	    </x-header>
	</div>
</template>

<script>
import { XHeader, TransferDom, ButtonTab, ButtonTabItem } from 'vux'	

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    ButtonTab,
    ButtonTabItem
  },
  data () {
    return {
      menus: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
      },
      showMenus: false
    }
  }
}
</script>

<style>
.overwrite-title-demo {
  margin-top: 5px;
}
</style>