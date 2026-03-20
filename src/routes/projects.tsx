import {
	createFileRoute,
	Link,
	Outlet,
	useRouterState,
} from "@tanstack/react-router";
import type { Project } from "#/lib/api";
import { fetchProjects } from "#/lib/api";

export function isProjectsIndexPath(pathname: string): boolean {
	return pathname === "/projects";
}

function getProgressColor(progress: number): string {
	if (progress >= 91) return "progress-green";
	if (progress >= 76) return "progress-cyan";
	if (progress >= 61) return "progress-purple";
	if (progress >= 46) return "progress-pink";
	if (progress >= 31) return "progress-yellow";
	if (progress >= 16) return "progress-orange";
	return "progress-red";
}

function ProjectCard({ project }: { project: Project }) {
	const searchName = project.searchName;

	return (
		<Link
			to="/projects/$projectName"
			params={{ projectName: searchName }}
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
			{project.links && project.links.length > 0 && (
				<div className="mt-3 flex flex-wrap gap-2">
					{project.links.map((link) => (
						<span
							key={link.url}
							className="text-xs px-2 py-0.5 rounded bg-(--color-border) text-(--color-text-muted)"
						>
							{link.type}
						</span>
					))}
				</div>
			)}
		</Link>
	);
}

export const Route = createFileRoute("/projects")({
	loader: async () => {
		const projects = await fetchProjects();
		return { projects };
	},
	component: ProjectsPage,
});

function ProjectsPage() {
	const { projects } = Route.useLoaderData();
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	if (!isProjectsIndexPath(pathname)) {
		return <Outlet />;
	}

	const launched = projects.filter((p) => p.launched);
	const inProgress = projects.filter((p) => !p.launched);

	return (
		<div className="py-16">
			<div className="page-wrap">
				<h1 className="text-3xl font-bold mb-2">Projects</h1>
				<p className="text-(--color-text-muted) mb-12">
					What we're building and what's already live.
				</p>

				{launched.length > 0 && (
					<section className="mb-12">
						<h2 className="text-xl font-semibold mb-6">Launched</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{launched.map((project) => (
								<ProjectCard key={project.name} project={project} />
							))}
						</div>
					</section>
				)}

				{inProgress.length > 0 && (
					<section>
						<h2 className="text-xl font-semibold mb-6">In Progress</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{inProgress.map((project) => (
								<ProjectCard key={project.name} project={project} />
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
}
