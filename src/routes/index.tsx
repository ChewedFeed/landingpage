import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchProjects } from "#/lib/api";
import type { Project } from "#/lib/api";

function getProgressColor(progress: number): string {
	if (progress >= 91) return "progress-green";
	if (progress >= 76) return "progress-cyan";
	if (progress >= 61) return "progress-purple";
	if (progress >= 46) return "progress-pink";
	if (progress >= 31) return "progress-yellow";
	if (progress >= 16) return "progress-orange";
	return "progress-red";
}

function getNextLaunch(projects: Project[]): Project | null {
	const now = Date.now();
	let next: Project | null = null;
	let nextTime = Number.MAX_SAFE_INTEGER;

	for (const p of projects) {
		if (p.launched) continue;
		const month = p.launchDate.month === 0 ? 1 : p.launchDate.month;
		const launchTime = new Date(
			p.launchDate.year,
			month - 1,
			p.launchDate.day,
			23,
			59,
		).getTime();
		if (launchTime > now && launchTime < nextTime) {
			nextTime = launchTime;
			next = p;
		}
	}
	return next;
}

function ProjectCard({ project }: { project: Project }) {
	const mainLink = project.links?.find((l) => l.type === "main");
	const href = mainLink?.url ?? project.url;

	return (
		<a
			href={href}
			className="group block rounded-xl border border-(--color-border) bg-(--color-surface-alt) p-6 transition-all hover:shadow-lg hover:border-brand-400"
		>
			<div className="mb-3 flex items-center justify-between">
				<i className={`fa-${project.icon} text-2xl text-brand-500`} />
				{project.launched ? (
					<span className="text-xs font-medium text-brand-600 bg-brand-100 px-2 py-0.5 rounded-full">
						Live
					</span>
				) : (
					<span className="text-xs font-medium text-(--color-text-muted)">
						{project.progress}%
					</span>
				)}
			</div>
			<h3 className="font-semibold text-lg mb-1">{project.name}</h3>
			<p className="text-sm text-(--color-text-muted) mb-3">
				{project.description}
			</p>
			{!project.launched && (
				<div className="w-full bg-(--color-border) rounded-full h-1.5">
					<div
						className={`h-1.5 rounded-full ${getProgressColor(project.progress)}`}
						style={{ width: `${project.progress}%` }}
					/>
				</div>
			)}
		</a>
	);
}

export const Route = createFileRoute("/")({
	loader: async () => {
		const projects = await fetchProjects();
		return { projects };
	},
	component: HomePage,
});

function HomePage() {
	const { projects } = Route.useLoaderData();
	const nextLaunch = getNextLaunch(projects);

	return (
		<div>
			<section className="py-24 text-center">
				<div className="page-wrap">
					<h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
						We build tools for devs
					</h1>
					<p className="text-xl text-(--color-text-muted) max-w-2xl mx-auto mb-8">
						Bootstrapped by people that work in the industry, and just needed
						tools to be less about learning how to use the tool and more about
						getting the thing done.
					</p>
					{nextLaunch && (
						<div className="inline-block rounded-lg border border-(--color-border) bg-(--color-surface-alt) px-6 py-4">
							<p className="text-sm text-(--color-text-muted) mb-1">
								Next launch
							</p>
							<p className="font-semibold text-lg">{nextLaunch.name}</p>
						</div>
					)}
					<div className="mt-8">
						<Link
							to="/projects"
							className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-white font-medium hover:bg-brand-700 transition-colors"
						>
							View Projects
						</Link>
					</div>
				</div>
			</section>

			<section className="py-16 border-t border-(--color-border)">
				<div className="page-wrap">
					<h2 className="text-2xl font-bold mb-8 text-center">Our Projects</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{projects.map((project) => (
							<ProjectCard key={project.name} project={project} />
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
