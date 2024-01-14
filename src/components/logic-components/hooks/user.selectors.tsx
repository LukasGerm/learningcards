import { useNavigate } from "@solidjs/router";
import { User, getAuth, onIdTokenChanged } from "firebase/auth";
import { onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
export const useSession = () => {
  const auth = getAuth();

  return auth.currentUser;
};

export const useObserveSession = () => {
  const auth = getAuth();
  const [state, setState] = createStore<{
    loading: boolean;
    data: User | null;
    error: Error | null;
  }>({
    loading: auth.currentUser === null,
    data: auth.currentUser,
    error: null,
  });

  const navigate = useNavigate();

  const unsub = onIdTokenChanged(
    auth,
    (authUser) => {
      setState(
        reconcile({
          loading: false,
          data: authUser,
          error: null,
        })
      );
      if (authUser) {
        navigate("/home");
      } else {
        navigate("/auth/login");
      }
    },
    (error) => {
      setState(
        reconcile({
          loading: false,
          data: null,
          error,
        })
      );
    }
  );

  onCleanup(unsub);

  return state;
};
