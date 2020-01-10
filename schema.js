const graphql = require('graphql');
const _ = require('lodash')
const {GraphQLObjectType,
       GraphQLString,
       GraphQLID,
       GraphQLSchema,
       GraphQLInt,
       GraphQLList,
       GraphQLNonNull
      } = graphql;

const Dialogue = require('../models/dialogue');
const Author = require('../models/author');


//var dialogues = [
//    { name:'Hello Fraaaaannnndddsss, Chai Pilo', genre:'Insta', id:'1',authorid:'1'},
//    { name:'Pehle Nagarpalika ko bulaaao..... Bhai bhai bhai', genre:'Insta', id:'2',authorid:'2'},
//    { name:'Desh ki suraksha k liye hm apko aage aana hoga.', genre:'Insta', id:'3',authorid:'2'},
//    { name:'AAsmaan ki uchaaiyon me ghana Kohra Hai Chhaya!', genre:'FB', id:'4',authorid:'3'},
//    { name:'Bhai 200 - 300 zada le le pr land kra de!', genre:'FB', id:'5',authorid:'3'},
//
//]
//
//var authors = [
//    { name:'Chai wali aunty', age:44, id:'1'},
//    { name:'Nagar-palika Boy', age:30, id:'2'},
//    { name:'Para-gliding Boy', age:31, id:'3'},
//]

const DialogueType = new GraphQLObjectType({
    name: 'Dialogue',
    fields:() =>({
        id:{type: GraphQLID},
        name:{type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorid: {type : GraphQLID},
        author:{
            type: AuthorType,
            resolve(parent,args){
                console.log(parent);
                //return _.find(authors,{id: parent.authorid});
                return Author.findById(parent.authorid);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:() =>({
        id:{type: new GraphQLNonNull(GraphQLID)},
        name:{type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
        dialogue:{
            type: new GraphQLList(DialogueType),
            resolve(parent,args){
               // return _.filter(dialogues, {authorid:parent.id});
                return Dialogue.find({authorid: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        dialogue:{
            type: DialogueType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //return _.find(dialogues, {id :args.id});
                return Dialogue.findById(args.id);
            }
        },

        author:{
            type: AuthorType,
            args:{id: {type: GraphQLID}},
            resolve(parent,args){
                //return _.find(authors, {id : args.id});
                return Author.findById(args.id);
            }
        },

        dialogues:{
            type: new GraphQLList(DialogueType),
            resolve(parent,args){
                //return dialogues;
                return Dialogue.find({});
            }
        },

        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                age:{type: new GraphQLNonNull(GraphQLInt)}
            },

            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age: args.age
                });
                return author.save();
            }
        },

        addDialogue:{
            type:DialogueType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorid: {type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let dialogue = new Dialogue({
                    name:args.name,
                    genre: args.genre,
                    authorid:args.authorid
                });
                return dialogue.save();
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
});
