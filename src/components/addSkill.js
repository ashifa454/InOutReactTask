import React,{Component} from 'react';
import {Header,Segment,List,Input,Icon,Grid,Button,Dropdown,Form,Label} from 'semantic-ui-react';
import {SortableContainer,
    SortableElement,SortableHandle,
   arrayMove} from 'react-sortable-hoc';
import {HttpGETCall,HttpCall} from '../Api';
const DragHandle = SortableHandle(({index}) => <Label>
    <Icon name='sort' /> {index}
</Label>);
class AddSkill extends Component{
    state = {
        possibleSkills:[],
        k:0,
        lastKey:1,
        skills:[
            {
                name:'',
                priority:1,
                key:0,
                disabled:false
            }
        ],
      };
      onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
          skills: arrayMove(this.state.skills, oldIndex, newIndex),
        },()=>{
            var tempItem=this.state.skills;
            tempItem[newIndex].uuid=null;
            tempItem[newIndex].priority=newIndex
            tempItem[oldIndex].uuid=null;
            tempItem[oldIndex].priority=oldIndex
            this.setState({
                skills:tempItem
            },()=>{
                console.log(this.state.skills)
            })
        });
      };
      componentWillMount(){
        HttpGETCall('https://test.hackinout.co/api/skills','GET',sessionStorage.getItem('access_token'),(response)=>{
        var tempRes=[];
        response.map((item,index)=>{
            tempRes.push({
                key:index,
                value:item.name,
                text:item.name
            })
        });
        HttpGETCall('https://test.hackinout.co/api/users/johndoe/skills','GET',sessionStorage.getItem('access_token'),(response)=>{
            if(response.length>0){
                response.sort((a,b)=>parseInt(a.priority)-parseInt(b.priority))
                response.map((item,index)=>{
                    item.key=item.uuid
                })
                response.push({
                    name:'',
                    key:this.state.lastKey,
                    priority:undefined,
                    disabled:false

                })
                this.setState({
                    skills:response,
                    lastKey:this.state.lastKey+1
                })

            }
        });
        this.setState({
                possibleSkills:tempRes
            })
          });
      }
      _handleSuggestion=(e, { value })=>{
        var tempItem=this.state.skills;
        for(var i=0;i<tempItem.length;i++){
            if((tempItem[i].name===''&&!tempItem[i+1])){
                tempItem[i].name=value[this.state.k];
                tempItem.push({
                    name:'',
                    key:this.state.lastKey,
                    disabled:false,
                    priority:i+1
                })
                this.setState({
                    k:this.state.k+1,
                    lastKey:this.state.lastKey+1
                })                
                break;
            }
        }
        this.setState({
                skills:tempItem})  
      }
      handleChange = (e, { name, value }) =>{
        let skills=this.state.skills;
        skills[name].name=value;
        skills[name].priority=name;
        if(skills[name].name.length>0&&!skills[name+1]){
            skills.push({
                name:'',
                key:this.state.lastKey,                
                disabled:false,
                priority:name+1
            })
        }
        this.setState({
            skills,
            lastKey:this.state.lastKey+1
        })
    }
    constructor(){
        super();
    }
    render(){
        const {skills}=this.state;
    
        var SortableItem = SortableElement(({dataIndex}) =>
        <List.Item
         style={{padding:'3px'}}>
         <div>
            <Input 
                label={<DragHandle index={(dataIndex+1)}/>}
                labelPosition='left'
                disabled={this.state.skills[dataIndex].disabled}
                name={dataIndex}
                icon={this.state.skills[dataIndex].name.length>0&&!this.state.skills[dataIndex].uuid?<Icon circular onClick={(e,data)=>{
                    HttpCall('https://test.hackinout.co/api/users/'+sessionStorage.getItem('username')+'/skills','POST',{
                        skills:[{
                        name:this.state.skills[dataIndex].name,
                        priority:this.state.skills[dataIndex].priority
                    }]},sessionStorage.getItem('access_token'),(response)=>{
                        var tempItems=this.state.skills;
                        response[0].disabled=true;
                        tempItems[dataIndex]=response[0];
                        this.setState({
                            skills:tempItems
                        })
                    });
                }} inverted link name="checkmark" />:(this.state.skills[dataIndex].uuid)?<Icon circular onClick={()=>{
                    HttpGETCall('https://test.hackinout.co/api/users/'+sessionStorage.getItem('username')+'/skills/'+this.state.skills[dataIndex].uuid,'DELETE',sessionStorage.getItem('access_token'),(response)=>{
                        var tempItems=this.state.skills;
                        tempItems.splice(dataIndex,1);
                        this.setState({
                            skills:tempItems
                        })
                    })
                }} inverted link name="delete" />:<Icon circular onClick={()=>{
                    
                }} inverted link name="pencil" />}
                placeholder={"Add skills"}                    
                fluid 
                value={skills[dataIndex].name}
                onChange={this.handleChange.bind(this)}
                >
                </Input>
                </div>
        </List.Item>);
        var SortableList = SortableContainer(() => {
                return (
                        <ul style={{padding:'10px'}}>
                        {        
                        this.state.skills.map((value, index) => (
                            <SortableItem   
                                            disabled={value.name.length<1} 
                                            index={index} 
                                            key={'list_'+`${value.key}`}
                                            dataIndex={index} 
                                            data={this.state.skills}
                                            updateProps={this.handleChange} />
                        ))
                        }
                        </ul>
                        );
            }); 
        return (
            <div>
                <Header as='h3' color='black' textAlign='center'>
                    {' '} Hello {sessionStorage.getItem('first_name')}, enter the skillss you are good at!
                </Header>
                <Grid columns={2}>
                    <Grid.Column width={10}>
                    <Segment stacked>
                <List>
                    <SortableList lockAxis="y" onSortEnd={this.onSortEnd} useDragHandle={true} />
                </List>
                </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <Segment secondary>
                        <Header size='tiny'>Suggestions</Header>
                        <Dropdown
                        fluid
                        multiple
                        open
                        onChange={this._handleSuggestion.bind(this)}
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