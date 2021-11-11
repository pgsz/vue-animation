/* eslint-disable */
const App = () => import(/* webpackChunkName: "group-app" */ '../components/App.vue')
const FooSub = () => import(/* webpackChunkName: "group-foo" */ '../components/Foo/FooSub/Foo.vue')
const FooTwo = () => import(/* webpackChunkName: "group-foo" */ '../components/Foo/FooTwo.vue')
const Bar = () => import(/* webpackChunkName: "group-bar" */ '../components/Bar/Bar.vue')
const UserRoler = () => import(/* webpackChunkName: "group-user" */ '../components/User/UserManager/UserRolerManager.vue')
const UserPower = () => import(/* webpackChunkName: "group-user" */ '../components/User/UserManager/UserPowerManager.vue')

const routes = [
    {
        path: '/foo',
        name: 'Foo',
        title: 'Foo-Title',
        component: App,
        icon: 'el-icon-platform-eleme',
        children: [
            {
                path: '/foo/sub',
                name: 'FooSub',
                title: 'Foo-Title-sub',
                component: FooSub,
                icon: 'el-icon-platform-eleme',
            },
            {
                path: '/foo/two',
                name: 'FooTwo',
                title: 'Foo-Title-two',
                component: FooTwo,
                icon: 'el-icon-platform-eleme',
            },
        ]
    },
    {
        path: '/bar',
        name: 'Bar',
        title: 'Bar-Title',
        component: Bar,
        icon: 'el-icon-s-tools'
    },
    {
        path: '/user',
        name: 'User',
        title: 'user-Title',
        component: App,
        icon: 'el-icon-s-tools',
        children: [
            {
                path: '/user/roler',
                name: 'UserRoler',
                title: 'User-Roler',
                component: UserRoler,
                icon: 'el-icon-platform-eleme',
            },
            {
                path: '/user/power',
                name: 'UserRoler',
                title: 'User-Power',
                component: UserPower,
                icon: 'el-icon-platform-eleme',
            },
        ]
    },
    {
        path: '/',
        redirect: { name: 'FooSub' }
    }
]

export default routes