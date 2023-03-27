import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/utils/api";

type Props = {};

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  address: z.string(),
  phoneNumber: z.string(),
});

type Schema = z.infer<typeof registerSchema>;

function Register({}: Props) {
  const { register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = api.user.register.useMutation();

  const onSubmit = (data: Schema) => {
    mutation.mutate(data);
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <form
          className="flex w-3/4 flex-col gap-4 rounded bg-slate-100 p-8 md:w-2/4 lg:w-1/4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Name"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="Address"
              {...register("address")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="tel"
              id="phoneNumber"
              placeholder="Phone Number"
              {...register("phoneNumber")}
            />
          </div>
          {/* <div className="flex flex-col gap-2">
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              id="image"
              placeholder="Image"
              {...register("image")}
            />
          </div> */}
          <Button type="submit">Register</Button>
          <Link href="/auth/login" legacyBehavior>
            <Button type="button" variant="outline">
              Login
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
