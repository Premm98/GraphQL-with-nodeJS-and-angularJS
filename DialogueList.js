import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getDialogueQuery} from '../queries/queries';

class DialogueList extends Component
{
    displayDialogues(){
        var data = this.props.data;

        if(data.loading)
        {
            return(<div>Loading Dialogues....</div>);
        }

        else
        {
            return data.dialogues.map(dialogue =>{
                   return(
                    <li key={dialogue.id}>{dialogue.name}</li>
                            );
                   })
        }
    }
    render()
    {
        return(
            <div>
                <ul  id="dialogue-list">
                    {this.displayDialogues()}
                </ul>
            </div>
              );
    }
}

export default graphql(getDialogueQuery)(DialogueList);
