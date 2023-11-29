import Avatar from '../avatar/Avatar';
import SearchBox from '../search/SearchBox';
import Logo from './Logo';

export default function Navbar() {
	return (
		<div className="h-20 w-screen border-solid border-b-[1px] border-zinc-600 items-center flex">
			<div className="w-full flex items-center justify-between px-10">
				<Logo />
				<SearchBox />
				<Avatar url="https://res.cloudinary.com/poppy-gallary/image/upload/v1700620691/_1fc72ba8-5e74-4835-b002-898874ab3a1f_ajvvif.jpg" />
			</div>
		</div>
	);
}
