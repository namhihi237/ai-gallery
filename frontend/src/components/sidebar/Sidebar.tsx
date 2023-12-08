'use client';
import SidebarItem, { MenuItem } from './SidebarItem';

type SidebarProps = {
  selectedIndex: number;
  sidebarsElement: MenuItem[];
};

export default function Sidebar(props: SidebarProps): JSX.Element {
  const items = props.sidebarsElement.map((element, index) => {
      return {...element, isSelected: index === props.selectedIndex }
  })
  function renderMenuItem(): JSX.Element[] {
    return items.map((element, index) => (
      <SidebarItem
        item={element}
      />
    ));
  }

  return (
    <div className="pt-6 pr-8 border-solid border-r-[1px] border-zinc-600 h-full">
      {renderMenuItem()}
    </div>
  );
}
