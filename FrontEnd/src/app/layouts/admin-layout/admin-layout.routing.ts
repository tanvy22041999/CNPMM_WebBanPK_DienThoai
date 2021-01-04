import { Routes } from '@angular/router';

import { DashboardComponent } from '../../FormAdmin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../FormAdmin/user-profile/user-profile.component';
import { TableListComponent } from '../../FormAdmin/table-list/table-list.component';
import { TypographyComponent } from '../../FormAdmin/typography/typography.component';
import { IconsComponent } from '../../FormAdmin/icons/icons.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'product-list',     component: TableListComponent },
    { path: 'create-admin',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
];
