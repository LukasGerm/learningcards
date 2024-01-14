import { Match, ParentComponent, Switch, lazy } from "solid-js";
import { RootLayout } from "./RootLayout";
import { Navigate, Route, Router } from "@solidjs/router";
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
const CollectionsOverview = lazy(() => import("./routes/home"));

export const SessionChecker: ParentComponent = (props) => {
  const state = useObserveSession();

  console.log("ASD");

  return (
    <>
      <Switch>
        <Match when={state.loading}>
          <RootLayout>
            <p>Loading...</p>
          </RootLayout>
        </Match>
        <Match when={state.error}>
          <RootLayout>
            <p>ERROR</p>
          </RootLayout>
        </Match>
        <Match when={!state.loading && state.data}>
          <Navigate href="/home" />
        </Match>
        <Match when={!state.loading && !state.data}>
          <Navigate href="/auth/login" />
        </Match>
      </Switch>
      {props.children}
    </>
  );
};

const MainRoutes = () => {
  return (
    <Route path="/" component={SessionChecker}>
      <Route path="/" component={SessionChecker} />
      <RouteGuard
        shouldBeAuthenticated={true}
        path="/home"
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
    </Route>
  );
};

export const App = () => {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
};
