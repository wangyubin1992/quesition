<template>
  <div>
  	<div class="bgk">
  		<img class="login" src="../assets/img/login.png" alt="" />
  		<div class="loginMain">
  			<div class="phoneTitle">
  				请输入手机号
  			</div>
  			<input class="phone" v-model="phoneNumber" type="tel" @input="inputStatus" maxlength="11" />
  			<div class="line" style="margin-bottom: 2rem;"></div>
  			<div class="phoneTitle" style="margin: 0;">
  				请输入验证码
  			</div>
  			<div class="codeFather">
  				<input class="code" v-model="codeNumber" @input="inputStatus"  maxlength="4" type="tel" />
  				<div class="inviteCode">获取验证码</div>
  			</div>
  			<div class="line"></div>
  			<div class="btnMain">
  				<div class="btn" ref="codeBtn" @click="loginFn">我要借款</div>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
import { isPhoneNumber } from '../common/js/base'	
import { cookie } from 'vux'

	export default {
		name: 'login',
		data () {
			return {
				phoneNumber: '',
				codeNumber: '',
				status: false
			}
		},
		methods: {
			loginFn: function () {
				console.log(this.$route.query.redirect)
				if(this.status){
					var numbers=this.phoneNumber.trim()
					var codes=this.codeNumber.trim()
					console.log()
					if(numbers == '') {
						this.$vux.toast.show({
						 text: '请输入手机号',
						 type: 'text'
						})
					}else if(codes == ''){
						this.$vux.toast.show({
						 text: '请输入验证码',
						 type: 'text'
						})
					}else if(!isPhoneNumber(numbers)){
						this.$vux.toast.show({
						 text: '输入正确手机号',
						 type: 'text'
						})
					}else{
					      cookie.set('tokenssss', 3)    
					      let redirect = decodeURIComponent(this.$route.query.redirect || '/')
					      let redirecturl =decodeURIComponent(this.$route.query.redirecturl || '/')
					      console.log(redirecturl)
					      this.$router.push({
					        name: 'open',
					        params:{id:redirecturl}
					      })
					}
				}
			},
			inputStatus: function () {
				if(this.phoneNumber!=''&&this.codeNumber!=''){
					this.$refs.codeBtn.classList.add('btnStatus')
					this.status=true
				}else if(this.phoneNumber==''||this.codeNumber==''){
					this.$refs.codeBtn.classList.remove('btnStatus')
					this.status=false
				}
			}
		}
	}
</script>

<style>
	html {
		font-family: "微软雅黑" arial; 
	}
	.bgk {
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.4);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 88;
	}
	.login {
		position: absolute;
		z-index: 89;
		top: 3.875rem;
		left: 50%;
		transform: translate(-50%,0);
		width: 11.9375rem;
	}
	.loginMain {
		width: 15.625em;
		padding:0 1.5625rem;
		height: 15.34375em;
		background: #FFFFFF;
		border-radius: 6px;
		position: relative;
		left: 50%;
		transform: translate(-50%,0);
		top: 9.1rem;
	}
	.phoneTitle {
		text-align: left;
		font-size: 14px;
		color: #B2B2B2;
		margin-top: 1.6875rem;
		line-height: 14px;
		float: left;
		width: 100%;
	}
	input {
		margin-top: 3px;
		border-radius: none;
	    border: none;
		background: #FFFFFF;
		display: inline-block;
		/*height: 1.325rem;*/
		width: 100%;
		height: 23px;
		line-height: 23px;
		font-size: 1rem;
		outline: none;
		color: #323232;	
	}
	.line {
		height: 1px;
		width: 100%;
		background: #EEEEEE;
		margin-bottom: 1.875rem;
	}
	.codeFather {
		overflow: hidden;
		width: 100%;
	}
	.code {
		width: 10.125rem;
		float: left;
	}
	.inviteCode {
		display: inline-block;
		height: 23px;
		line-height: 23px;
		float: right;
		font-size: 14px;
		color: #356BFE;
		width: 5rem;
		text-align: center;
	}
	.btnMain {
		display: table;
	}
	.btn {
		width: 15.4375rem;
		height: 2.46875rem;
		text-align: center;
		color: #FFFFFF;
		font-size: 1.125rem;
		background: #D8D8D8;
		display: table-cell;
    	vertical-align: middle;
    	border-radius: 0.375rem;
	}
	.btnStatus {
		background-image: linear-gradient(-231deg, #00E7FA 0%, #3863FE 100%);
	}
</style>