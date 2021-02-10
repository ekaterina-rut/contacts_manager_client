import React, { ChangeEvent, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { add_contact_action } from '../../actions';
import Col from 'react-bootstrap/esm/Col';
import { ErrorMsg } from '../ErrorMsg/ErrorMsg';

export interface NewContact {
    first_name: string,
    last_name: string,
    street: string,
    state: string,
    city: string,
    phone: string,
    email: string,
    postal_code: number,
}

interface ModalComponentProps {
    add_contact(contact: NewContact): void,
}


class _ModalComponent extends React.Component<ModalComponentProps> {
    state = {
        show: false,
        first_name: '',
        last_name: '',
        street: '',
        state: '',
        city: '',
        phone: '',
        email: '',
        postal_code: 0,
    }
    render() {
        const { show } = this.state
        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    add new contact
                 </Button>

                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ErrorMsg />

                        <Form onSubmit={this.onFormSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="first_name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control onChange={this.getDetails} name="first_name" type="text" placeholder="first name" required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="last_name">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control onChange={this.getDetails} name="last_name" type="text" placeholder="family name" required />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="phone">
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control onChange={this.getDetails} name="phone" type="text" placeholder="first phone" required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="last_name">
                                    <Form.Label>e-mail</Form.Label>
                                    <Form.Control onChange={this.getDetails} name="email" type="email" placeholder="e-mail" required />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="street">
                                <Form.Label>Address</Form.Label>
                                <Form.Control onChange={this.getDetails} name="street" type="text" placeholder="street" required />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="city" >
                                    <Form.Label>City</Form.Label>
                                    <Form.Control onChange={this.getDetails} name="city" type="text" placeholder="city" required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="state">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control onChange={this.getDetails} name="state" type="text" placeholder="state" required>

                                    </Form.Control >
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control onChange={this.getDetails} name="postal_code" type="number" placeholder="zip code" required />
                                </Form.Group>
                            </Form.Row>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                              </Button>
                                <Button type="submit" variant="primary">
                                    Save Changes
                             </Button>
                            </Modal.Footer>


                        </Form>

                    </Modal.Body>
                </Modal>
            </div>
        )
    }
    handleShow = () => {
        this.setState(
            { show: true }
        )
    }
    handleClose = () => {
        this.setState(
            { show: false }
        )
    }

    getDetails = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        this.setState({
            [key]: e.target.value
        });
    }

    onFormSubmit = async (e: FormEvent) => {
        e.preventDefault()
        console.log("form is submitted", this.state);
        const { add_contact } = this.props;
        const contact = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            phone: this.state.phone,
            email: this.state.email,
            postal_code: this.state.postal_code,
        }
        await add_contact(contact);  
    }

}

const mapDispatchToProps = {
    add_contact: add_contact_action,
}

export const ModalComponent = connect(undefined, mapDispatchToProps)(_ModalComponent)