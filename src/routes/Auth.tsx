import { Component, ParentComponent, lazy } from "solid-js";

import { Route, Router } from "@solidjs/router";
import { RootLayout } from "../RootLayout";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Layout: ParentComponent = (props) => {
  return (
    <RootLayout>
      <div class="h-full flex items-center">
        <div class=" bg-card px-8 py-5 roundedflex flex-col gap-2 justify-center flex-1">
          {props.children}
        </div>
      </div>
    </RootLayout>
  );
};

const Auth: Component = () => {
  return (
    <Router root={Layout}>
      <Route path="/" component={LoginForm} />
      <Route path="/register" component={RegisterForm} />
    </Router>
  );
};

export default Auth;
