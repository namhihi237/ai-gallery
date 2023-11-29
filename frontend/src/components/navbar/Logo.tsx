import Link from 'next/link';
import { ROUTE } from '../../configs/route';

export default function Logo() {
  return (
    <Link href={ROUTE.HOME}>
      <strong className="text-cyan-700 text-2xl">AI GALLERY</strong>
    </Link>
  );
}
