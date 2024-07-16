export default defineAppConfig({
	// 应用相关
	appName: 'KB商城',
	keywords: 'KB商城, 我的商城, 开源商城',
	// 以下是系统的链接配置相关
	footerLinks: [
		{
			titleKey: 'information',
			links: [
				{
					key: 'about',
					link: '/about',
					target: '_self'
				},
				{
					key: 'careers',
					link: '/careers',
					target: '_self'
				},
				{
					key: 'press',
					link: '/press',
					target: '_self'
				},
				{
					key: 'faq',
					link: '/faq',
					target: '_self'
				}
			]
		},
		{
			titleKey: 'products',
			links: [
				{
					key: 'newArrivals',
					link: '/new-arrivals',
					target: '_self'
				},
				{
					key: 'onSale',
					link: '/on-sale',
					target: '_self'
				},
				{
					key: 'topRated',
					link: '/top-rated',
					target: '_self'
				},
				{
					key: 'giftCards',
					link: '/gift-cards',
					target: '_self'
				}
			]
		},
		{
			titleKey: 'customerService',
			links: [
				{
					key: 'contactUs',
					link: '/contace-us',
					target: '_self'
				},
				{
					key: 'shippingReturns',
					link: '/shipping-returns',
					target: '_self'
				},
				{
					key: 'privacyPolicy',
					link: '/privacy-policy',
					target: '_self'
				},
				{
					key: 'termsConditions',
					link: '/terms-conditions',
					target: '_self'
				}
			]
		},
		{
			titleKey: 'myAccount',
			links: [
				{
					key: 'myAccount',
					link: '/my-account',
					target: '_self'
				},
				{
					key: 'orderHistory',
					link: '/order-history',
					target: '_self'
				},
				{
					key: 'wishlist',
					link: '/wishlist',
					target: '_self'
				},
				{
					key: 'newsletter',
					link: '/newsletter',
					target: '_self'
				}
			]
		}
	],
	// 以下是系统通过配置使用的系统主题色(nuxt-ui)
	ui: {
		primary: 'red',
		gray: 'cool'
	}
})