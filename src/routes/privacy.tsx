import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
	component: PrivacyPage,
});

function PrivacyPage() {
	return (
		<div className="py-16">
			<div className="page-wrap max-w-3xl">
				<h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
				<div className="prose prose-sm max-w-none text-(--color-text-muted) space-y-4">
					<p>
						This privacy policy sets out how ChewedFeed uses and protects any
						information that you give when you use this website.
					</p>
					<p>
						ChewedFeed is committed to ensuring that your privacy is protected.
						Should we ask you to provide certain information by which you can be
						identified when using this website, then you can be assured that it
						will only be used in accordance with this privacy statement.
					</p>
					<p>
						ChewedFeed may change this policy from time to time by updating this
						page. You should check this page from time to time to ensure that
						you are happy with any changes.
					</p>
				</div>
			</div>
		</div>
	);
}
