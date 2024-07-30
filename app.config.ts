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
					link: '/',
					target: '_self'
				},
				{
					key: 'topRated',
					link: '/',
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
					link: '/contact-us',
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
					link: '/order',
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
	// 以下是社会化分享的相关配置
	socialList: [
		{
			title: 'blogger',
			icon: 'i-ri-blogger-fill',
			link: 'https://www.91temaichang.com'
		},
		{
			title: 'instagram',
			icon: 'i-ri-instagram-line',
			link: 'https://www.instagram.com/kbmjj123'
		},
		{
			title: 'twitter',
			icon: 'i-ri-twitter-fill',
			link: 'https://x.com/kbmjj123'
		},
		{
			title: 'github',
			icon: 'i-ri-github-fill',
			link: 'https://github.com/kbmjj123'
		},
		{
			title: 'linkedin',
			icon: 'i-ri-linkedin-box-fill',
			link: 'https://www.linkedin.com/in/%E8%80%BF%E6%9E%97-%E9%83%91-a34014230/'
		}
	],
	// 以下是可配置的分享至三方平台的相关配置
	availableSocialNetworks: [
		'facebook',
		'pinterest',
		'sms',
		'twitter',
		'vk',
		'weibo'
	],
	// 以下是平台说明的相关配置
	platformDescList: [
		{
			icon: 'free-shipping.svg',
			titleKey: 'freeShipping',
			descKey: 'freeShippingDesc'
		},
		{
			icon: 'peace-of-mind.svg',
			titleKey: 'peaceOfMind',
			descKey: 'peaceOfMindDesc'
		},
		{
			icon: 'payment-secure.svg',
			titleKey: 'paymentSecure',
			descKey: 'paymentSecureDesc'
		},
		{
			icon: 'support.svg',
			titleKey: 'support',
			descKey: 'supportDesc'
		}
	],
	// 以下是系统通过配置使用的系统主题色(nuxt-ui)
	ui: {
		primary: 'red',
		gray: 'cool'
	}
})