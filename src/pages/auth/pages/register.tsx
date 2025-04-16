import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import registerBg from "@/assets/images/login-bg.svg";
import { PasswordInput } from "@/components/ui/PasswordInput"
import { showErrorMessage } from "@/lib/utils/messageUtils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRegister } from "../core/hooks/useAuth"
import { RegisterFormData, UserRole } from "../core/_models";
import { registerSchema } from "../core/_schema";

export default function RegisterPage() {
  const { mutate, isPending: isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await mutate(data);
    } catch (err: unknown) {
      showErrorMessage(err instanceof Error ? err.message : "Registration failed. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat" 
    style={{ backgroundImage: `url(${registerBg})` }}>
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-md">
        <div className="mb-6 text-start">
          <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
          <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing 
          elit. Morbi lobortis maximus</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name*
            </label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name")}
              className={`w-full ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password*
            </label>
            <PasswordInput
              id="password"
              type="password"
              {...register("password")}
              className={`w-full ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role (Optional)
            </label>
            <select
              id="role"
              {...register("role")}
              className={`w-full rounded-md border ${errors.role ? "border-red-500" : "border-gray-300"} p-2`}
            >
              <option value="">Select a role</option>
              <option value={UserRole.ADMIN}>Admin</option>
              <option value={UserRole.SELLER}>Seller</option>
            </select>
            {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role.message}</p>}
          </div>

          <Button variant="primary" type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-medium text-blue-500 hover:text-blue-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
