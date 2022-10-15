import React, { useState } from 'react';
import { Avatar, Divider, IconButton } from '@chakra-ui/react';
import { RiNotification3Fill } from 'react-icons/ri';
import { signOut } from 'firebase/auth';
import { auth } from 'utilities/firebase.utility';
import { NotAllowedIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';

function Header() {


  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const [menuItems] = useState([
    {
      icon: NotAllowedIcon,
      name: 'Cerrar Sesión',
      onClick: () => logout()
    }
  ]);

  return (
    <div className="Header">
      <div className="Header__info w-50">
        <Menu>
          <MenuButton rightIcon={<NotAllowedIcon />}>
            <Avatar />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logout}>Log Out</MenuItem>
          </MenuList>
        </Menu>
        {/* <IconButton
          icon={<RiNotification3Fill className="Header__info_notification" />}
          aria-label="Notifications"
        />
        <Divider orientation="vertical" className="Header__info_divider" /> */}
      </div>
    </div>
  );
}

export default Header;
