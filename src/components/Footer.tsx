import { Link } from "@tanstack/react-router";

export default function Footer() {
	return (
		<footer className="border-t border-(--color-border) py-8">
			<div className="page-wrap flex flex-col items-center gap-4 text-sm text-(--color-text-muted)">
				<p>Copyright &copy; {new Date().getFullYear()} ChewedFeed</p>
				<div className="flex gap-6">
					<Link
						to="/privacy"
						className="hover:text-(--color-text) transition-colors"
					>
						Privacy Policy
					</Link>
					<Link
						to="/cookies"
						className="hover:text-(--color-text) transition-colors"
					>
						Cookie Policy
					</Link>
				</div>
			</div>
		</footer>
	);
}
