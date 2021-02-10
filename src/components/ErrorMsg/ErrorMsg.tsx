import React from 'react'
import { connect } from 'react-redux'
import { IState } from '../../redux/store'

interface ErrorMsgProps {
    msg: string | null
}

class _ErrorMsg extends React.Component<ErrorMsgProps>{
    render() {
        const { msg } = this.props
        return (
            <h6>{msg}</h6>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    msg: state.error_msg
})

export const ErrorMsg = connect(mapStateToProps)(_ErrorMsg)