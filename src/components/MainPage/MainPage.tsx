import React, { ChangeEvent } from 'react'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { connect } from 'react-redux'
import { IContact } from '../../../../server/src/interfaces'
import { clean_search_action, get_contact_list_action, search_action } from '../../actions'
import { IState } from '../../redux/store'
import { Contact } from '../Contact/Contact'
import { Message } from '../Message/Message';
import { ModalComponent } from '../Modal/Modal'
import './MainPage.css'

interface MainPageProps {
    contacts_list: IContact[] | null,
    get_contacts_list(): void,
    start_search(word: string): void,
    search_result: IContact[] | null,
    clean_search(): void

}

class _MainPage extends React.Component<MainPageProps> {
    state = {
        word: '',
        onSearch: false
    }
    async componentDidMount() {
        const { get_contacts_list } = this.props;
        await get_contacts_list()
    }
    render() {
        const { contacts_list, search_result } = this.props;
        const { onSearch } = this.state
        return (
            <div id="content">
                <h3>CONTACTS MANAGER</h3>
                <Message />
                <ModalComponent />
                <InputGroup className="mb-3">
                    <FormControl
                        onChange={this.getDetails}
                        placeholder="enter contact name/last name"
                        aria-label="search"
                        name="word"
                        aria-describedby="basic-addon2"
                        value={this.state.word}
                    />
                    <InputGroup.Append>
                        {!onSearch ? <Button onClick={this.search} variant="outline-secondary">Search</Button> :
                            <Button onClick={this.cleanSearch} variant="outline-secondary">Clean search</Button>
                        }
                    </InputGroup.Append>
                </InputGroup>

                {search_result ? (search_result as IContact[]).map((contact) => {
                    return <Contact key={contact.id} {...contact} />
                }) : null}
                {contacts_list && !search_result ? (contacts_list as IContact[]).map((contact) => {
                    return <Contact key={contact.id} {...contact} />
                }) : null}
            </div>
        )
    }
    getDetails = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        this.setState({
            [key]: e.target.value
        });
    }

    search = () => {
        const { word } = this.state;
        const { start_search } = this.props;
        this.setState({
            onSearch: true
        })
        if (word === '') {
            this.setState({
                onSearch: false
            })
            return
        }

        start_search(word)
    }

    cleanSearch = () => {
        const { clean_search } = this.props;
        const { onSearch } = this.state;
        if (onSearch) {
            this.setState({
                onSearch: false,
                word: ''
            })
        }
        clean_search()
    }
}

const mapStateToProps = (state: IState) => ({
    contacts_list: state.contacts_list,
    search_result: state.search_result
})

const mapDiaptchToProps = {
    get_contacts_list: get_contact_list_action,
    start_search: search_action,
    clean_search: clean_search_action
}

export const MainPage = connect(mapStateToProps, mapDiaptchToProps)(_MainPage)