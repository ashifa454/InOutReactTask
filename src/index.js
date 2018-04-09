import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Route,BrowserRouter,Switch} from 'react-router-dom';
var isLoggedIn=()=>{
   return sessionStorage.getItem('access_token')?true:false
}
const Privateroute=({component:Component, ...props})=>(
    <Route {...props} render={
        props=>(
            isLoggedIn()?
            <App {...props} loginStaus={true} profileStatus={1}/>:(
                <App {...props} loginStaus={false}/>
            )
        )
    }/>
)
ReactDOM.render(<BrowserRouter basename="/InOutReactTask">
    <Switch>
        <Privateroute exact path="/additem/:tabSelect"/>
        <Route component={App}/>
    </Switch>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
