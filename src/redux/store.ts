import { createStore as createReduxStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer } from './reducer'
import { IContact, IUpdate } from './../../../server/src/interfaces'



export interface IState {
    contacts_list: IContact[] | null;
    msg: string | null;
    error_msg: string | null;
    updates: IUpdate[] | null;
    search_result: IContact[] | null;
    show: boolean

}

export interface IAction {
    type: ActionType;
    payload: Record<string, any>;
}

export enum ActionType {
    GetContactList = 'GET_CONTACTS_LIST',
    UpdateContact = 'UNPDATE_CONTACT',
    DeleteContact = 'DELETE_CONTACT',
    AddNewContact = 'ADD_NEW_CONTACT',
    Search = 'SEARCH',
    ShowError = 'SHOW_ERROR',
    GetUpdates = 'GET_UPDATES',
    ShowMessage = 'SHOW_MESSAGE',
    CleanSearch = 'CLEAN_SEARCH',
    CloseMessage = 'CLOSE_MESSAGE'
}

export const getInitialState = (): IState => {
    return {
        contacts_list: null,
        msg: null,
        error_msg: null,
        updates: null,
        search_result: null,
        show: false

    };
}




export function createStore() {
    const logger = createLogger();
    const middleware = composeWithDevTools(applyMiddleware(logger, thunk));
    return createReduxStore(reducer, middleware)
}