import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Route,BrowserRouter,Redirect,Switch} from 'react-router-dom';
var isLoggedIn=()=>{
   return sessionStorage.getItem('access_key')?true:false
}
const Privateroute=({component:Component, ...restProps})=>(
    <Route {...restProps} render={
        props=>(
            isLoggedIn()?
            <App {...restProps}/>:(
                <App {...restProps}/>
            )
        )
    }/>
)
ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route exact path="/" component={App}/>
        <Privateroute path="/addnew/:tabSelect"/>
    </Switch>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
