<template>
	<iframe src="" ref="open" width="100" height="30" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
</template>

<script>
	export default {
	   created: function() {
	        var id = this.$route.params.id?this.$route.params.id:''
	        if(id==''){
	        	this.$router.back(-1)
	        }else{
	        	window.location.href=id
	        }
	        
	   }
	}
</script>

<style>
</style>