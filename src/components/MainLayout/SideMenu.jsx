import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less'

const SubMenu = Menu.SubMenu;

function SideMenu({ dispatch, menuKey, sideMenu }) {
  console.log('sideMenu', sideMenu, menuKey);

  const { title, menuItems } = sideMenu;

  const current = menuKey;
  const defaultOpenKeys = ['menu'];

  // const handleClick = (e) => {
  //   console.log('click ', e);
  //
  //   dispatch({
  //     type: 'sideMenu/click',
  //     current: e.key
  //   });
  // };

  const getItem = (el) => {
    const { title, link, icon, group, station } = el;
    // console.log(el)

    if (link === current) {
      station && defaultOpenKeys.push(station);
      group && defaultOpenKeys.push(group);
    }

    return <Menu.Item key={link}>
      <Link to={`/${link}`}>
        {
          icon ?
            <Icon type={icon} /> :
            null
        }
        {title}
      </Link>
    </Menu.Item>
  };

  const getMenuItems = () => {
    let stationMenuObj = {
      menu: []
    };
    const items = [];

    for (let el of menuItems) {
      const { group, station } = el;

      if (station) {
        stationMenuObj[station] || (stationMenuObj[station] = {
          menu: [],
          group: {}
        });

        if (group) {
          stationMenuObj[station].group[group] || (stationMenuObj[station].group[group] = []);
          stationMenuObj[station].group[group].push(el);
        } else {
          stationMenuObj[station].menu.push(el);
        }
      } else {
        stationMenuObj.menu.push(el)
      }

    }

    Object.keys(stationMenuObj).forEach((stationKey, sIndex) => {
      const station = stationMenuObj[stationKey];

      if (stationKey === 'menu') {
        return items.push(station.map((el, i) => getItem(el)))
      }

      // items.unshift(
      const stationMenu = [];

      Object.keys(station).forEach((sKey, sIdx) => {
        if (sKey === 'menu') {
          return stationMenu.unshift(station[sKey].map((el, i) => getItem(el)))
        }

        stationMenu.push(
          Object.keys(station[sKey]).map((groupKey, groupIdx) =>
            <SubMenu key={groupKey} title={<span>{groupKey}</span>}>
              {
                station[sKey][groupKey].map((el, i) => getItem(el))
              }
            </SubMenu>
          )
        )
      });

      items.unshift(
        <SubMenu key={stationKey} title={<span><Icon type="folder" />{stationKey}</span>}>
          {stationMenu}
        </SubMenu>
      );

      // )
    });

    return items;
  };

  console.log(defaultOpenKeys, current);

  return (
    <Menu
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={[current]}
          mode="inline"
    >
      <SubMenu key="menu" title={<span><Icon type="folder" /><span>{title}</span></span>}>
        {
          getMenuItems()
        }
      </SubMenu>
    </Menu>
  )
}

SideMenu.propTypes = {
  location: PropTypes.object,
};

export default SideMenu;
