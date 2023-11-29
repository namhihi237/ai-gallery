import React, { useState } from 'react';
import { Icon } from '../Icon';
import classNames from 'classnames';
import Link from 'next/link';
export type SidebarItemProp = {
	iconName: string;
	title: string;
	href: string;
	isSelected?: boolean;
};

export default function SidebarItem(props: SidebarItemProp) {
	const { iconName, title, href, isSelected = false } = props;
	const [isHovered, setIsHovered] = useState(false);
	return (
		<Link
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={classNames(
				'flex w-52 py-2 px-5',
				isSelected ? 'bg-zinc-100 rounded-r-3xl' : '',
				isSelected || isHovered ? 'text-red-400' : '',
			)}
			href={href}
		>
			<Icon iconName={iconName} propsIcon={{ size: 24 }} />
			<p className="pl-4">{title}</p>
		</Link>
	);
}
