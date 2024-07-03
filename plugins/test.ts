export default defineNuxtPlugin({
	async setup(nuxtApp) {
		console.info(nuxtApp)
		nuxtApp.hook('app:created', app => {
			console.info('app:created')
			console.info(app)
		})
	},
	hooks: {
		'app:created'(app){
			console.info('hooks-app:created')
		}
	}
})