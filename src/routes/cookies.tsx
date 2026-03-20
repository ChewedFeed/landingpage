import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
	component: CookiesPage,
});

function CookiesPage() {
	return (
		<div className="py-16">
			<div className="page-wrap max-w-3xl">
				<h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
				<div className="prose prose-sm max-w-none text-(--color-text-muted) space-y-4">
					<p>
						This cookie policy explains how ChewedFeed uses cookies and similar
						technologies when you visit our website.
					</p>
					<p>
						Cookies are small text files that are placed on your device when you
						visit a website. They are widely used to make websites work more
						efficiently and to provide information to the owners of the site.
					</p>
					<p>
						We use cookies to understand how you use our site and to improve your
						experience. This includes personalizing content and remembering your
						preferences.
					</p>
				</div>
			</div>
		</div>
	);
}
