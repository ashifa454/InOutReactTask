import React,{Component} from 'react';
import {Header,Segment,List,Input,Icon,Grid,Button,Dropdown} from 'semantic-ui-react';
import {SortableContainer,
    SortableElement,
   arrayMove} from 'react-sortable-hoc';
import {HttpCall,HttpGETCall} from '../Api';
const SortableItem = SortableElement(({value}) =>
                    <List.Item style={{padding:'3px'}}>
                            <Input 
                                label={{content:value.priority}}
                                labelPosition='left'
                                disabled={(value.name==='')?true:false}
                                icon={value.name.length>1?<Icon circular onClick={()=>{
                                
                                }} inverted link name="delete" />:('')}
                                placeholder={"Add Skill"}
                                onChange={(text)=>{
                                    value.name=text
                                }}
                                value={value.name}
                                fluid 
                                />
                        </List.Item>
);
const SortableList = SortableContainer(({items}) => {
    return (
        <ul style={{padding:'10px'}}>
{        items.map((value, index) => (
          <SortableItem key={`item-${index}`} disabled={value.name===""} index={index} value={value} />
        ))
}
        </ul>
    );
  }); 
class AddSkill extends Component{
    state = {
        possibleSkills:[],
        items: [{
            name:'',
            priority:1},{
                name:'',
                priority:2},{
                    name:'',
                    priority:3},{
                        name:'',
                        priority:4},{
                            name:'',
                            priority:5},{
                                name:'',
                                priority:6},{
                                    name:'',
                                    priority:7},{
                                        name:'',
                                        priority:8},{
                                            name:'',
                                            priority:9},{
                                                name:'',
                                                priority:10}],
      };
      onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
          items: arrayMove(this.state.items, oldIndex, newIndex),
        },()=>{
            console.log(oldIndex,newIndex);
        });
      };
      componentWillMount(){
        HttpGETCall('https://test.hackinout.co/api/skills','GET',sessionStorage.getItem('access_token'),(response)=>{
        var tempRes=[]
        response.map((item,index)=>{
            tempRes.push({
                key:index,
                value:item.uuid,
                text:item.name
            })
        });
        this.setState({
                possibleSkills:tempRes
            })
          });
      }
      _handleSuggestion=(value)=>{
        var tempItem=this.state.items;
        for(var i=0;i<tempItem.length;i++){
            if(tempItem[i].name===''){
                tempItem[i].name=value.name;
                tempItem[i].uuid=value.uuid
                break;
            }
        }
        this.setState({
                items:tempItem})    
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
                    <SortableList lockAxis="y" items={this.state.items} onSortEnd={this.onSortEnd} />
                </List>
                </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <Segment secondary>
                        <Header size='tiny'>Suggestions</Header>
                        <Dropdown
                        deburr
                        fluid
                        multiple
                        options={this.state.possibleSkills}
                        placeholder='Try to search for "Java"'
                        search
                        selection
                        />
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