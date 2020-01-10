import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

//components
import DialogueList from './component/DialogueList';
import AddDialogue from './component/AddDialogue';


//appollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

class App extends Component {
    render(){
        return (
                <ApolloProvider client={client}>
            
                    <div id="main">
            
                            <h1>Ninja Hattori</h1>
                            <DialogueList />
                            <AddDialogue/>
            
                    </div>
            
                </ApolloProvider>
                );
            }
}                   

export default App;
