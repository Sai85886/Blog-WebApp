import React from 'react';
import Header from './components/Header';
import Home from './components/Home/Home';
import {Box} from '@material-ui/core';
import DetailView from './components/Post/DetailView';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import CreateView from './components/Post/CreateView';
import UpdateView from './components/Post/UpdateView';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Box style={{marginTop:64}}>
      <Switch>
           <Route exact path='/' component={Home}/>
           <Route path='/details/:id' component={DetailView}/>
           <Route path='/create' component={CreateView}/>
           <Route path='/update/:id' component={UpdateView}/>
      </Switch>
      </Box>
      
    </BrowserRouter>
  );
}

export default App;
