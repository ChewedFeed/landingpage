import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-surface)/80 backdrop-blur-md">
			<div className="page-wrap flex h-16 items-center justify-between">
				<Link to="/" className="flex items-center gap-2 font-bold text-xl">
					ChewedFeed
				</Link>
				<nav className="flex items-center gap-6 text-sm">
					<Link
						to="/"
						className="text-(--color-text-muted) hover:text-(--color-text) transition-colors"
					>
						Home
					</Link>
					<Link
						to="/projects"
						className="text-(--color-text-muted) hover:text-(--color-text) transition-colors"
					>
						Projects
					</Link>
					<Link
						to="/about"
						className="text-(--color-text-muted) hover:text-(--color-text) transition-colors"
					>
						About
					</Link>
					<a
						href="https://uptime.chewedfeed.com/status/chewedfeed/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-(--color-text-muted) hover:text-(--color-text) transition-colors"
					>
						Uptime
					</a>
				</nav>
			</div>
		</header>
	);
}
