import { computed, observable, action, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activities';
import agent from '../api/agent';

configure({enforceActions: 'always'})

class ActivityStore{
    /*observables*/ 
    @observable activityRegistry = new Map();
    @observable activities : Array<IActivity> = [];
    @observable selectedActivity : IActivity | undefined;
    @observable loadingPage : boolean = false;
    @observable editMode : boolean = false;
    @observable submitting : boolean = false;
    @observable target : string = '';

    /*computed*/
    @computed get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort( 
            (x,y) => Date.parse(x.date) - Date.parse(y.date)
        );
    }

    /*actions*/
    @action loadActivities = () =>{
        this.loadingPage = true;
        
        agent.Activities.list()
        .then( (activities : Array<IActivity>) => {
            runInAction(()=> {
            activities.forEach( (activity : IActivity) => {
                activity.date = activity.date.split('.')[0];
                this.activityRegistry.set(activity.id, activity);
            })
        })
        })
        .catch( err => { console.log(err + ' error getting api values') })
        .finally(()=> runInAction(()=> {this.loadingPage = false }))
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
    }

    @action createActivity = ( activity : IActivity) => {
        this.submitting= true;

        agent.Activities.create(activity)
        .then(() => {
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = this.activityRegistry.get(activity.id);
            this.editMode = false;
        })
        .catch((err)=> console.log(err))
        .finally(() => this.submitting= false);
    }

    @action editActivity = (activity : IActivity) => {
        this.submitting = true;
        agent.Activities.update(activity).then(() => {
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
        })
        .catch((err) => console.log(err))
        .finally(()=>  this.submitting = false);
    }

    @action deleteActivity = (e : SyntheticEvent<HTMLButtonElement>, id : string) => {
        this.submitting =true;
        this.target = e.currentTarget.name;

        agent.Activities.delete(id).then(() => {
            this.activityRegistry.delete(id);
        }).then(()=> this.submitting = false);

    }

    @action openCreateForm = () =>{
        this.editMode = true;
        this.selectedActivity = undefined;
    }

    @action cancelSelectedActivity = () => {
        this.editMode = false;
        this.selectedActivity = undefined;
    }

    @action openEditForm = (id: string) => {
        this.editMode = true;
        this.selectedActivity = this.activityRegistry.get(id);
    }

};

export default createContext(new ActivityStore());