<template>
  <div>
    <div class="listMain" ref="listMain">
    	<div class="top" v-if="this.id!=''">经统计同时申请多家贷款产品，可以极大提高成功率</div>
    	<router-link :to="{name:'product',params:{id:todo.productId}}" class="productMain" v-for="todo in todos" :key="todo.src">
    	<div class="productBox_l boxTop">
    		<img class="logos" :src="todo.productImg" alt="" />
    		<div>{{todo.productName}}</div>
    		<img v-if="todo.isNew==1" class="new" src="../assets/272240896878078936.png" alt="" />
    	</div>
    	<div class="productBox_c boxTop">
    		<div class="center">
    			<span class="tip" v-if="todo.productLabel.length>0" :style="{color:todo.productLabel[0].labelLcolor,borderColor:todo.productLabel[0].labelLcolor}">{{todo.productLabel.length<=0?'':todo.productLabel[0].lableName}}</span>
    			<span class="text">{{todo.recommendReason}}</span>
    			<div class="monetNumber">最高可贷<span>{{todo.loanRangeMax}}元</span></div>
    		</div>
    	</div>
    	<div class="productBox_r boxTop">
    		<router-link class="go" href="#/component/cell" ref="nowGo" :to="{name:'open',params:{id:todo.productUrl}}" >立即申请</router-link>
    	</div>
    	</router-link>
    	<load-more v-show="loading" :tip="$t('正在加载')"></load-more>
    	<div class="bottom" ref="bottom">{{tip}}</div>
    </div>
  </div>
</template>



<script>
import { Panel, Group, Radio, cookie, LoadMore } from 'vux'

export default {
	name: 'list',
  components: {
    Panel,
    Group,
    Radio,
    LoadMore
  },
  methods: {
  	/*檢測滾動*/
    handleScroll: function () {
    	if(this.$refs.listMain){
    		var productMain = this.$refs.listMain
	    	var top=document.body.scrollTop||document.documentElement.scrollTop
	    	if(document.body.scrollHeight<=top+document.documentElement.clientHeight){
	    		if(this.flag){
	    			this.flag=false
	    			this.loading=true
		    		this.page++
		    		this.id==''?'':this.id
		    		this.ajax(this.id,this.page)
	    		}
	    	}
    	}
    	
    },
    ajax: function (zoneId,page) {
    	var page=page
    	var zoneId=zoneId
    	if(!page){
    		page=1
    	}
    	if(!zoneId){
    		zoneId=''
    	}
    	/*请求*/
	    this.$http.post(this.javaApi+'/weixinWeb/product/list',
	          {
	            "versionId": "2.0",
	            "flag": "2",
	            "page": page,
	            "zoneId": zoneId
	          },
	          {
	            headers:{
	
	            },
	            emulateJSON: false
	          }
	      ).then((response) => {
	        if(response.data.returnCode == 200) {
	        	var items=response.data.data.list
	        	
	        	Object.keys(items).forEach(key => {
	        		items[key].links={name:'list',params:{id:items[key].zoneId}}
						  this.todos.push(items[key])
						})
	        	var that=this
	        	if(response.data.data.list.length==0){
	        		that.loading=false
	        		this.tip="没有更多了！"
	        	}else{
	        		setTimeout(function(){
	        		that.loading=false
	        		that.flag=true
	        		},1000)
	        	}
	        	
	        }
	      }).catch(function(response) {
	        console.log(response)
	      })
    }
  },
  mounted () {
	  window.addEventListener('scroll', this.handleScroll)
  },
  created: function() {
   var id = this.$route.params.id?this.$route.params.id:''
   if(id==''){
   	 this.ajax()
   }else{
   	this.id=id
   	console.log(id)
   	 this.ajax(id)
   }
  },
  data () {
    return {
      todos: [],
      loading: false,
      page: 1,
      flag: true,
      tip: '',
      id: ''
    }
  }
}
</script>

<style scoped>
	/*卡片主体*/
	.productMain {
		margin:0 7px;
    	position: relative;
		display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    /*-webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;*/
	    height: 7.4em;
	    font-size: 12px;
	    background: #FFFFFF;
	    box-shadow: 0 2px 9px 0 rgba(53,107,254,0.10);
		border-radius: 6px;
		margin-top: 10px;
		font-family: "微软雅黑" arial;
	}
	/*区域*/
	.boxTop {
		margin-top: 15px;
		flex: 1;
		
	}
	.productBox_c.boxTop {
		flex: 2;
	}
	.productBox_l {
		color: #727272;
		text-align: center;
		font-size: 10px;
	}
	.productBox_r {
		text-align: center;
	}
	/*左边*/
	.logos {
		width: 38px;
		height: 38px;
		border: 0;
		vertical-align: top;
		border: 1px solid #FFFFFF;
		border-radius: 50%;	
	}
	.productBox_l .new {
		width: 30px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
	}
	/*中间*/
	.productBox_l {
		display: inline-block;
		border-radius: 100px;
		
	}
	.tip {
		display: inline-block;
		border: 1px solid #FE6F78;
		border-radius: 100px;
		color: #FE6F78;
		line-height: 1.2;
		padding: 1px 2px;
	}
	.text {
		font-size: 12px;
		color: #323232;
		letter-spacing: -0.33px;
		line-height: 20px;
		font-weight: 400;
	}
	.monetNumber {
		font-size: 10px;
		color: #B2B2B2;
	}
	.monetNumber span {
		color: #356BFE;
	}
	.go {
		
		background: rgba(53,107,254,0.04);
		border: 1px solid #356BFE;
		border-radius: 4px;
		display: inline-block;
		line-height: 1;
		color: #356BFE;
		font-size: 13px;
		padding: 6px 5px;
	}
	.bottom {
		width: 100%;
		height: 85px;
		line-height: 40px;
		text-align: center;
		font-size: 14px;
		color: #000000;
		background: #FFFFFF;
	}
	.top {
		width: 100%;
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		font-size: 12px;
		background: #FFAF35;
		text-align: center;
	}
</style>