<template>
  <div>
    <grid :cols='4'>
      <grid-item :link=todo.links :label=todo.zoneName v-for="todo in todos" :key="todo.src">
        <img slot="icon" :src=todo.labelBackgroundImg >
      </grid-item>
    </grid>
    
  </div>
</template>

<script>
import { Grid, GridItem } from 'vux'


export default {
	name: 'productList',
  components: {
    Grid,
    GridItem
  },
   data () {
    return {
      todos: []
	  } 
  },
  methods: {
    onItemClick () {
      console.log('on item click')
    }
  },
  created: function() {
  	var timestamp=Date.parse(new Date())
  	/*请求*/
    this.$http.post(this.javaApi+'/weixinWeb/product/queryTopWoolen',
          {
            "timestamp": timestamp
          },
          {
            headers:{

            },
            emulateJSON: false
          }
      ).then((response) => {
        if(response.data.returnCode == 200) {
        	var items=response.data.data.zoneProductList
        	Object.keys(items).forEach(key => {
        		items[key].links={name:'list',params:{id:items[key].zoneId}}
					  this.todos.push(items[key])
					})
        	
        }
      }).catch(function(response) {
        console.log(response)
      })
  }
}
</script>

<style>
.weui-grids {
	height: 170px;
}
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.weui-grids {
	padding: 0 10px;
}
.weui-grids .weui-grid {
	padding: 5px 10px 5px 10px;
}
.weui-grid .weui-grids {
	padding: 10px 5px;
}
.weui-grids .weui-grids:before {
	height: 0;
	content: none;
}
.weui-grids .weui-grid:before {
	width: 0;
	content: none;
}
.weui-grids .weui-grid:after {
	height: 0;
	width: 0;
	content: none;
}

.weui-grids .weui-grids:after {
	content: none;
}
.weui-grid .weui-grid__icon {
	width: 48px;
	height: 48px;
}
.weui-grid .weui-grid__label {
	font-size: 10px;
	color: #323232;
	font-family: "微软雅黑" arial;
}
</style>