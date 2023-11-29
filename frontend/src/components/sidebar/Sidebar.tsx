'use client';
import { useState } from 'react';
import { ROUTE } from '../../configs/route';
import SidebarItem, { SidebarItemProp } from './SidebarItem';
const sidebarsElement: SidebarItemProp[] = [
	{
		title: 'Home',
		iconName: 'FaHome',
		href: ROUTE.HOME,
	},
	{
		title: 'Gallery',
		iconName: 'GrGallery',
		href: ROUTE.GALLERY,
	},
	{
		title: 'Upload',
		iconName: 'FaCloudUploadAlt',
		href: ROUTE.UPLOAD,
	},
];

export default function Sidebar(): JSX.Element {
	const [selectedIndex, setSelectedIndex] = useState(0);

	function renderMenuItem(): JSX.Element[] {
		return sidebarsElement.map((element, index) => (
			<SidebarItem
				key={index}
				title={element.title}
				iconName={element.iconName}
				href={element.href}
				isSelected={index === selectedIndex}
				setActive={() => {
					setSelectedIndex(index);
				}}
			/>
		));
	}

	return (
		<div className="pt-6 pr-8 border-solid border-r-[1px] border-zinc-600 h-full overflow-hidden">
			{renderMenuItem()}
		</div>
	);
}
