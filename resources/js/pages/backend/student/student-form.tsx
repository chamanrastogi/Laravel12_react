"use client";

import { FormEventHandler } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { LoaderCircle } from "lucide-react";

interface StudentFormProps {
  data: {
    name: string;
    email: string;
    age: string;
  };
  errors: Partial<Record<keyof StudentFormProps['data'], string>>;
  onSubmit: FormEventHandler;
  setData: (key: string, value: string) => void;
  processing: boolean;
  buttonText: string;
}

export default function StudentForm({
  data,
  errors,
  onSubmit,
  setData,
  processing,
  buttonText,
}: StudentFormProps) {
  return (
    <form className="flex flex-col gap-6 mt-3" onSubmit={onSubmit}>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            autoFocus
            autoComplete="name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            disabled={processing}
            placeholder="Full name"
          />
          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            disabled={processing}
            placeholder="email@example.com"
          />
          <InputError message={errors.email} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="text"
            autoComplete="off"
            value={data.age}
            onChange={(e) => setData("age", e.target.value)}
            disabled={processing}
            placeholder="Age"
          />
          <InputError message={errors.age} />
        </div>

        <Button type="submit" className="mt-2 w-full" disabled={processing}>
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
