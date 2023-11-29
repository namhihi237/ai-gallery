'use client';
import { Icon } from '../Icon';

export default function SearchBox(): JSX.Element {
  return (
    <div className="bg-black w-2/5 rounded-xl h-10 flex px-6 items-center border-solid border-[1px] border-zinc-600">
      <Icon iconName="GrSearch" propsIcon={{ size: 20 }} />
      <input className="bg-black focus:outline-none ml-2 h-8 w-full" type="text" />
    </div>
  );
}
