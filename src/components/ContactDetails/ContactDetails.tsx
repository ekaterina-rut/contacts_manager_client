import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'
import { get_contact_list_action } from '../../actions'

interface ContactDetailsProps {
    get_contacts_list(): void
}

class _ContactDetails extends React.Component<ContactDetailsProps> {
    async componentDidMount() {
        const { get_contacts_list } = this.props;
        await get_contacts_list()
    }
    render() {
        return (
            <Accordion.Collapse eventKey="0">
                <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
        )
    }
}

const mapDiaptchToProps = {
    get_contacts_list: get_contact_list_action
}

export const ContactDetails = connect(undefined, mapDiaptchToProps)(_ContactDetails)