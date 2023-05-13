import ua from "universal-analytics";
import { v4 as uuid } from "uuid";

import store from "../store";

const userId = store.get("userId") || uuid();

store.set("userId", userId);

function activateUser() {
  // const user = ua("UA-172128342-2", userId);
  // user.pageview("/").send();
}

export { activateUser };
