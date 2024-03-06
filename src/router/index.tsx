import { lazy } from "react";


export const routes = [
    {
        path: '/',
        Component: lazy(() => import('@/pages/ahooks/3-20/one')),
        redirect: '/child2',
        children: [
            {
                path: '/child1',
                Component: lazy(() => import('@/pages/ahooks/3-20/childs/child1')),
                // roles:[USER_ROLES.ADMIN], 
            },
            {
                path: '/child2',
                Component: lazy(() => import('@/pages/ahooks/3-20/childs/child2')),
                // roles:[USER_ROLES.ADMIN], 
            },
            {
                path: '/child3',
                Component: lazy(() => import('@/pages/ahooks/3-20/childs/child3')),
                // roles:[USER_ROLES.ADMIN], 
            },

        ]
    },
    {
        path: '/imagetofont',
        Component: lazy(() => import('@/pages/ahooks/3-20/imagetofont')),
        children: []
    },
    {
        path: '/three',
        Component: lazy(() => import('@/pages/ahooks/3-20/three')),
        children: []
    },
    {
        path: '/filemanage',
        Component: lazy(() => import('@/pages/work/FileEdit')),
        children: []
    },
    {
        path: '*',
        Component: lazy(() => import('@/pages/404')),
        children: []
    }
]

