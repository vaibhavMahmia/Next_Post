import logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export const Header = async () => <header id="main-header">
  <Link href="/">
    <Image width={100} height={100} priority src={logo} alt="Mobile phone with posts feed on it" /> {/* priority means no lazy loading because its on header and always be loaded priority will set high*/}
  </Link>
  <nav>
    <ul>
      <li>
        <Link href="/feed">Feed</Link>
      </li>
      <li>
        <Link className='cta-link' href="/new-post">New Post</Link>
      </li>
    </ul>
  </nav>
</header>;