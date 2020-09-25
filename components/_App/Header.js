import { Menu, Image } from 'antd';
import Link from "next/link";
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { handleLogout } from '../../utils/auth';
import { ShoppingCartOutlined, LoginOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({user}) {
	const router = useRouter();
	const isRoot = user && user.role === 'root';
	const isAdmin = user && user.role === 'admin';
	const isRootOrAdmin = isRoot || isAdmin;
	
	function isActive(route) {
		return route === router.pathname;
	}
	// if user is true, will show account and log-out link
	// if user is false, will show login and sign-up link

	const StoreIcon = () => (
		<Image 
			width='30px'
			height='30px'
			src='/static/logo.svg'
			style={{marginRight: '1em'}}
		/>
	)

	return (
		<Menu mode="horizontal" style={{padding: '1rem'}}>
				<Menu.Item><StoreIcon /></Menu.Item>
				<Menu.Item active={isActive('/cart')} icon={<ShoppingCartOutlined />}>
					<Link href='/cart'><a>Cart</a></Link>
				</Menu.Item>

				{isRootOrAdmin && 
				(<Menu.Item active={isActive('/create')}>
					<Link href='/create'>
						<a>
						<PlusCircleOutlined />
						Create
						</a>
					</Link>
				</Menu.Item>)}

				<Menu.Item active={isActive('/')} >
					<Link href='/' ><a>Modern Furniture</a></Link>
				</Menu.Item>
				
				{user ? (<>
				<Menu.Item active={isActive('/account')}>
					<Link href='/account'>
						<>
						<UserOutlined />
						Account
						</>
					</Link>
				</Menu.Item>

				<Menu.Item onClick={handleLogout}>
					{/* <Icon name='sign out'size='large'/> */}
					Logout
				</Menu.Item>
				</>)
				:
				(<>
				<Menu.Item active={isActive('/login')} icon={<LoginOutlined />}>
					<Link href='/login'><a>Sign In</a></Link>
				</Menu.Item>

				<Menu.Item active={isActive('/signup')}>
					<Link href='/signup'><a>Sign Up</a></Link>
				</Menu.Item>
				</>)}
		</Menu>
	);
}

export default Header;
