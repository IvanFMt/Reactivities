import ActivityStore from "./ActivityStore";
import UserStore from "./UserStore";
import { createContext } from "react";
import { configure } from "mobx";

configure({enforceActions: 'always'})

export class RootStore {
    activityStore : ActivityStore;
    userStore : UserStore;

    constructor(){
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore()); 