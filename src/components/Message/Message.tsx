import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/esm/Modal'
import { connect } from 'react-redux'
import { close_message_action } from '../../actions'
import { IState } from '../../redux/store'

interface MessageProps {
    show: boolean,
    close_message(): void,
    msg: string | null
}

class _Message extends React.Component<MessageProps> {
    render() {
        const { show, msg } = this.props
        return (
            <Modal onHide={this.handleClose} show={show}>
                <Modal.Body>
                    <p>{msg}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose} variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    handleClose = () => {
        const { close_message } = this.props;
        close_message();
    }

}

const mapStateToProps = (state: IState) => ({
    show: state.show,
    msg: state.msg
})

const mapDispatchToProps = {
    close_message: close_message_action
}

export const Message = connect(mapStateToProps, mapDispatchToProps)(_Message)