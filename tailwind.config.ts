import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'vivaldi': ['Vivaldi', 'cursive'],
				'playfair': ['Playfair Display', 'serif'],
				'inter': ['Inter', 'system-ui', 'sans-serif'],
				'source': ['Source Sans Pro', 'system-ui', 'sans-serif'],
				'open': ['Open Sans', 'system-ui', 'sans-serif'],
				'heading': ['Source Sans Pro', 'Inter', 'system-ui', 'sans-serif'],
				'body': ['Inter', 'system-ui', 'sans-serif'],
				'mystical': ['Playfair Display', 'serif'],
				'typewriter': ['Source Code Pro', 'Courier New', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			backgroundImage: {
				'gradient-aurora': 'var(--gradient-aurora)',
				'gradient-healing': 'var(--gradient-healing)',
				'gradient-mythri': 'var(--gradient-mythri)',
				'gradient-gentle': 'var(--gradient-gentle)',
				'gradient-joy': 'var(--gradient-joy)',
				'gradient-sadness': 'var(--gradient-sadness)',
				'gradient-anxiety': 'var(--gradient-anxiety)',
				'gradient-calm': 'var(--gradient-calm)',
				'gradient-love': 'var(--gradient-love)'
			},
			boxShadow: {
				'magical': 'var(--shadow-magical)',
				'gentle': 'var(--shadow-gentle)',
				'glow': 'var(--shadow-glow)',
				'embossed': 'var(--shadow-embossed)',
				'embossed-hover': 'var(--shadow-embossed-hover)',
				'embossed-deep': 'var(--shadow-embossed-deep)'
			},
			transitionTimingFunction: {
				'magical': 'cubic-bezier(0.23, 1, 0.32, 1)',
				'gentle': 'cubic-bezier(0.4, 0, 0.2, 1)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
					'50%': { transform: 'scale(1.05)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: 'var(--shadow-gentle)' },
					'50%': { boxShadow: 'var(--shadow-glow)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'magical-shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'star-twinkle': {
					'0%': { opacity: '0.5' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0.5' }
				},
				'star-shimmer': {
					'0%': { opacity: '0.8', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.02)' },
					'100%': { opacity: '0.8', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'breathe': 'breathe 4s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'magical-shimmer': 'magical-shimmer 3s linear infinite',
				'star-twinkle': 'star-twinkle 8s ease-in-out infinite alternate',
				'star-shimmer': 'star-shimmer 1.5s ease-in-out infinite alternate'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
