import {gql} from 'apollo-boost';

const getAuthorsQuery = gql`
{
authors{
    name
    id
}
}`

const getDialogueQuery = gql`
{
dialogues{
    name
    id
}
}`

const addDialogueMutation = gql`
mutation($name:String!, $genre:String!, $authorid:String!){
  addDialogue(name:$name, genre:$genre, authorid:$authorid){
    name
    id
  }
}
`

export { getDialogueQuery, getAuthorsQuery, addDialogueMutation};
