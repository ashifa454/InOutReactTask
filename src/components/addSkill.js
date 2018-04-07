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
                            >
                            </Input>
                        </List.Item>
);
const SortableList = SortableContainer(({items}) => {
    return (
        <ul style={{padding:'10px'}}>
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
                            <List.Item>
                            <List.Icon name='add' />
      <List.Content>
        <List.Header>Java</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
    <List.Icon name='add' />
      <List.Content>
        <List.Header>Node.js</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
    <List.Icon name='add' />
      <List.Content>
        <List.Header>React.js</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
    <List.Icon name='add' />
      <List.Content>
        <List.Header>.NET</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
    <List.Icon name='add' />
      <List.Content>
        <List.Header>Angular.js</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
    <List.Icon name='add' />
      <List.Content>
        <List.Header>Android</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
    <List.Icon name='add' />
      <List.Content>
        <List.Header>UI Design</List.Header>
      </List.Content>
    </List.Item>
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