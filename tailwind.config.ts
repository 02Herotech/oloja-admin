import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#381F8C",
				secondary: "#E58C06",
				dark: "#1E1E1E",
				status: {
					success: {
						"10": "#F3FEF3",
						"100": "#0D6211",
					},
					warning: {
						100: "#F7D4C3",
						500: "#E6733C",
					},
					error: {
						"10": "#FEE4E2",
						"100": "#F04438",
					},
					information: {
						"10": "#F2F8FF",
						"100": "#004FA9",
					},
					grey: '#55535A'
				},
				tc: {
					primary: "#190E3F",
					dark: "#140B31"
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				satoshi: "Satoshi, sans-serif",
				satoshiMedium: "SatoshiMedium, sans-serif",
				satoshiBold: "SatoshiBold, sans-serif",
				clash: "Clash, sans-serif",
				clashMedium: "ClashMedium, sans-serif",
				clashSemiBold: "ClashSemiBold, sans-serif",
				clashBold: "ClashBold, sans-serif",
			},
			container: {
				center: true,
				padding: {
					DEFAULT: "1rem",
					sm: "2rem",
					lg: "4rem",
					xl: "5rem",
					"2xl": "6rem",
				},
			},
			backgroundImage: {
				"auth-bg": "url('/assets/images/auth-bg.png')",
			},
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
};
export default config;
