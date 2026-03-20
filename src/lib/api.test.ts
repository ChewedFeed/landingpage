import { describe, expect, test } from "vitest";
import type { Project, ProjectLink, RoadmapItem } from "./api";

describe("API types", () => {
	test("Project type has expected fields", () => {
		const project: Project = {
			name: "Flags.gg",
			description: "Feature flag management",
			url: "https://flags.gg",
			launchDate: { year: 2025, month: 6, day: 15 },
			progress: 85,
			progress2: 87.5,
			icon: "solid fa-flag",
			fullDesc: "Full description here",
			uptime: "https://uptime.chewedfeed.com/status/flags",
			launched: true,
			links: [
				{ type: "main", url: "https://flags.gg", label: "Flags.gg" },
				{
					type: "dashboard",
					url: "https://dashboard.flags.gg",
					label: "Dashboard",
				},
				{ type: "docs", url: "https://docs.flags.gg", label: "Docs" },
			],
			roadmap: [
				{
					name: "Alpha",
					completed: true,
					sortOrder: 0,
					targetDate: "2025-01-01",
					releaseDate: "2025-01-15",
				},
				{ name: "Beta", completed: false, sortOrder: 1 },
			],
		};

		expect(project.name).toBe("Flags.gg");
		expect(project.launched).toBe(true);
		expect(project.links).toHaveLength(3);
		expect(project.roadmap).toHaveLength(2);
		expect(project.links?.[1].type).toBe("dashboard");
		expect(project.roadmap?.[0].completed).toBe(true);
	});

	test("ProjectLink type structure", () => {
		const link: ProjectLink = {
			type: "docs",
			url: "https://docs.flags.gg",
			label: "Documentation",
		};

		expect(link.type).toBe("docs");
		expect(link.url).toContain("docs.flags.gg");
	});

	test("RoadmapItem with optional dates", () => {
		const item: RoadmapItem = {
			name: "Public release",
			completed: false,
			sortOrder: 2,
		};

		expect(item.targetDate).toBeUndefined();
		expect(item.releaseDate).toBeUndefined();
		expect(item.completed).toBe(false);
	});

	test("LaunchDate zero month handling", () => {
		const project: Project = {
			name: "Test",
			description: "Test",
			url: "",
			launchDate: { year: 2026, month: 0, day: 1 },
			progress: 0,
			progress2: 0,
			icon: "",
			fullDesc: "",
			uptime: "",
			launched: false,
		};

		const month =
			project.launchDate.month === 0 ? 1 : project.launchDate.month;
		expect(month).toBe(1);
	});
});
