import RegisterForm from "@/app/ui/login/register-form";

export default function RegisterPage() {
    return (
      <main className="flex items-center justify-center md:h-screen">
				<div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
					<div className="flex h-20 w-full items-end rounded-lg bg-gray-400 p-3 md:h-36 content-center">
						<div className="text-white text-4xl text-center">
							<p>Senior Project</p>
							<p>Study Application</p>
						</div>
					</div>
					<RegisterForm />
				</div>
			</main>
    )
}