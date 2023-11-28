import React from 'react';
import Icon from '../Icon';

export type SidebarItemProp = {
	iconName: string;
	title: string;
	href: string;
};

export default function SidebarItem(props: SidebarItemProp) {
	const { iconName, title, href } = props;

	return (
		<a className="flex justify-between w-20" href={href}>
			<Icon iconName={iconName} size="small" />
			<p>{title}</p>
		</a>
	);
}
