'use client';
import SidebarItem, { SidebarItemProp } from './SidebarItem';

type SidebarProps = {
  selectedIndex: number;
  sidebarsElement: SidebarItemProp[];
};

export default function Sidebar(props: SidebarProps): JSX.Element {
  function renderMenuItem(): JSX.Element[] {
    return props.sidebarsElement.map((element, index) => (
      <SidebarItem
        key={index}
        title={element.title}
        iconName={element.iconName}
        href={element.href}
        isSelected={index === props.selectedIndex}
      />
    ));
  }

  return (
    <div className="pt-6 pr-8 border-solid border-r-[1px] border-zinc-600 h-full">
      {renderMenuItem()}
    </div>
  );
}
