import React,{Component} from 'react';
import {Header,Segment,List,Input,Icon} from 'semantic-ui-react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
const SortableItem = SortableElement(({value}) =>
                    <List.Item>
                            <Input 
                            iconPosition="right"
                            icon={<Icon name='cancel' circular inverted link />}
                            placeholder={"Your "+value+" Skill"}
                            fluid 
                            />
                        </List.Item>
);
const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
{        items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={index} />
        ))
}
        </ul>
    );
  });
  
class AddSkill extends Component{
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'],
      };
      onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
          items: arrayMove(this.state.items, oldIndex, newIndex),
        });
      };
      
    render(){
        return (
            <div>
                <Header as='h3' color='black' textAlign='center'>
                    {' '} Hello {sessionStorage.getItem('first_name')}, enter the skills you are good at!
                </Header>
                <Segment stacked>
                <List>
                    <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
                </List>
                </Segment>
            </div>
        )
    }
}
export default AddSkill;