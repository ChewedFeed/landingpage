import { describe, expect, test } from "vitest";
import { isProjectsIndexPath } from "#/routes/projects";

describe("projects route rendering", () => {
	test("renders index view on exact projects path", () => {
		expect(isProjectsIndexPath("/projects")).toBe(true);
	});

	test("renders outlet for child project detail paths", () => {
		expect(isProjectsIndexPath("/projects/flags-gg")).toBe(false);
		expect(isProjectsIndexPath("/projects/demo-site")).toBe(false);
	});
});
