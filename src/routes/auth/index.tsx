import { ParentComponent } from "solid-js";
import { RootLayout } from "../../RootLayout";

const Auth: ParentComponent = (props) => {
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

export default Auth;
