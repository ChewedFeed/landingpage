import { createFileRoute } from "@tanstack/react-router";
import { fetchProject } from "#/lib/api";

const linkLabels: Record<string, string> = {
	main: "Website",
	dashboard: "Dashboard",
	landing: "Landing Page",
	docs: "Documentation",
};

export const Route = createFileRoute("/projects/$projectName")({
	loader: async ({ params }) => {
		const project = await fetchProject(params.projectName);
		return { project };
	},
	component: ProjectDetailPage,
});

function ProjectDetailPage() {
	const { project } = Route.useLoaderData();
	const milestones = [...(project.milestones ?? [])].sort(
		(a, b) => a.sortOrder - b.sortOrder,
	);

	function statusLabel(status: string) {
		switch (status) {
			case "in_progress":
				return "In Progress";
			case "completed":
				return "Completed";
			case "cancelled":
				return "Cancelled";
			default:
				return "Planned";
		}
	}

	return (
		<div className="py-16">
			<div className="page-wrap max-w-3xl">
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-2">
						<i className={`fa-${project.icon} text-3xl text-brand-500`} />
						<h1 className="text-3xl font-bold">{project.name}</h1>
						{project.launched && (
							<span className="text-xs font-medium text-brand-600 bg-brand-100 px-2 py-0.5 rounded-full">
								Live
							</span>
						)}
					</div>
					<p className="text-(--color-text-muted) text-lg">
						{project.description}
					</p>
				</div>

				{project.links && project.links.length > 0 && (
					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">Links</h2>
						<div className="flex flex-wrap gap-3">
							{project.links.map((link) => (
								<a
									key={link.url}
									href={
										link.url.startsWith("http")
											? link.url
											: `https://${link.url}`
									}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-lg border border-(--color-border) px-4 py-2 text-sm hover:border-brand-400 transition-colors"
								>
									<span className="font-medium">
										{linkLabels[link.type] ?? link.type}
									</span>
									<span className="text-(--color-text-muted)">
										{link.label || link.url}
									</span>
								</a>
							))}
						</div>
					</section>
				)}

				{!project.launched && (
					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">Progress</h2>
						<div className="flex items-center gap-4">
							<div className="flex-1 bg-(--color-border) rounded-full h-3">
								<div
									className="h-3 rounded-full bg-brand-500 transition-all"
									style={{ width: `${project.progress}%` }}
								/>
							</div>
							<span className="text-sm font-medium">{project.progress}%</span>
						</div>
					</section>
				)}

				{milestones.length > 0 && (
					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">Roadmap</h2>
						<div className="space-y-3">
							{milestones.map((item) => (
								<div
									key={item.id ?? item.title}
									className="rounded-lg border border-(--color-border) p-4"
								>
									<div className="mb-3 flex items-center gap-3">
										<div
											className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
												item.status === "completed"
													? "border-brand-500 bg-brand-500"
													: "border-(--color-border)"
											}`}
										>
											{item.status === "completed" && (
												<svg
													className="w-3 h-3 text-white"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeWidth={3}
													aria-hidden="true"
												>
													<title>Completed milestone</title>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M5 13l4 4L19 7"
													/>
												</svg>
											)}
										</div>
										<p
											className={`font-medium ${item.status === "completed" ? "line-through text-(--color-text-muted)" : ""}`}
										>
											{item.title}
										</p>
										<span className="rounded-full bg-(--color-surface-alt) px-2 py-0.5 text-xs text-(--color-text-muted)">
											{item.category}
										</span>
										<span className="rounded-full border border-(--color-border) px-2 py-0.5 text-xs">
											{statusLabel(item.status)}
										</span>
									</div>
									<div className="space-y-1 pl-8">
										{item.description && (
											<p className="text-sm text-(--color-text-muted)">
												{item.description}
											</p>
										)}
										{(item.targetDate || item.completedDate) && (
											<p className="text-xs text-(--color-text-muted)">
												{item.targetDate && `Target: ${item.targetDate}`}
												{item.targetDate && item.completedDate && " | "}
												{item.completedDate &&
													`Completed: ${item.completedDate}`}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					</section>
				)}

				{project.fullDesc && (
					<section>
						<h2 className="text-xl font-semibold mb-4">About</h2>
						<div className="prose prose-sm max-w-none text-(--color-text-muted)">
							<p>{project.fullDesc}</p>
						</div>
					</section>
				)}
			</div>
		</div>
	);
}
