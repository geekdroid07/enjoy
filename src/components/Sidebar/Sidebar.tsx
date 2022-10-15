import React from 'react';
import BonumLogo from 'assets/images/bonum_logo.png';
import { Image, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { RiUserVoiceFill, RiUser3Fill, RiBuilding2Fill } from 'react-icons/ri';
import { Menu } from 'antd';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="Sidebar">
      <Image
        src={BonumLogo}
        className="Sidebar__logo"
        style={{ marginTop: 20, marginLeft: 20 }}
        onClick={() => navigate('/')}
      />

      <Menu
        mode="inline"
        style={{ height: '100%', borderRight: 0, background: 'transparent' }}
        items={[
          {
            key: 0,
            label: <Button
              className="Sidebar__button"
              leftIcon={<RiUserVoiceFill />}
              onClick={() => navigate('/managers')}
            >
              Gestores soc.
            </Button>
          },
          {
            key: 1,
            label: <Button
              className="Sidebar__button"
              leftIcon={<RiUser3Fill />}
              onClick={() => navigate('/influencers')}
            >
              Influencers
            </Button>
          },
          {
            key: 2,
            label: <Button
              className="Sidebar__button"
              leftIcon={<RiUser3Fill />}
              onClick={() => navigate('/members')}
            >
              Miembros
            </Button>
          }
        ]}
      ></Menu>


    </div>
  );
}

export default Sidebar;
