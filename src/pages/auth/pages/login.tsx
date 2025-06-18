import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import loginBg from "@/assets/images/login-bg.svg";
import { PasswordInput } from "@/components/ui/PasswordInput"
import { showErrorMessage } from "@/lib/utils/messageUtils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLogin } from "../core/hooks/useAuth"
import { loginSchema } from "../core/_schema";
import { LoginFormData } from "../core/_models";

export default function LoginPage() {
  const { mutate, isPending: isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await mutate(data);
    } catch (err: unknown) {
      showErrorMessage(err instanceof Error ? err.message : "Login failed. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat" 
    style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-md">
        <div className="mb-6 text-start">
          <h1 className="text-2xl font-bold text-gray-900">Log in to your account</h1>
          <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing 
          elit. Morbi lobortis maximus</p>
        </div>

        {/* {error && <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>} */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address*
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              className={`w-full ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              {/* <Link to="/auth/forgot-password" className="text-sm font-medium text-[#024AFE] hover:text-[#0206fe]">
                Forgot password?
              </Link> */}
            </div>
            <PasswordInput
              id="password"
              type="password"
              {...register("password")}
              className={`w-full ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-center my-7 text-sm">
          <p className="text-gray-600">Can't log in?</p>
          <Link to="/auth/forgot-password" className="text-[#024AFE] underline ml-1">Reset your password</Link>
          </div>
          <Button variant="primary" type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/auth/register" className="font-medium text-[#024AFE] hover:text-[#0206fe]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}