import React, { ChangeEvent, FormEvent } from 'react'
// import {  Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'
import { IContact } from '../../../../server/src/interfaces'
import { delete_contact_action, update_contact_action } from '../../actions'
import './Contact.css'
import moment from 'moment';


interface ContactProps {
    id: number,
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    street: string,
    city: string,
    state: string,
    postal_code: number,
    date_update: string | null,
    delete_contact(id: number): void,
    update_contact(contact: IContact): void,
    total_updates: number


}


class _Contact extends React.Component<ContactProps> {
    state = {
        update_mode: false,
    }
    render() {
        const {total_updates, id, first_name, last_name, street, city, state, postal_code, phone, email, date_update } = this.props;
        const { update_mode } = this.state
        if (first_name === '') { return }
        const first_name_display = CapitalCase(first_name);
        const last_name_display = CapitalCase(last_name);
        const street_display = CapitalCase(street);
        const city_display = CapitalCase(city);
        const state_display = CapitalCase(state);


        return (
            <div id="main_page">
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={`${id}`}>
                            <div>
                                {last_name_display} {first_name_display}
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={`${id}`}>
                            <Card.Body>
                                <h6>Adress</h6>
                                {
                                    update_mode ?
                                        <div>
                                            <form onSubmit={this.onFormSubmit}>
                                                <p><input name="first_name" type="text" placeholder="first name" defaultValue={first_name_display} onChange={this.getDetails} /> </p>
                                                <p><input name="last_name" type="text" placeholder="last_name" defaultValue={last_name_display} onChange={this.getDetails} /></p>
                                                <p><input name="street" type="text" placeholder="street" defaultValue={street_display} onChange={this.getDetails} /> </p>
                                                <p><input name="city" type="text" placeholder="city" defaultValue={city_display} onChange={this.getDetails} /></p>                                             <p>
                                                    <input name="state" placeholder="state" type="text" defaultValue={state_display} onChange={this.getDetails} />
                                                    <input name="postal_code" type="number" placeholder="zip code" defaultValue={postal_code} onChange={this.getDetails} />
                                                </p>
                                                <p><input name="email" type="email" placeholder="email" defaultValue={email} onChange={this.getDetails} /></p>
                                                <p> <input name="phone" type="text" placeholder="phone" defaultValue={phone} onChange={this.getDetails} /> </p>
                                                <span className="buttons">
                                                    <ButtonGroup className="mb-2 ">
                                                        <Button type="submit"  >save</Button>
                                                        {/* <Button type="submit" onClick={this.saveClick}>save</Button> : <Button onClick={this.setUpdateMode}>edit</Button>} */}
                                                        <Button onClick={this.deleteContact}>delete</Button>
                                                    </ButtonGroup>
                                                </span>
                                            </form>
                                            <div>
                                                <p>last update: {date_update}</p>
                                                <p>total: {total_updates} </p>
                                            </div>
                                        </div> :
                                        <div>
                                            <p>{street_display}</p>
                                            <p>{city_display}</p>
                                            <p>{state_display} {postal_code}</p>
                                            <p>{email}</p>
                                            <p>{phone}</p>
                                            <span className="buttons">
                                                <ButtonGroup className="mb-2 ">
                                                    <Button type="button" onClick={this.setUpdateMode}>edit</Button>

                                                    <Button onClick={this.deleteContact}>delete</Button>
                                                </ButtonGroup>
                                            </span>
                                        </div>
                                }

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                </Accordion>
            </div>
        )
    }

    deleteContact = () => {
        const { delete_contact, id } = this.props;
        delete_contact(id)
    }

    setUpdateMode = () => {
        const { update_mode } = this.state;
        if (update_mode) {
            this.setState({
                update_mode: false
            })
        }
        if (!update_mode) {
            this.setState({
                update_mode: true
            })
        }
    }

    getDetails = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        this.setState({
            [key]: e.target.value
        });
    }

    onFormSubmit = async (e: any) => {
        e.preventDefault()
        const form = e.target;
        const { update_contact , total_updates} = this.props;
        const formatedDate = moment(new Date()).format('DD-MM-YYYY');
        const contact: IContact = {
            id: this.props.id,
            first_name: form.first_name.value,
            last_name: form.last_name.value,
            street: form.street.value,
            city: form.city.value,
            state: form.state.value,
            phone: form.phone.value,
            email: form.email.value,
            postal_code: form.postal_code.value,
            date_update: formatedDate,
            total_updates: total_updates
        }
        await update_contact(contact);
        this.setUpdateMode();
    }
}

const mapDispatchToProps = {
    delete_contact: delete_contact_action,
    update_contact: update_contact_action
}

export const Contact = connect(undefined, mapDispatchToProps)(_Contact)

function CapitalCase(word: string): string {
    const wordArray = word.split("");
    const first_letter = wordArray[0].toLocaleUpperCase();
    wordArray[0] = first_letter;
    const new_word = wordArray.join("");
    return new_word

}