import React,{Component} from 'react';
import {Header,Segment,List,Input,Icon,Grid,Button} from 'semantic-ui-react';
import {SortableContainer,
    SortableElement,
    SortableHandle,
   arrayMove} from 'react-sortable-hoc';
const DragHandle = SortableHandle(() => <Icon name='hand paper' />);
const SortableItem = SortableElement(({value}) =>
                    <List.Item style={{padding:'3px'}}>
                            <Input 
                            iconPosition="right"
                            icon={<Icon name='sort' circular inverted link />}
                            placeholder={"Your "+(value+1)+" Skill"}
                            fluid 
                            value={value.name}
                            >
                            </Input>
                        </List.Item>
);
const SortableList = SortableContainer(({items}) => {
    return (
        <ul style={{padding:'10px'}}>
{        items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={{
              name:value,
              priority:index
              }} />
        ))
}
        </ul>
    );
  });
  
class AddSkill extends Component{
    state = {
        items: [{
            name:'Javascript',
            priority:1
        }],
      };
      onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
          items: arrayMove(this.state.items, oldIndex, newIndex),
        });
      };
      _handleSuggestion=(value)=>{
        var tempItem=this.state.items;
        if(tempItem.indexOf(value)<0){
            tempItem.push(value);
            this.setState({
                items:tempItem
            })    
        }else{
            tempItem.splice(tempItem.indexOf(value),1);
            this.setState({
                items:tempItem
            })
        }
      }
    render(){
        return (
            <div>
                <Header as='h3' color='black' textAlign='center'>
                    {' '} Hello {sessionStorage.getItem('first_name')}, enter the skills you are good at!
                </Header>
                <Grid columns={2}>
                    <Grid.Column width={10}>
                    <Segment stacked>
                <List>
                    <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
                </List>
                </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <Segment secondary>
                        <Header size='tiny'>Suggestions</Header>
                        <List selection verticalAlign='middle'>
                            {
                                ['Java','Node.js','React.js','.NET','Angular.js','Android','UI Design'].map((item,index)=>{
                                    return (
                                        <List.Item onClick={()=>this._handleSuggestion(item)}>
                                        <List.Icon name='add' />
                                            <List.Content>
                                                <List.Header>{item}</List.Header>
                                            </List.Content>
                                        </List.Item>
                                    )
                                })
                            }
                        </List>
                    </Segment>
                    </Grid.Column>
                </Grid>
            <Grid centered>
                <Grid.Column width={10}>
                <Button primary fluid>Finish</Button>

                </Grid.Column>
            </Grid>
            </div>
        )
    }
}
export default AddSkill;