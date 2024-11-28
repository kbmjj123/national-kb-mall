import { LoginModal } from '#components'
/**
 * 
 * @param func 登录成功后的回调，也就是登录状态下直接执行的操作
 */
export const useLogin = (callback: Function) => {
	const userStore = useStore()
	if(userStore.isLogin){
		callback && callback()
	}else{
		// 弹出全局的登录对话框
		const modal = useModal()
		modal.open(LoginModal, {
			callback: () => {
				callback && callback()
			}
		})
	}
}