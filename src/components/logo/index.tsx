import Box from '@mui/material/Box'
import Image from 'next/image'
import { useRouter } from 'next/router'

// interface LogoForAppBarProps {
//   trigger?: boolean
// }

export const LogoForAppBar = () => {
    const { push } = useRouter()

    return (
        <Box
            sx={{
                display: 'flex',
                cursor: 'pointer',
                gap: 1,
                alignItems: 'center',
            }}
            onClick={() => push('/category')}
        >
            <Box>
                <div className="w-[60px] h-[60px] border-2 p-1 border-primary rounded-full overflow-hidden">
                    <Image src="/logo.png" alt="Logo" width={60} height={60} />
                </div>
            </Box>
        </Box>
    )
}
