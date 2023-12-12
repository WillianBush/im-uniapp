//不同于Mutations只能是同步函数，在actions里可以执行异步操作
//actions：相当于组件中的methods。注意：这里可以执行异步操作。如网络请求的操作都可以mutations是不能执行异步操作的
//第一个参数是context【与 store 实例具有相同方法和属性的 context 对象】 ，也可以向actions里的函数传入第二个参数即payload，自定义的
//因为context与store实例一样，所以可以使用store里面的方法和属性。如context.commit，context.state，context.getters等等
/**
比如这样
t(context ,payload){
		
}
或
t:(context ,payload)=>{
	
}
**/
//在使用actions里的函数时应使用this.$store.dispatch(方法名)或this.$store.dispatch(方法名,载荷/即参数)
export default {
}