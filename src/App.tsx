import { Match, Switch, lazy } from "solid-js";
import { RootLayout } from "./RootLayout";
import { Route, Router } from "@solidjs/router";
import { useObserveSession } from "./components/logic-components/hooks/user.selectors";
import { RouteGuard } from "./components/logic-components/features/RouteGuard";

// type ValidationFunction = ({ value }: { value: string }) => Promise<unknown>;

/* declare module "solid-js" {
  namespace JSX {
    interface Directives {
      formSubmit: (form: HTMLFormElement) => void;
      validate: ValidationFunction[];
    }
  }
}*/

const Auth = lazy(() => import("./routes/auth"));
const Login = lazy(() => import("./routes/auth/login"));
const Register = lazy(() => import("./routes/auth/register"));
const CollectionsOverview = lazy(() => import("./routes/"));

const MainRouter = () => {
  return (
    <>
      <RouteGuard
        shouldBeAuthenticated={true}
        path="/"
        component={CollectionsOverview}
      />
      <Route path="/auth" component={Auth}>
        <RouteGuard
          shouldBeAuthenticated={false}
          path="/login"
          component={Login}
        />
        <RouteGuard
          shouldBeAuthenticated={false}
          path="/register"
          component={Register}
        />
      </Route>
    </>
  );
};

export const App = () => {
  const state = useObserveSession();

  return (
    <Switch fallback={<>Not found</>}>
      <Match when={state.loading}>
        <RootLayout>
          <p>Loading...</p>
        </RootLayout>
      </Match>
      <Match when={state.error}>
        <p>ERROR</p>
      </Match>
      <Match when={!state.loading || state.data}>
        <MainRouter />
      </Match>
    </Switch>
  );
};
