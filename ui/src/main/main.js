import React, {Component} from 'react';
import {
    Popover, Modal, Badge, Icon, Input
} from 'antd';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {NavLink, Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {Login} from '../login';
import MenuTree from './menuTree';
import {Home} from '../home';



const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

const PropsRoute = ({component, ...rest}) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
};

@inject('rootStore')
@observer
class Main extends Component {

    componentWillMount() {
        const winWidth = document.documentElement.clientWidth;
        const winHeight = document.documentElement.clientHeight;
        this.props.rootStore.treeStore.updateWinSize({width: winWidth, height: winHeight});
        this.winResize = (e) => {
            this.props.rootStore.treeStore.updateWinSize({
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
            });
        };
        window.addEventListener('resize', this.winResize, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.winResize, false);
    }

    componentDidMount() {
        //角色权限变动以后需要刷新的数据
        if (!this.props.rootStore.authorityStore.loginVisible) {
            Promise.all([
                this.props.rootStore.treeStore.loadMenuTree()
            ]);
        }
    }

    render() {
        const {loginVisible} = this.props.rootStore.authorityStore;
        const treeStore = this.props.rootStore.treeStore;
        const {winWidth, winHeight, headerHeight, menuHeight, footerHeight} = treeStore;
        const userOperations = (
            <ul className="popover-list">
                <li onClick={this.props.rootStore.authorityStore.logout}>
                    <Icon type="poweroff"/>&nbsp;&nbsp; 退出
                </li>
            </ul>
        );
        // 未登录
        if (loginVisible) {
            return (
                <div className="extend-layout" style={{height: "100%"}}>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Redirect path="/" to="/login"/>
                    </Switch>
                    <footer>© syuyuusyu@gmail.com</footer>
                </div>
            );
        }
        // 已登录
        //console.log( this.props.rootStore.treeStore.menuTreeData.filter(d=>d));
        return (
            <div id="mainBox">
                <header>
                    <div id="headerBox">
                        <div id="logoBox">
                            <span className="text">Elemental</span>
                        </div>

                        <Popover placement="bottom" trigger="hover" content={userOperations}>
                            <div id="userBox">
                                <Icon type="user"/>
                                <span
                                    className="name">&nbsp;&nbsp;{sessionStorage.getItem('currentUserName')}&nbsp;</span>
                                <Icon type="down" style={{fontSize: '12px'}}/>
                            </div>
                        </Popover>
                    </div>
                    <MenuTree/>
                </header>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                    <Route exact path="/login" render={() => <Redirect to="/home"/>}/>
                    <Route exact path="/home" component={Home}/>
                    {
                        this.props.rootStore.treeStore.currentRoleMenu
                            .filter(d => d)
                            .filter(m => m.path)
                            .map(m => {
                                if (m.page_class === 'CommonLayOut') {
                                    return (
                                        <Route
                                            key={m.id}
                                            exact
                                            path={m.path + (m.path_holder ? m.path_holder : '')}
                                            render={() => (
                                                <div id="contentBox" style={{
                                                    width: winWidth - 32,
                                                    height: winHeight - headerHeight - menuHeight - footerHeight - 16
                                                }}>
                                                    <PropsRoute component={require('../' + m.page_path)[m.page_class]}
                                                                defaultQueryObj={m.defaultQueryObj} />
                                                </div>
                                            )}
                                        />
                                    )
                                }
                                return (
                                    <Route
                                        key={m.id}
                                        exact
                                        path={m.path + (m.path_holder ? m.path_holder : '')}
                                        render={() => (
                                            <div id="contentBox" style={{
                                                width: winWidth - 32,
                                                height: winHeight - headerHeight - menuHeight - footerHeight - 16
                                            }}>
                                                <Route component={require('../' + m.page_path)[m.page_class]}/>
                                            </div>
                                        )}
                                    />
                                )

                            })
                    }
                </Switch>
                <footer>© syuyuusyu@gmail.com</footer>
            </div>
        );
    }
}

export default withRouter(Main);
