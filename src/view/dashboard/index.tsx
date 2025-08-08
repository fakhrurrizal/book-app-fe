'use client'

import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Legend,
    AreaChart,
    Area,
} from 'recharts'
import { BookOpen, Users, Package, Calendar, TrendingUp, UserCheck, Download, Filter } from 'lucide-react'
import { Grid } from '@mui/material'

const DashboardView: React.FC = () => {
    const bukuPerKategoriData = [
        { kategori: 'Teknologi', jumlah: 245, dipinjam: 189, tersedia: 56 },
        { kategori: 'Sastra', jumlah: 180, dipinjam: 125, tersedia: 55 },
        { kategori: 'Psikologi', jumlah: 165, dipinjam: 98, tersedia: 67 },
        { kategori: 'Sejarah', jumlah: 140, dipinjam: 85, tersedia: 55 },
        { kategori: 'Ekonomi', jumlah: 120, dipinjam: 78, tersedia: 42 },
        { kategori: 'Agama', jumlah: 95, dipinjam: 52, tersedia: 43 },
    ]

    const statusBukuData = [
        { name: 'Tersedia', value: 318, color: '#10B981' },
        { name: 'Dipinjam', value: 627, color: '#F59E0B' },
        { name: 'Rusak/Hilang', value: 23, color: '#EF4444' },
        { name: 'Dalam Proses', value: 12, color: '#8B5CF6' },
    ]

    const jenisAnggotaData = [
        { name: 'Mahasiswa', value: 1250, color: '#3B82F6' },
        { name: 'Dosen', value: 89, color: '#10B981' },
        { name: 'Staff', value: 45, color: '#F59E0B' },
        { name: 'Umum', value: 156, color: '#8B5CF6' },
    ]

    const peminjamanBulananData = [
        { bulan: 'Jan', peminjaman: 145, pengembalian: 90, terlambat: 12 },
        { bulan: 'Feb', peminjaman: 167, pengembalian: 105, terlambat: 18 },
        { bulan: 'Mar', peminjaman: 189, pengembalian: 120, terlambat: 15 },
        { bulan: 'Apr', peminjaman: 203, pengembalian: 135, terlambat: 22 },
        { bulan: 'May', peminjaman: 224, pengembalian: 195, terlambat: 19 },
        { bulan: 'Jun', peminjaman: 230, pengembalian: 195, terlambat: 14 },
    ]

    const aktivitasHarianData = [
        { hari: 'Senin', kunjungan: 85, peminjaman: 42, pengembalian: 38 },
        { hari: 'Selasa', kunjungan: 92, peminjaman: 48, pengembalian: 41 },
        { hari: 'Rabu', kunjungan: 78, peminjaman: 39, pengembalian: 45 },
        { hari: 'Kamis', kunjungan: 105, peminjaman: 52, pengembalian: 49 },
        { hari: 'Jumat', kunjungan: 115, peminjaman: 58, pengembalian: 52 },
        { hari: 'Sabtu', kunjungan: 65, peminjaman: 31, pengembalian: 28 },
    ]

    interface StatCardProps {
        icon: React.ComponentType<any>
        title: string
        value: string
        subtitle: string
        bgColor: string
        iconColor: string
        textColor?: string
    }

    const StatCard: React.FC<StatCardProps> = ({
        icon: Icon,
        title,
        value,
        subtitle,
        bgColor,
        iconColor,
        textColor
    }) => (
        <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105'>
            <div className='flex items-center justify-between'>
                <div className='flex-1'>
                    <p className='text-gray-600 text-sm font-medium mb-1'>{title}</p>
                    <p className={`text-3xl font-bold ${textColor || 'text-gray-900'} mb-1`}>{value}</p>
                    <p className='text-xs text-gray-500'>{subtitle}</p>
                </div>
                <div className={`${bgColor} p-4 rounded-xl shadow-sm`}>
                    <Icon className={`h-8 w-8 ${iconColor}`} />
                </div>
            </div>
        </div>
    )

    interface ChartContainerProps {
        title: string
        children: React.ReactNode
        className?: string
    }

    const ChartContainer: React.FC<ChartContainerProps> = ({ title, children, className = '' }) => (
        <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 ${className}`}>
            <div className='flex items-center justify-between mb-6'>
                <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
                <div className='h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-12'></div>
            </div>
            {children}
        </div>
    )

    const renderCustomTooltip = (contentStyle: React.CSSProperties) => ({
        contentStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            backdropFilter: 'blur(10px)',
            ...contentStyle
        }
    })

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
            <div className='bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-6 mb-8 sticky top-0 z-10'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Dashboard Perpustakaan
                        </h1>
                        <p className='text-gray-600 mt-2'>Kelola dan pantau aktivitas perpustakaan Anda</p>
                    </div>

                </div>
            </div>

            <div className='px-6 pb-8'>
                <Grid container spacing={3} mb={4}>
                    <Grid item xs={12} md={6} lg={3}>
                        <StatCard
                            icon={BookOpen}
                            title="Total Buku"
                            value="2,945"
                            subtitle="+125 bulan ini"
                            bgColor="bg-gradient-to-br from-blue-100 to-blue-200"
                            iconColor="text-blue-600"
                            textColor="text-blue-900"
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <StatCard
                            icon={Users}
                            title="Total Anggota"
                            value="1,540"
                            subtitle="+89 bulan ini"
                            bgColor="bg-gradient-to-br from-green-100 to-green-200"
                            iconColor="text-green-600"
                            textColor="text-green-900"
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <StatCard
                            icon={Calendar}
                            title="Sedang Dipinjam"
                            value="627"
                            subtitle="22 terlambat"
                            bgColor="bg-gradient-to-br from-orange-100 to-orange-200"
                            iconColor="text-orange-600"
                            textColor="text-orange-900"
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <StatCard
                            icon={TrendingUp}
                            title="Kunjungan Hari Ini"
                            value="143"
                            subtitle="+12% dari kemarin"
                            bgColor="bg-gradient-to-br from-purple-100 to-purple-200"
                            iconColor="text-purple-600"
                            textColor="text-purple-900"
                        />
                    </Grid>
                </Grid>

                <div className='mb-8'>
                    <ChartContainer title="Distribusi Buku per Kategori" className="bg-white rounded-lg shadow p-4 border-none">
                        <ResponsiveContainer width='100%' height={400}>
                            <BarChart data={bukuPerKategoriData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <defs>
                                    <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.6} />
                                    </linearGradient>
                                    <linearGradient id="dipinjamGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.6} />
                                    </linearGradient>
                                    <linearGradient id="tersediaGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#10B981" stopOpacity={0.6} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' opacity={0.6} />
                                <XAxis
                                    dataKey='kategori'
                                    tick={{ fontSize: 13, fill: '#64748b' }}
                                    axisLine={{ stroke: '#cbd5e1' }}
                                    tickLine={{ stroke: '#cbd5e1' }}
                                />
                                <YAxis
                                    tick={{ fontSize: 13, fill: '#64748b' }}
                                    axisLine={{ stroke: '#cbd5e1' }}
                                    tickLine={{ stroke: '#cbd5e1' }}
                                />
                                <Tooltip {...renderCustomTooltip({})} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar
                                    dataKey='jumlah'
                                    fill='url(#totalGradient)'
                                    name='Total Buku'
                                    radius={[4, 4, 0, 0]}
                                    stroke='#3B82F6'
                                    strokeWidth={1}
                                />
                                <Bar
                                    dataKey='dipinjam'
                                    fill='url(#dipinjamGradient)'
                                    name='Sedang Dipinjam'
                                    radius={[4, 4, 0, 0]}
                                    stroke='#F59E0B'
                                    strokeWidth={1}
                                />
                                <Bar
                                    dataKey='tersedia'
                                    fill='url(#tersediaGradient)'
                                    name='Tersedia'
                                    radius={[4, 4, 0, 0]}
                                    stroke='#10B981'
                                    strokeWidth={1}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>

                <Grid container spacing={3} mb={4}>
                    <Grid item xs={12} lg={6}>
                        <ChartContainer title="Status Keseluruhan Buku">
                            <ResponsiveContainer width="100%" height={350}>
                                <PieChart>
                                    <defs>
                                        {statusBukuData.map((entry, index) => (
                                            <linearGradient key={`gradient-${index}`} id={`statusGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor={entry.color} stopOpacity={0.9} />
                                                <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                                            </linearGradient>
                                        ))}
                                    </defs>
                                    <Pie
                                        data={statusBukuData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={120}
                                        paddingAngle={4}
                                        dataKey="value"
                                        stroke="rgba(255,255,255,0.6)"
                                        strokeWidth={2}
                                    >
                                        {statusBukuData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`url(#statusGradient${index})`} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: any) => [`${value} buku`, 'Jumlah']}
                                        {...renderCustomTooltip({})}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <ChartContainer title="Distribusi Anggota">
                            <ResponsiveContainer width="100%" height={350}>
                                <PieChart>
                                    <defs>
                                        {jenisAnggotaData.map((entry, index) => (
                                            <linearGradient key={`memberGradient-${index}`} id={`memberGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor={entry.color} stopOpacity={0.9} />
                                                <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                                            </linearGradient>
                                        ))}
                                    </defs>
                                    <Pie
                                        data={jenisAnggotaData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={0}
                                        outerRadius={120}
                                        paddingAngle={3}
                                        dataKey="value"
                                        stroke="rgba(255,255,255,0.6)"
                                        strokeWidth={2}
                                    >
                                        {jenisAnggotaData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`url(#memberGradient${index})`} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: any) => [`${value} orang`, 'Jumlah']}
                                        {...renderCustomTooltip({})}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </Grid>
                </Grid>
                <div className='mb-8'>
                    <ChartContainer title="Trend Peminjaman Bulanan">
                        <ResponsiveContainer width='100%' height={400}>
                            <LineChart data={peminjamanBulananData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <defs>
                                    <linearGradient id="peminjamanGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id="pengembalianGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#10B981" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' opacity={0.6} />
                                <XAxis
                                    dataKey='bulan'
                                    tick={{ fontSize: 13, fill: '#64748b' }}
                                    axisLine={{ stroke: '#cbd5e1' }}
                                    tickLine={{ stroke: '#cbd5e1' }}
                                />
                                <YAxis
                                    tick={{ fontSize: 13, fill: '#64748b' }}
                                    axisLine={{ stroke: '#cbd5e1' }}
                                    tickLine={{ stroke: '#cbd5e1' }}
                                />
                                <Tooltip {...renderCustomTooltip({})} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Line
                                    type='monotone'
                                    dataKey='peminjaman'
                                    stroke='#3B82F6'
                                    strokeWidth={4}
                                    name='Peminjaman'
                                    dot={{ fill: '#3B82F6', r: 6, strokeWidth: 2, stroke: 'white' }}
                                    activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2, fill: 'white' }}
                                />
                                <Line
                                    type='monotone'
                                    dataKey='pengembalian'
                                    stroke='#10B981'
                                    strokeWidth={4}
                                    name='Pengembalian'
                                    dot={{ fill: '#10B981', r: 6, strokeWidth: 2, stroke: 'white' }}
                                    activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2, fill: 'white' }}
                                />
                                <Line
                                    type='monotone'
                                    dataKey='terlambat'
                                    stroke='#EF4444'
                                    strokeWidth={3}
                                    strokeDasharray="5 5"
                                    name='Terlambat'
                                    dot={{ fill: '#EF4444', r: 4, strokeWidth: 2, stroke: 'white' }}
                                    activeDot={{ r: 6, stroke: '#EF4444', strokeWidth: 2, fill: 'white' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>

                {/* Aktivitas Harian */}
                <ChartContainer title="Aktivitas Harian Perpustakaan">
                    <ResponsiveContainer width='100%' height={400}>
                        <AreaChart data={aktivitasHarianData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <defs>
                                <linearGradient id="kunjunganAreaGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.2} />
                                </linearGradient>
                                <linearGradient id="peminjamanAreaGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.2} />
                                </linearGradient>
                                <linearGradient id="pengembalianAreaGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.2} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' opacity={0.6} />
                            <XAxis
                                dataKey='hari'
                                tick={{ fontSize: 13, fill: '#64748b' }}
                                axisLine={{ stroke: '#cbd5e1' }}
                                tickLine={{ stroke: '#cbd5e1' }}
                            />
                            <YAxis
                                tick={{ fontSize: 13, fill: '#64748b' }}
                                axisLine={{ stroke: '#cbd5e1' }}
                                tickLine={{ stroke: '#cbd5e1' }}
                            />
                            <Tooltip {...renderCustomTooltip({})} />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Area
                                type='monotone'
                                dataKey='kunjungan'
                                stackId='1'
                                stroke='#8B5CF6'
                                fill='url(#kunjunganAreaGradient)'
                                strokeWidth={2}
                                name='Kunjungan'
                            />
                            <Area
                                type='monotone'
                                dataKey='peminjaman'
                                stackId='2'
                                stroke='#3B82F6'
                                fill='url(#peminjamanAreaGradient)'
                                strokeWidth={2}
                                name='Peminjaman'
                            />
                            <Area
                                type='monotone'
                                dataKey='pengembalian'
                                stackId='3'
                                stroke='#10B981'
                                fill='url(#pengembalianAreaGradient)'
                                strokeWidth={2}
                                name='Pengembalian'
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
        </div>
    )
}

export default DashboardView