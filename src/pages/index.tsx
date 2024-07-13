import { Container } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";


export default function Home() {

	const router = useRouter()

	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center">
			<Image
				alt="logo"
				src="/logo.png"
				width={70}
				height={70}
				className="rounded-full border-2 p-1 border-primary animate__animated animate__zoomIn animate__delay-3s"
			/>
			<div className="container mx-auto px-4">
				<h1 className="text-5xl mt-10 font-bold text-primary animate__animated animate__backInDown animate__delay-1s">
					Selamat Datang
				</h1>
				<p className="text-2xl mt-4 animate__animated animate__fadeIn animate__delay-2s">
					Temukan berbagai buku menarik dan informatif hanya di sini.
				</p>
				<div>
					<button
						onClick={() => router.push("/category")}
						className="text-primary animate__animated animate__zoomIn animate__delay-3s text-md mt-7 border-2 border-primary rounded-md px-5 py-2 transition duration-300 hover:bg-primary hover:text-white hover:border-transparent"
					>
						Dapatkan Sekarang
					</button>
				</div>
			</div>
		</div>

	);
}
