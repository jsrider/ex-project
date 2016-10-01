import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less'

function getMenuKeyFromUrl(pathname) {
  let key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
    /* eslint no-empty:0 */
  } catch (e) {}
  return key;
}

function SideMenu({ location }) {
  // getInitialState() {
  //   return {
  //     current: '1',
  //   };
  // }
  //
  // handleClick(e) {
  //   console.log('click ', e);
  //
  //   this.setState({
  //     current: e.key,
  //
  //   });
  // },
  return (
    <Menu onClick={this.handleClick}
          style={{ width: 240 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
    >

      <SubMenu key="sub1" title={<span><Icon type="folder" /><span>胜利油田天然气计量</span></span>}>


        <SubMenu key="sub2" title={<span><Icon type="folder" /><span>中心站</span></span>}>
          <Menu.Item key="1"><Link to="/about">流程图</Link></Menu.Item>

          <SubMenu key="sub3" title={<span><Icon type="folder" /><span>报表</span></span>}>
            <Menu.Item key="2"><Link to="/shishi-table">实时报表</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/ri-table">日报表</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/yue-table">月报表</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/lishi-table">历史报表</Link></Menu.Item>
          </SubMenu>

          <SubMenu key="sub4" title={<span><Icon type="folder" /><span>曲线</span></span>}>
            <Menu.Item key="6"><Link to="/shishi-chart">实时曲线</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/ri-chart">日曲线</Link></Menu.Item>
            <Menu.Item key="8"><Link to="/yue-chart">月曲线</Link></Menu.Item>
            <Menu.Item key="9"><Link to="/lishi-chart">历史曲线</Link></Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu key="sub5" title={<span><Icon type="folder" /><span>坨一站</span></span>}>
          <Menu.Item key="10"><Link to="/about">流程图</Link></Menu.Item>

          <SubMenu key="sub6" title={<span><Icon type="folder" /><span>报表</span></span>}>
            <Menu.Item key="11"><Link to="/shishi-table">实时报表</Link></Menu.Item>
            <Menu.Item key="12"><Link to="/ri-table">日报表</Link></Menu.Item>
            <Menu.Item key="13"><Link to="/yue-table">月报表</Link></Menu.Item>
            <Menu.Item key="14"><Link to="/lishi-table">历史报表</Link></Menu.Item>
          </SubMenu>

          <SubMenu key="sub7" title={<span><Icon type="folder" /><span>曲线</span></span>}>
            <Menu.Item key="15"><Link to="/shishi-chart">实时曲线</Link></Menu.Item>
            <Menu.Item key="16"><Link to="/ri-chart">日曲线</Link></Menu.Item>
            <Menu.Item key="17"><Link to="/yue-chart">月曲线</Link></Menu.Item>
            <Menu.Item key="18"><Link to="/lishi-chart">历史曲线</Link></Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu key="sub8" title={<span><Icon type="folder" /><span>坨二站</span></span>}>
          <Menu.Item key="19"><Link to="/about">流程图</Link></Menu.Item>

          <SubMenu key="sub9" title={<span><Icon type="folder" /><span>报表</span></span>}>
            <Menu.Item key="20"><Link to="/shishi-table">实时报表</Link></Menu.Item>
            <Menu.Item key="21"><Link to="/ri-table">日报表</Link></Menu.Item>
            <Menu.Item key="22"><Link to="/yue-table">月报表</Link></Menu.Item>
            <Menu.Item key="23"><Link to="/lishi-table">历史报表</Link></Menu.Item>
          </SubMenu>

          <SubMenu key="sub10" title={<span><Icon type="folder" /><span>曲线</span></span>}>
            <Menu.Item key="24"><Link to="/shishi-chart">实时曲线</Link></Menu.Item>
            <Menu.Item key="25"><Link to="/ri-chart">日曲线</Link></Menu.Item>
            <Menu.Item key="26"><Link to="/yue-chart">月曲线</Link></Menu.Item>
            <Menu.Item key="27"><Link to="/lishi-chart">历史曲线</Link></Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu key="sub11" title={<span><Icon type="folder" /><span>坨三站</span></span>}>
          <Menu.Item key="1"><Link to="/about">流程图</Link></Menu.Item>

          <SubMenu key="sub12" title={<span><Icon type="folder" /><span>报表</span></span>}>
            <Menu.Item key="28"><Link to="/shishi-table">实时报表</Link></Menu.Item>
            <Menu.Item key="29"><Link to="/ri-table">日报表</Link></Menu.Item>
            <Menu.Item key="30"><Link to="/yue-table">月报表</Link></Menu.Item>
            <Menu.Item key="31"><Link to="/lishi-table">历史报表</Link></Menu.Item>
          </SubMenu>

          <SubMenu key="sub13" title={<span><Icon type="folder" /><span>曲线</span></span>}>
            <Menu.Item key="32"><Link to="/shishi-chart">实时曲线</Link></Menu.Item>
            <Menu.Item key="33"><Link to="/ri-chart">日曲线</Link></Menu.Item>
            <Menu.Item key="34"><Link to="/yue-chart">月曲线</Link></Menu.Item>
            <Menu.Item key="35"><Link to="/lishi-chart">历史曲线</Link></Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu key="sub14" title={<span><Icon type="folder" /><span>坨四站</span></span>}>
          <Menu.Item key="36"><Link to="/about">流程图</Link></Menu.Item>

          <SubMenu key="sub15" title={<span><Icon type="folder" /><span>报表</span></span>}>
            <Menu.Item key="37"><Link to="/shishi-table">实时报表</Link></Menu.Item>
            <Menu.Item key="38"><Link to="/ri-table">日报表</Link></Menu.Item>
            <Menu.Item key="39"><Link to="/yue-table">月报表</Link></Menu.Item>
            <Menu.Item key="40"><Link to="/lishi-table">历史报表</Link></Menu.Item>
          </SubMenu>

          <SubMenu key="sub16" title={<span><Icon type="folder" /><span>曲线</span></span>}>
            <Menu.Item key="41"><Link to="/shishi-chart">实时曲线</Link></Menu.Item>
            <Menu.Item key="42"><Link to="/ri-chart">日曲线</Link></Menu.Item>
            <Menu.Item key="43"><Link to="/yue-chart">月曲线</Link></Menu.Item>
            <Menu.Item key="44"><Link to="/lishi-chart">历史曲线</Link></Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu key="sub17" title={<span><Icon type="folder" /><span>坨五站</span></span>}>
          <Menu.Item key="45"><Link to="/about">流程图</Link></Menu.Item>

          <SubMenu key="sub18" title={<span><Icon type="folder" /><span>报表</span></span>}>
            <Menu.Item key="46"><Link to="/shishi-table">实时报表</Link></Menu.Item>
            <Menu.Item key="47"><Link to="/ri-table">日报表</Link></Menu.Item>
            <Menu.Item key="48"><Link to="/yue-table">月报表</Link></Menu.Item>
            <Menu.Item key="49"><Link to="/lishi-table">历史报表</Link></Menu.Item>
          </SubMenu>

          <SubMenu key="sub19" title={<span><Icon type="folder" /><span>曲线</span></span>}>
            <Menu.Item key="50"><Link to="/shishi-chart">实时曲线</Link></Menu.Item>
            <Menu.Item key="51"><Link to="/ri-chart">日曲线</Link></Menu.Item>
            <Menu.Item key="52"><Link to="/yue-chart">月曲线</Link></Menu.Item>
            <Menu.Item key="53"><Link to="/lishi-chart">历史曲线</Link></Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu key="sub20" title={<span><Icon type="folder" /><span>坨六站</span></span>}>
          <Menu.Item key="54"><Link to="/about">流程图</Link></Menu.Item>

          <SubMenu key="sub21" title={<span><Icon type="folder" /><span>报表</span></span>}>
            <Menu.Item key="55"><Link to="/shishi-table">实时报表</Link></Menu.Item>
            <Menu.Item key="56"><Link to="/ri-table">日报表</Link></Menu.Item>
            <Menu.Item key="57"><Link to="/yue-table">月报表</Link></Menu.Item>
            <Menu.Item key="58"><Link to="/lishi-table">历史报表</Link></Menu.Item>
          </SubMenu>

          <SubMenu key="sub22" title={<span><Icon type="folder" /><span>曲线</span></span>}>
            <Menu.Item key="59"><Link to="/shishi-chart">实时曲线</Link></Menu.Item>
            <Menu.Item key="60"><Link to="/ri-chart">日曲线</Link></Menu.Item>
            <Menu.Item key="61"><Link to="/yue-chart">月曲线</Link></Menu.Item>
            <Menu.Item key="62"><Link to="/lishi-chart">历史曲线</Link></Menu.Item>
          </SubMenu>
        </SubMenu>

        <SubMenu key="sub23" title={<span><Icon type="folder" /><span>宁海站</span></span>}>
          <Menu.Item key="63"><Link to="/about">流程图</Link></Menu.Item>

          <SubMenu key="sub24" title={<span><Icon type="folder" /><span>报表</span></span>}>
            <Menu.Item key="64"><Link to="/shishi-table">实时报表</Link></Menu.Item>
            <Menu.Item key="65"><Link to="/ri-table">日报表</Link></Menu.Item>
            <Menu.Item key="66"><Link to="/yue-table">月报表</Link></Menu.Item>
            <Menu.Item key="67"><Link to="/lishi-table">历史报表</Link></Menu.Item>
          </SubMenu>

          <SubMenu key="sub25" title={<span><Icon type="folder" /><span>曲线</span></span>}>
            <Menu.Item key="68"><Link to="/shishi-chart">实时曲线</Link></Menu.Item>
            <Menu.Item key="69"><Link to="/ri-chart">日曲线</Link></Menu.Item>
            <Menu.Item key="70"><Link to="/yue-chart">月曲线</Link></Menu.Item>
            <Menu.Item key="71"><Link to="/lishi-chart">历史曲线</Link></Menu.Item>
          </SubMenu>
        </SubMenu>
        <Menu.Item key="72"><span><Icon type="exclamation-circle" /><span><Link to="/alerm">报警处理</Link></span></span></Menu.Item>
        <Menu.Item key="73"><span><Icon type="setting" /><span><Link to="/setting">设置</Link></span></span></Menu.Item>
      </SubMenu>
    </Menu>
  )

  return (
    <Menu
      selectedKeys={[getMenuKeyFromUrl(location.pathname)]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="users">
        <Link to="/users"><Icon type="bars" />Users</Link>
      </Menu.Item>
      <Menu.Item key="home">
        <Link to="/"><Icon type="home" />Home</Link>
      </Menu.Item>
      <Menu.Item key="404">
        <Link to="/page-you-dont-know"><Icon type="frown-circle" />404</Link>
      </Menu.Item>
      <Menu.Item key="antd">
        <a href="https://github.com/dvajs/dva" target="_blank">dva</a>
      </Menu.Item>
    </Menu>
  );
}

SideMenu.propTypes = {
  location: PropTypes.object,
};

export default SideMenu;
