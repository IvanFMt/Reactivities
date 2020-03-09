import { observable, computed, action, runInAction } from "mobx";
import { IUser, IuserFormValues } from "../models/user";
import { history } from '../../';
import agent from "../api/agent";
import { RootStore } from "./rootStore";

export default class UserStore{
    rootStore : RootStore;

    constructor(rootStore : RootStore){
        this.rootStore = rootStore
    }
    
    @observable user: IUser | null = null;

    @computed get isLoggedIn() { return !!this.user}

    @action login = async( values: IuserFormValues ) => {
        await agent.User.login(values)
            .then((response)=> {
                runInAction('logging in',()=>{
                    this.user = response;
                    history.push('/activities');
                })
            })
            .catch((err)=> {
                throw err;
            })

    } 
}