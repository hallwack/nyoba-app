import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {};

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

type Schema = z.infer<typeof schema>;

function Login({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const { data, status } = useSession();

  const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
    // console.log(data);
    const user = await signIn("credentials", {
      data,
      redirect: false,
      callbackUrl: "/",
    });
    console.log(data);
    console.log(status);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <form
          className="flex w-3/4 flex-col gap-4 rounded bg-slate-100 p-8 md:w-2/4 lg:w-1/4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit">Login</Button>
          <Link href="/auth/register" legacyBehavior>
            <Button type="button" variant="outline">
              Register
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
