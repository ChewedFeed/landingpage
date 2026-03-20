const CMS_API_URL =
	typeof window !== "undefined"
		? (import.meta.env.VITE_CMS_API_URL ?? "https://cms.chewedfeed.com")
		: (process.env.CMS_API_URL ?? "https://cms.chewedfeed.com");

export type ProjectLink = {
	type: string;
	url: string;
	label?: string;
};

export type Milestone = {
	id?: number;
	serviceId?: number;
	title: string;
	description?: string;
	category: string;
	status: string;
	targetDate?: string;
	completedDate?: string;
	sortOrder: number;
};

export type LaunchDate = {
	year: number;
	month: number;
	day: number;
};

export type Project = {
	name: string;
	searchName: string;
	description: string;
	status: string;
	url: string;
	launchDate: LaunchDate;
	progress: number;
	progress2: number;
	icon: string;
	fullDesc: string;
	uptime: string;
	launched: boolean;
	links?: ProjectLink[];
	milestones?: Milestone[];
};

export async function fetchProjects(): Promise<Project[]> {
	const res = await fetch(`${CMS_API_URL}/services`);
	if (!res.ok) {
		throw new Error(`Failed to fetch projects: ${res.statusText}`);
	}
	return res.json();
}

export async function fetchProject(name: string): Promise<Project> {
	const res = await fetch(`${CMS_API_URL}/service/${name}`);
	if (!res.ok) {
		throw new Error(`Failed to fetch project: ${res.statusText}`);
	}
	return res.json();
}
