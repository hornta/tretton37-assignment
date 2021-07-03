import { HTMLAttributes, ReactNode } from "react";
import "./paper.css";

// would like to extend extends HTMLAttributes<HTMLElement> but
// typescript
interface PaperProps extends HTMLAttributes<HTMLOrSVGElement> {
	children: ReactNode;
	tag?: keyof JSX.IntrinsicElements;
}

export const Paper = ({ children, tag = "div", ...props }: PaperProps) => {
	const Tag = tag as keyof JSX.IntrinsicElements;

	// append className
	let className = "paper";
	if (props.className) {
		className += " " + props.className;
	}
	className = className.trim();

	return (
		<Tag {...props} className={className}>
			{children}
		</Tag>
	);
};
