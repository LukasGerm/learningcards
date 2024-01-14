import { Component } from "solid-js";
import { createStore } from "solid-js/store";

import { Button } from "../atoms/Button";
import { useSignIn } from "../../logic-components/hooks/useSignIn";
import { Input } from "../atoms/Input";

const useSubmitForm = () => {
  const [errors, setErrors] = createStore<{
    email?: string;
    password?: string;
    signIn?: string;
  }>();

  const signIn = useSignIn();

  const validate = (fields: {
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
  }) => {
    if (!fields.email) {
      setErrors({ email: "Email is required" });
      return false;
    }
    if (!fields.password) {
      setErrors({ password: "Password is required" });
      return false;
    }
    setErrors({ password: undefined });

    return true;
  };

  const onSubmit = (e: Event) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email");
    const password = formData.get("password");

    if (!validate({ email, password })) {
      return;
    }

    signIn({
      email: email as string,
      password: password as string,
    }).catch((e) => {
      const errorMessage = e.message;
      setErrors({ signIn: errorMessage });
    });
  };
  return { onSubmit, errors };
};

export const LoginForm: Component = () => {
  const { onSubmit, errors } = useSubmitForm();

  return (
    <div class="flex gap-5 flex-col ">
      <h1 class="text-2xl ">Login</h1>
      {errors.signIn && <p class="text-red-500 text-xs">{errors.signIn}</p>}
      <form onSubmit={onSubmit}>
        <div class="mb-4">
          <Input
            label="E-Mail"
            name="email"
            type="email"
            placeholder="joe@test.com"
            error={errors.email}
          />
        </div>

        <div class="mb-6">
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="******************"
            error={errors.password}
          />
        </div>

        <div class="flex items-center justify-between">
          <a
            class="inline-block align-baseline font-bold text-sm  "
            href="/register"
          >
            Need an account?
          </a>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};
