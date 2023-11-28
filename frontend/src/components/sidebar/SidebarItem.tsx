import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';

type SidebarItemProp = {
	iconName: string;
	title: string;
	href: string;
};

const iconComponents: { [key: string]: React.ElementType } = {
	HomeIcon: HeroIcons.HomeIcon,
};

export default function SidebarItem(props: SidebarItemProp) {
	const { iconName, title, href } = props;
	const Icon = iconName ? iconComponents[iconName] : iconComponents['HomeIcon'];

	return (
		<a className="flex justify-between w-20" href={href}>
			{Icon && <Icon className="block h-6 w-6" aria-hidden="true" />}
			<p>{title}</p>
		</a>
	);
}
