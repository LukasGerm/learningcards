import { ParentComponent } from "solid-js";
import { useSession } from "../hooks/user.selectors";
import { Navigate, Route } from "@solidjs/router";

interface PrivateRouteProps {
  path: string;
  component: ParentComponent;
  shouldBeAuthenticated: boolean;
}

const PrivateComp: ParentComponent<{
  shouldBeAuthenticated?: boolean;
}> = (props) => {
  const session = useSession();

  if (props.shouldBeAuthenticated && !session) {
    console.log("REDIRECTING TO LOGIN");
    return <Navigate href="/auth/login" />;
  } else if (props.shouldBeAuthenticated === false && session) {
    console.log("REDIRECTING TO HOME");
    return <Navigate href="/home" />;
  }

  console.log("RENDERING CHILDREN");

  return props.children;
};

// TODO Does not work for route groups, fix
export const RouteGuard: ParentComponent<PrivateRouteProps> = (props) => {
  return (
    <Route
      path={props.path}
      component={() => (
        <PrivateComp shouldBeAuthenticated={props.shouldBeAuthenticated}>
          <props.component />
        </PrivateComp>
      )}
    >
      {props.children}
    </Route>
  );
};
