export const menu_static = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'solar:home-outline',
    role: [1, 2],
    children: [],
  },
  {
    path: '#',
    name: 'Master Data',
    role: [2],
    icon: 'mdi:folder-cog-outline',
    children: [
      {
        path: '/master-data/category',
        name: 'Kategori',
        icon: 'mdi:shape-outline',
      },
      {
        path: '/master-data/book',
        name: 'Buku',
        icon: 'mdi:book-open-page-variant-outline',
      },
    ],
  },
  {
    path: '/history',
    name: 'Riwayat Peminjaman',
    icon: 'mdi:book-open-page-variant',
    role: [1, 2],
    children: [],
  },
];

export interface MenuItem {
  path: string;
  name: string;
  icon: string;
  role?: number[];
  children?: MenuItem[];
}
