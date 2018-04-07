import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Route,BrowserRouter,Redirect,Switch} from 'react-router-dom';
var isLoggedIn=()=>{
   return sessionStorage.getItem('access_key')?true:false
}
const Privateroute=({component:Component, ...props})=>(
    <Route {...props} render={
        props=>(
            isLoggedIn()?
            <App {...props} loginStaus={true}/>:(
                <App {...props} loginStaus={false}/>
            )
        )
    }/>
)
ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route component={App}/>
        <Privateroute exact path="/addnew/:tabSelect"/>
    </Switch>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
