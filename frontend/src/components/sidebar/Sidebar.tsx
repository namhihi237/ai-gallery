import { ROUTE } from "../../configs/route";
import SidebarItem, { SidebarItemProp } from "./SidebarItem";

const sidebarsElement: SidebarItemProp[] = [
	{
		title: 'Home',
		iconName: 'HomeIcon',
		href: ROUTE.DASH_BOARD,
	},
];

export default function Sidebar(): JSX.Element {
  function renderMenuItem(): JSX.Element[] {
		return sidebarsElement.map((element, index) => (
			<SidebarItem key={index} title={element.title} iconName={element.iconName} href={element.href} />
		));
	}

  return (
		<div>
			This is sidebar
			{renderMenuItem()}
		</div>
	);
}
