import { FlagsProvider } from "@flags-gg/react-library";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { error as logError } from "bugfixes";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import appCss from "../styles.css?url";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

function RouteErrorComponent({ error: err }: { error: unknown }) {
	useEffect(() => {
		logError("unhandled route error", err);
	}, [err]);
	return <div>Something went wrong</div>;
}

export const Route = createRootRoute({
	errorComponent: RouteErrorComponent,
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "ChewedFeed | Tools for devs",
			},
			{
				name: "description",
				content:
					"We build tools for devs to make their lives a bit less like hell.",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="font-sans antialiased">
				<FlagsProvider
					options={{
						projectId: import.meta.env.VITE_FLAGS_PROJECT_ID,
						agentId: import.meta.env.VITE_FLAGS_AGENT_ID,
						environmentId: import.meta.env.VITE_FLAGS_ENVIRONMENT_ID,
					}}
				>
					<Header />
					<main className="min-h-screen">{children}</main>
					<Footer />
				</FlagsProvider>
				<Scripts />
			</body>
		</html>
	);
}
