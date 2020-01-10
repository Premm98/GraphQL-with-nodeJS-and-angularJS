import React, {Component} from 'react';
import {getAuthorsQuery, addDialogueMutation, getDialogueQuery} from '../queries/queries';
import {graphql} from 'react-apollo';
import compose from 'lodash.flowright';

class AddDialogue extends Component
{

  constructor(props){
    super(props);
    this.state = {
      name:"",
      genre:"",
      authorid:""
    };
  }
    displayAuthors()
    {
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return(
                <option disabled>Loading Authors...</option>
            );
        }
        else
        {
            return data.authors.map(author =>{
                   return(
                    <option key= {author.id} value = {author.id}>{author.name}</option>
                            );
                   })
        }
    }
submitForm(e){
  e.preventDefault();
  this.props.addDialogueMutation({
    variables: {
      name:this.state.name,
      genre:this.state.genre,
      authorid:this.state.authorid
    },
    refetchQueries:[{query: getDialogueQuery}]
  })
}
    render()
    {
        return(
            <form id = "add-dialogue" onSubmit = {this.submitForm.bind(this)}>

                <div className = 'field'>
                    <label>Dialogue </label>
                    <input type = 'text' onChange={(e)=>this.setState({name:e.target.value})}/>
                </div>

                <div className = 'field'>
                    <label>Genre:  </label>
                    <input type = 'text' onChange={(e)=>this.setState({genre:e.target.value})}/>
                </div>

                <div className = 'field'>
                    <label>Author : </label>
                    <select onChange={(e)=>this.setState({authorid:e.target.value})}>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button> + </button>

            </form>

        );
    }
}

export default compose(
  graphql(addDialogueMutation,{name : 'addDialogueMutation'}),
  graphql(getAuthorsQuery, {name:'getAuthorsQuery'})
)(AddDialogue);
