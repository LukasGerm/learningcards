import { getAuth, signOut } from "firebase/auth";
import { Route, Router } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import { Button } from "../components/atoms/Button";
import { RootLayout } from "../RootLayout";
import { CollectionList } from "../components/organisms/CollectionList";

const Layout: ParentComponent = (props) => {
  return (
    <div>
      <div class="flex justify-end w-full absolute box-border items-end px-4 py-4">
        <div>
          <Button onClick={() => signOut(getAuth())}>Sign out</Button>
        </div>
      </div>
      <RootLayout>{props.children}</RootLayout>
    </div>
  );
};

const CollectionsOverview = () => {
  return (
    <Router root={Layout}>
      <Route path="/" component={CollectionList} />
    </Router>
  );
};

export default CollectionsOverview;
