import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem'
			}
		},
		extend: {
			colors: {},
			gridTemplateColumns: {
				'min-100': 'repeat(auto-fit, minmax(100px, 1fr))',
        'min-150': 'repeat(auto-fit, minmax(150px, 1fr))',
        'min-180': 'repeat(auto-fit, minmax(180px, 1fr))',
        'min-200': 'repeat(auto-fit, minmax(200px, 1fr))',
        'min-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'min-300': 'repeat(auto-fit, minmax(300px, 1fr))',
			}
		}
	}
}