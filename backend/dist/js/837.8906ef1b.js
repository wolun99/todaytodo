"use strict";(self["webpackChunklogin_todo"]=self["webpackChunklogin_todo"]||[]).push([[837],{2837:function(e,s,t){t.r(s),t.d(s,{default:function(){return w}});var n=t(3396);function r(e,s,t,r,u,a){const i=(0,n.up)("SignUp");return(0,n.wg)(),(0,n.iD)("div",null,[(0,n.Wm)(i)])}var u=t(9242);const a=(0,n._)("h2",{class:"title"},"회원가입",-1),i=(0,n._)("button",{type:"submit",class:"btn"},"가입하기",-1);function o(e,s,t,r,o,l){return(0,n.wg)(),(0,n.iD)("div",null,[a,(0,n._)("form",{onSubmit:s[3]||(s[3]=(0,u.iM)(((...e)=>l.submitForm&&l.submitForm(...e)),["prevent"]))},[(0,n.wy)((0,n._)("input",{type:"text",class:"id",name:"user_id","onUpdate:modelValue":s[0]||(s[0]=e=>o.user_id=e),placeholder:"id를 입력해주세요"},null,512),[[u.nr,o.user_id]]),(0,n.wy)((0,n._)("input",{type:"password",class:"pw",name:"user_pw","onUpdate:modelValue":s[1]||(s[1]=e=>o.user_pw=e),placeholder:"비밀번호를 입력해주세요",autocomplete:"off"},null,512),[[u.nr,o.user_pw]]),(0,n.wy)((0,n._)("input",{type:"text",class:"nickname",name:"nickname","onUpdate:modelValue":s[2]||(s[2]=e=>o.user_name=e),placeholder:"닉네임을 입력해주세요"},null,512),[[u.nr,o.user_name]]),i],32)])}var l=t(7877),p={data(){return{user_id:"",user_pw:"",user_name:"",user_same:{}}},methods:{async submitForm(){if(""===this.user_id||""===this.user_pw||""===this.user_name)alert("정보를 입력해주세요");else{const e={user_id:this.user_id,user_pw:this.user_pw,user_name:this.user_name},s=await(0,l.a$)(e);this.user_same=s.data.message,"이미 있는 ID입니다"===this.user_same?(alert("있는ID입니다. 다른ID로 등록해주세요"),this.$router.push("/sign")):this.$router.push("/")}}}},m=t(89);const _=(0,m.Z)(p,[["render",o]]);var d=_,c={components:{SignUp:d}};const h=(0,m.Z)(c,[["render",r]]);var w=h}}]);
//# sourceMappingURL=837.8906ef1b.js.map