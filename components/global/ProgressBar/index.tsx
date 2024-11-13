import { ReactNode } from "react";

interface ProgressBarProps {
	value?: number;
	children?: ReactNode;
	indeterminate?: boolean;
}

export default function ProgressBar(props: ProgressBarProps) {
	const { value = 0, children, indeterminate } = props;
	const getProgressClass = () => {
		const progressClass = ["progressBar"];
		if (indeterminate) {
			progressClass.push("indeterminate");
		}
		return progressClass.join(" ");
	};
	return (
		<div className='space-y-1'>
			<div className={getProgressClass()}>
				<div style={{ width: `${value * 100}%` }} className='progress'></div>
			</div>
			{children}
		</div>
	);
}
