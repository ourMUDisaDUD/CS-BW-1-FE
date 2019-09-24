import React, { Fragment, useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Onboard = props => {
	const [ isLogin, setisLogin ] = useState(true);
	const handleToggle = () => {
		setisLogin(!isLogin);
	};
	return (
		<Fragment>
			{isLogin ? (
				<SignIn login={isLogin} handleToggle={handleToggle} />
			) : (
				<SignUp login={isLogin} handleToggle={handleToggle} />
			)}
		</Fragment>
	);
};

export default Onboard;
