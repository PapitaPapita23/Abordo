
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, EyeIcon, EyeOffIcon, CheckCircle, XCircle } from "lucide-react";

type RegisterProps = {
  onClose?: () => void;
  onSwitchToLogin?: () => void;
};

// Enhanced validation schema with better password requirements
const registerSchema = z.object({
  name: z.string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre debe tener máximo 50 caracteres" }),
  email: z.string()
    .min(1, { message: "El correo electrónico es obligatorio" })
    .email({ message: "Por favor, ingresa un correo electrónico válido" }),
  password: z.string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(100, { message: "La contraseña debe tener máximo 100 caracteres" })
    .refine(value => /[A-Z]/.test(value), { 
      message: "La contraseña debe contener al menos una letra mayúscula" 
    })
    .refine(value => /[0-9]/.test(value), { 
      message: "La contraseña debe contener al menos un número" 
    })
});

const Register = ({ onClose, onSwitchToLogin }: RegisterProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isModal = !!onClose;

  // Form setup with enhanced validation
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    mode: "onChange" // Validate on change for real-time password strength feedback
  });

  // Get password value for strength indicator
  const password = form.watch("password");
  const passwordLength = password?.length > 5;
  const hasUppercase = /[A-Z]/.test(password || "");
  const hasNumber = /[0-9]/.test(password || "");

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      const success = await loginWithGoogle();
      if (success) {
        if (isModal) {
          onClose?.();
        } else {
          navigate("/");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    try {
      const success = await register(values.name, values.email, values.password);
      if (success) {
        if (isModal) {
          onClose?.();
        } else {
          navigate("/");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`relative flex flex-col justify-center ${!isModal ? 'min-h-screen p-6' : ''}`}>
      {isModal && (
        <button
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 7.293l-4.146-4.146a1 1 0 0 0-1.414 1.414L6.586 8 2.44 12.146a1 1 0 0 0 1.414 1.414L8 9.414l4.146 4.146a1 1 0 0 0 1.414-1.414L9.414 8l4.146-4.146a1 1 0 0 0-1.414-1.414L8 7.293z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-bold text-navy-dark">
                  Crear una cuenta
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  ¿Ya tienes una cuenta?{" "}
                  {isModal ? (
                    <button
                      type="button"
                      onClick={onSwitchToLogin}
                      className="font-medium text-[#599ACF] hover:text-[#599ACF]"
                    >
                      Iniciar sesión
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="font-medium text-[#599ACF] hover:text-[#599ACF]"
                    >
                      Iniciar sesión
                    </Link>
                  )}
                </p>
              </div>
              <hr className="my-4" />
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Tu nombre" 
                        {...field} 
                        autoComplete="name"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="tu@email.com" 
                        type="email" 
                        {...field} 
                        autoComplete="email"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="********" 
                          type={showPassword ? "text" : "password"}
                          {...field} 
                          autoComplete="new-password"
                          disabled={isLoading}
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={togglePasswordVisibility}
                          tabIndex={-1}
                        >
                          {showPassword ? 
                            <EyeOffIcon className="h-4 w-4" /> : 
                            <EyeIcon className="h-4 w-4" />
                          }
                        </button>
                      </div>
                    </FormControl>
                    
                    {/* Password strength indicator */}
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex items-center">
                        {passwordLength ? 
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> : 
                          <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        }
                        <span className={passwordLength ? "text-green-600" : "text-gray-600"}>
                          Al menos 6 caracteres
                        </span>
                      </div>
                      <div className="flex items-center">
                        {hasUppercase ? 
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> : 
                          <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        }
                        <span className={hasUppercase ? "text-green-600" : "text-gray-600"}>
                          Al menos una letra mayúscula
                        </span>
                      </div>
                      <div className="flex items-center">
                        {hasNumber ? 
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> : 
                          <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        }
                        <span className={hasNumber ? "text-green-600" : "text-gray-600"}>
                          Al menos un número
                        </span>
                      </div>
                    </div>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full bg-[#599ACF] hover:bg-[#4785BB] text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  "Registrarse"
                )}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O continúa con</span>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleGoogleRegister}
                className="w-full text-[#152B3D] flex items-center justify-center space-x-4 hover:bg-gray-100 transition duration-300 rounded-md py-3 border border-[#599ACF] bg-transparent"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="mr-2"
                  >
                    <g clipPath="url(#clip0_133_277)">
                      <path
                        d="M5.57338 0.52637C3.97473 1.08096 2.59606 2.13358 1.63987 3.52962C0.683675 4.92567 0.200366 6.59155 0.26093 8.28258C0.321493 9.9736 0.922737 11.6006 1.97635 12.9247C3.02996 14.2488 4.4804 15.2001 6.11463 15.6389C7.43953 15.9807 8.82764 15.9958 10.1596 15.6826C11.3663 15.4116 12.4819 14.8318 13.3971 14.0001C14.3497 13.1081 15.0412 11.9732 15.3971 10.7176C15.784 9.35221 15.8529 7.91629 15.5984 6.52012H8.15838V9.60637H12.4671C12.381 10.0986 12.1965 10.5684 11.9246 10.9877C11.6527 11.4069 11.2989 11.767 10.8846 12.0464C10.3585 12.3944 9.76537 12.6286 9.14338 12.7339C8.51956 12.8499 7.8797 12.8499 7.25588 12.7339C6.62361 12.6031 6.0255 12.3422 5.49963 11.9676C4.65481 11.3696 4.02047 10.52 3.68713 9.54012C3.34815 8.54186 3.34815 7.45963 3.68713 6.46137C3.92441 5.76164 4.31667 5.12454 4.83463 4.59762C5.42737 3.98355 6.17779 3.54462 7.00357 3.32896C7.82935 3.11331 8.69858 3.12928 9.51588 3.37512C10.1543 3.57111 10.7382 3.91354 11.2209 4.37512C11.7067 3.89179 12.1917 3.4072 12.6759 2.92137C12.9259 2.66012 13.1984 2.41137 13.4446 2.14387C12.7078 1.45822 11.843 0.924691 10.8996 0.57387C9.18176 -0.049893 7.3021 -0.066656 5.57338 0.52637Z"
                        fill="#E8EAED"
                      />
                      <path
                        d="M5.57348 0.526245C7.30206 -0.067184 9.18171 -0.0508623 10.8997 0.572495C11.8432 0.925699 12.7077 1.46179 13.4435 2.14999C13.1935 2.41749 12.9297 2.66749 12.6747 2.92749C12.1897 3.41166 11.7051 3.89416 11.221 4.37499C10.7383 3.91342 10.1544 3.57098 9.51598 3.37499C8.69895 3.1283 7.82975 3.1114 7.00375 3.32617C6.17775 3.54094 5.42687 3.97907 4.83348 4.59249C4.31552 5.11941 3.92326 5.75652 3.68598 6.45624L1.09473 4.44999C2.02224 2.6107 3.62816 1.20377 5.57348 0.526245Z"
                        fill="#E33629"
                      />
                      <path
                        d="M0.407926 6.43745C0.547203 5.74719 0.778431 5.07873 1.09543 4.44995L3.68668 6.4612C3.34769 7.45946 3.34769 8.54169 3.68668 9.53995C2.82334 10.2066 1.95959 10.8766 1.09543 11.55C0.301864 9.97035 0.0598419 8.17058 0.407926 6.43745Z"
                        fill="#F8BD00"
                      />
                      <path
                        d="M8.15876 6.5188H15.5988C15.8533 7.91496 15.7844 9.35088 15.3975 10.7163C15.0416 11.9719 14.3501 13.1067 13.3975 13.9988C12.5613 13.3463 11.7213 12.6988 10.885 12.0463C11.2996 11.7666 11.6535 11.4062 11.9254 10.9865C12.1973 10.5668 12.3817 10.0965 12.4675 9.6038H8.15876C8.15751 8.5763 8.15876 7.54755 8.15876 6.5188Z"
                        fill="#587DBD"
                      />
                      <path
                        d="M1.09375 11.55C1.95792 10.8834 2.82167 10.2134 3.685 9.54004C4.01901 10.5203 4.65426 11.3699 5.5 11.9675C6.02751 12.3404 6.62691 12.5992 7.26 12.7275C7.88382 12.8435 8.52368 12.8435 9.1475 12.7275C9.76949 12.6223 10.3626 12.3881 10.8888 12.04C11.725 12.6925 12.565 13.34 13.4012 13.9925C12.4861 14.8247 11.3705 15.4049 10.1637 15.6763C8.83176 15.9894 7.44365 15.9744 6.11875 15.6325C5.07088 15.3528 4.09209 14.8595 3.24375 14.1838C2.34583 13.4709 1.61244 12.5725 1.09375 11.55Z"
                        fill="#319F43"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_133_277">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
                <span>Registrarse con Google</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
