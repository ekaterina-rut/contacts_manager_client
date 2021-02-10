import axios from "axios";
import { Dispatch } from "redux";
import { IContact } from "../../server/src/interfaces";
import { NewContact } from "./components/Modal/Modal";
import { ActionType, IAction } from "./redux/store";

const URL = 'https://ekaterinarut78-001-site1.btempurl.com'
// const URL = 'https://ekaterinarut78-001-site1.btempurl.com:8172/MsDeploy.axd?site=ekaterinarut78-001-site1'


export function get_contact_list_action() {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            const result = await axios.get<any>(`${URL}/contacts_list`);
            if (!result.data.response) {
                return dispatch({
                    type: ActionType.GetContactList,
                    payload: {
                        contacts_list: null,
                        msg: result.data.response.msg
                    }
                })
            }
            const contacts_list = result.data.contacts_list;
            const msg = result.data.msg;

            return dispatch({
                type: ActionType.GetContactList,
                payload: {
                    contacts_list: contacts_list,
                    msg: msg
                }
            })


        }
        catch (err) {
            return dispatch({
                type: ActionType.ShowError,
                payload: {
                    msg: err
                }
            })
        }
    }
}

export function update_contact_action(updated_contact: IContact) {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            const adress = `${updated_contact.city} city ${updated_contact.street} st ${updated_contact.street} $`
            const isAdressValid = await validate_adress_action(adress, updated_contact);
            const valid_answer = []
            if (!isAdressValid.status) {
                if (!isAdressValid.street) {
                    valid_answer.push('street')
                }
                if (!isAdressValid.city) {
                    valid_answer.push('city')
                }
                if (!isAdressValid.state) {
                    valid_answer.push('state')
                }

                const mistakes = valid_answer.toString();
                const msg = `${mistakes}  invalid`

                return dispatch({
                    type: ActionType.ShowMessage,
                    payload: {
                        msg: msg
                    }
                })
            }

            const result = await axios.post<any>(`${URL}/update_contact`, { updated_contact });
            const response = result.data.response;
            const msg = result.data.msg;
            if (!response) {
                return dispatch({
                    type: ActionType.ShowMessage,
                    payload: {
                        msg: msg
                    }
                })
            }

            dispatch({
                type: ActionType.GetContactList,
                payload: {
                    contacts_list: result.data.contacts_list,
                    msg: msg
                }
            })

        }
        catch (err) {

        }
    }
}

export function add_contact_action(contact: NewContact) {
    return async (dispatch: Dispatch<IAction>) => {
        try {

            const adress = `${contact.city} city ${contact.street} st ${contact.street} $`
            const isAdressValid = await validate_adress_action(adress, contact);
            const valid_answer = []
            if (!isAdressValid.status) {
                if (!isAdressValid.street) {
                    valid_answer.push('street')
                }
                if (!isAdressValid.city) {
                    valid_answer.push('city')
                }
                if (!isAdressValid.state) {
                    valid_answer.push('state')
                }

                const mistakes = valid_answer.toString();
                const msg = `${mistakes}  invalid`

                return dispatch({
                    type: ActionType.ShowError,
                    payload: {
                        msg: msg
                    }
                })

            }

            const result = await axios.post<any>(`${URL}/add_new_contact`, { contact });
            const response = result.data.response;
            if (!response) {
                return dispatch({
                    type: ActionType.ShowError,
                    payload: {
                        msg: result.data.msg
                    }
                })
            }

            return dispatch({
                type: ActionType.GetContactList,
                payload: {
                    contacts_list: result.data.contacts_list,
                    msg: result.data.msg,
                }
            })
        }
        catch (err) {
            return dispatch({
                type: ActionType.ShowError,
                payload: {
                    msg: err
                }
            })
        }
    }

}

export function delete_contact_action(id: number) {
    return async (dispatch: Dispatch<IAction>) => {
        try {
            const response = await axios.delete<any>(`${URL}/delete_contact/${id}`);

            if (!response.data.response) {
                return dispatch({
                    type: ActionType.ShowError,
                    payload: {
                        msg: response.data.msg
                    }
                })
            }

            dispatch({
                type: ActionType.GetContactList,
                payload: {
                    contacts_list: response.data.contact_list,
                    msg: response.data.msg
                }
            })
        }
        catch (err) {
        }
    }
}

export function get_updates_action() {
    return async (dispatch: Dispatch<IAction>) => {
        const response = await axios.get<any>(`${URL}/get_updates`);
        return dispatch({
            type: ActionType.GetUpdates,
            payload: {
                updates: response.data.updates
            }
        })
    }
}

export function search_action(word: string) {
    return async (dispatch: Dispatch<IAction>) => {
        const response = await axios.post<any>(`${URL}/search`, { word });
        if (!response.data.response) {
            return dispatch({
                type: ActionType.ShowMessage,
                payload: {
                    msg: response.data.msg
                }
            })
        }
        const msg = () => {
            if (response.data.result.length = 1) {
                const msg = 'there is one contact matching to your search'
                return msg
            } else {
                const msg = `there are ${response.data.result.length} contacts matching for your seartch`
                return msg
            }
        }
        return dispatch({
            type: ActionType.Search,
            payload: {
                result: response.data.result,
                msg: msg
            }
        })
    }
}

export function clean_search_action() {
    return async (dispatch: Dispatch<IAction>) => {
        return dispatch({
            type: ActionType.CleanSearch,
            payload: {}
        })
    }
}
export function close_message_action() {
    return async (dispatch: Dispatch<IAction>) => {
        return dispatch({
            type: ActionType.CloseMessage,
            payload: {}
        })
    }
}

export async function validate_adress_action(adress: string, contact: IContact | NewContact) {

    const adressValidation = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${adress}&key=AIzaSyB_-Nl4TB9Z4ihCq-mbVwZ6lsk4ZdIM5DU`);
    const adress_components = adressValidation.data.results[0].address_components;
    const adress_from_google: { street: string, city: string, state: string } = {
        street: '',
        city: '',
        state: ''
    };
    (adress_components as any[]).map(
        (adress_component, i) => {
            if (adress_component.types.includes('route')) {
                adress_from_google.street = adress_component.long_name;
            }
            if (adress_component.types.includes('locality')) {
                adress_from_google.city = adress_component.long_name;
            }
            if (adress_component.types.includes('country')) {
                adress_from_google.state = adress_component.long_name;
            }
        }

    )
    const street_valid = adress_from_google.street.toLowerCase().split(' ').join('').match(contact.street.toLowerCase().split(' ').join(''));
    const city_valid = adress_from_google.city.toLowerCase().split(' ').join('').match(contact.city.toLowerCase().split(' ').join(''));
    const state_valid = adress_from_google.state.toLowerCase().split(' ').join('').match(contact.state.toLowerCase().split(' ').join(''));

    if (!street_valid || !city_valid || !state_valid) {
        const status = { status: false, street: street_valid, city: city_valid, state: state_valid }
        return status
    } else {
        const status = { status: true, street: street_valid, city: city_valid, state: state_valid }


        return status
    }


}


