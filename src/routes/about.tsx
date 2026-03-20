import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: AboutPage,
});

function AboutPage() {
	return (
		<div className="py-16">
			<div className="page-wrap max-w-3xl">
				<h1 className="text-3xl font-bold mb-6">About ChewedFeed</h1>
				<p className="text-lg text-(--color-text-muted) mb-8">
					Bootstrapped by people that work in the industry, and just needed
					tools to be less about learning how to use the tool and more about
					getting the thing done.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					<div className="rounded-xl border border-(--color-border) bg-(--color-surface-alt) p-6">
						<h2 className="text-xl font-semibold mb-3">Our Philosophy</h2>
						<p className="text-(--color-text-muted)">
							Make the tool work for you.
						</p>
					</div>
					<div className="rounded-xl border border-(--color-border) bg-(--color-surface-alt) p-6">
						<h2 className="text-xl font-semibold mb-3">Our Mission</h2>
						<p className="text-(--color-text-muted)">
							To make doing that 1 thing a 5-minute job not a 5-hour job.
						</p>
					</div>
				</div>

				<div className="space-y-4">
					<div className="rounded-xl border border-(--color-border) p-6">
						<h3 className="font-semibold mb-2">Secure</h3>
						<p className="text-sm text-(--color-text-muted)">
							Security is everything, if it's not secure don't use it.
						</p>
					</div>
					<div className="rounded-xl border border-(--color-border) p-6">
						<h3 className="font-semibold mb-2">Keep the cost acceptable</h3>
						<p className="text-sm text-(--color-text-muted)">
							Some things don't need to cost a fortune, especially if most of
							the work is done on your own servers.
						</p>
					</div>
					<div className="rounded-xl border border-(--color-border) p-6">
						<h3 className="font-semibold mb-2">Upgrades shouldn't be scary</h3>
						<p className="text-sm text-(--color-text-muted)">
							You should be able to choose when and how often to upgrade without
							worry that it's going to take down everything.
						</p>
					</div>
					<div className="rounded-xl border border-(--color-border) p-6">
						<h3 className="font-semibold mb-2">Simple</h3>
						<p className="text-sm text-(--color-text-muted)">
							You shouldn't need someone to train you on how to use the system.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
