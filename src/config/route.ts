//路由配置
// 定义一些路由
import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserRegister from "../pages/UserRegister.vue";
import UserPageMore from "../pages/UserPageMore.vue";



// const routes = [
//     { path: '/', component: Index },
//     { path: '/team', title: '找队伍', component: Team },
//     { path: '/team/add', title: '创建队伍', component: TeamAddPage },
//     { path: '/team/update', title: '更新队伍', component: TeamUpdatePage },
//     { path: '/user', title: '个人信息', component: UserPage },
//     { path: '/search', title: '找伙伴', component: SearchPage },
//     { path: '/user/list', title: '用户列表', component: SearchResultPage },
//     { path: '/user/edit', title: '编辑信息', component: UserEditPage },
//     { path: '/user/login', title: '登录', component: UserLoginPage },
//     { path: '/user/update', title: '更新信息', component: UserUpdatePage },
//     { path: '/user/team/join', title: '我加入的队伍', component: UserTeamJoinPage },
//     { path: '/user/team/create', title: '我创建的队伍', component: UserTeamCreatePage },
// ]

const routes = [
    {path: '/', meta: {title: '首页'}, component: Index},
    {path: '/team', meta: {title: '找队伍'}, component: Team},
    {path: '/team/add', meta: {title: '创建队伍'}, component: TeamAddPage},
    {path: '/team/update', meta: {title: '更新队伍'}, component: TeamUpdatePage},
    {path: '/user', meta: {title: '个人信息'}, component: UserPage},
    {path: '/search', meta: {title: '找伙伴'}, component: SearchPage},
    {path: '/user/list', meta: {title: '用户列表'}, component: SearchResultPage},
    {path: '/user/edit', meta: {title: '编辑信息'}, component: UserEditPage},
    {path: '/user/login', meta: {title: '登录'}, component: UserLoginPage},
    {path: '/user/register', meta: {title: "注册",}, component: UserRegister},
    {path: '/user/update', meta: {title: '更新信息'}, component: UserUpdatePage},
    {path: '/user/team/join', meta: {title: '我加入的队伍'}, component: UserTeamJoinPage},
    {path: '/user/team/create', meta: {title: '我创建的队伍'}, component: UserTeamCreatePage},
    {path: '/user/more', meta: {title: '详细信息'}, component: UserPageMore},

]

export default routes;
