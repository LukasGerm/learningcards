import { Match, Switch } from "solid-js";
import { Auth } from "./routes/Auth";
import { useObserveSession } from "./components/hooks/user.selectors";
import { RootLayout } from "./RootLayout";
import { CollectionsOverview } from "./routes/CollectionsOverview";

// type ValidationFunction = ({ value }: { value: string }) => Promise<unknown>;

/* declare module "solid-js" {
  namespace JSX {
    interface Directives {
      formSubmit: (form: HTMLFormElement) => void;
      validate: ValidationFunction[];
    }
  }
}*/

export const App = () => {
  const state = useObserveSession();

  return (
    <Switch fallback={<Auth />}>
      <Match when={state.loading}>
        <RootLayout>
          <p>Loading...</p>
        </RootLayout>
      </Match>
      <Match when={state.error}>
        <p>ERROR</p>
      </Match>
      <Match when={state.data}>
        <CollectionsOverview />
      </Match>
    </Switch>
  );
};
