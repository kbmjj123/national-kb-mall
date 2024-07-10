import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
	theme: {
		extend: {
			colors: {
				background: {
					light: '#fff',
					dark: '#121212'
				},
				text: {
					light: '#000',
					dark: '#fff'
				},
			}
		}
	}
}