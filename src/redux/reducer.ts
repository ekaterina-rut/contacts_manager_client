import { IContact } from "../../../server/src/interfaces";
import { ActionType, getInitialState, IAction, IState } from "./store";


export const reducer = (state: IState = getInitialState(), action: IAction) => {
    switch (action.type) {
        case ActionType.GetContactList: {
            const { contacts_list, msg } = action.payload;
            const search_result = state.search_result?.slice();
            if (!search_result) {
                return {
                    ...state,
                    contacts_list: contacts_list,
                    error_msg: msg
                }
            }

            search_result.map((search, i) => {
                (contacts_list as IContact[])?.map(contact => {
                    if (contact.id === search.id) {
                        search_result[i] = contact
                    }
                })
            })

            return {
                ...state,
                contacts_list: contacts_list,
                search_result: search_result,
                msg: msg
            }
        }

        case ActionType.GetUpdates: {
            const { updates } = action.payload;
            return {
                ...state,
                updates: updates
            }
        }

        case ActionType.ShowMessage: {
            const { msg } = action.payload;
            return {
                ...state,
                msg: msg,
                show: true,
                search_result: null

            }
        }

        case ActionType.CloseMessage: {
            return {
                ...state,
                show: false
            }
        }


        case ActionType.ShowError: {
            const { msg } = action.payload;
            return {
                ...state,
                error_msg: msg,

            }
        }

        case ActionType.Search: {
            const { result, msg } = action.payload;
            return {
                ...state,
                search_result: result,
                msg: msg

            }
        }

        case ActionType.CleanSearch: {
            return {
                ...state,
                search_result: null
            }
        }

        default: {
            return state;
        }
    }
}