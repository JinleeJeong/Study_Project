import React, { Component } from 'react';
import {BrowserRouter, Route, } from 'react-router-dom';
import SignUpPage from './components/Signup/SignUpPage';
import SignInPage from './components/SignIn/SignInPage';
import MyMessagePage from './components/MyMessage/MyMessagePage';
import MyPage from './components/MyPage/MyPage';
import Template from './components/UIElements/Template';
import TopAppBar from './components/UIElements/TopAppBar/TopAppBar';
import ContentsController from './components/contents/ContentsController';
import ContentsListView from './components/contents/ContentsListView';
import NearContentsListView from './components/contents/NearContentsListView';
import Footer from './components/UIElements/Footer';
import CateGory from './components/category/CateGory';
import Detail from './components/contents/Detail';
import AppContextProvider from './contexts/appContext';
import CustomSnackbar from './components/UIElements/CustomSnackbar';
import Study from './components/study/study';
class App extends Component {

  render() {
    return (
      <>
        <AppContextProvider>
          <BrowserRouter>
            <div className="App">
              <CustomSnackbar/>
              <TopAppBar />
              <Route exact path="/" component={Template} />
              <Route path="/write" component={ContentsController} />
              <Route path="/contents" component={ContentsListView} />
              <Route path="/near" component={NearContentsListView} />

              <Route path="/signup" component = {SignUpPage}/>
              <Route path="/signin" component = {SignInPage}/>
              <Route path="/mypage" component = {MyPage}/>
              <Route path="/mymessagepage" component = {MyMessagePage}/>
              <Route path="/category/:id" component={CateGory} />
              <Route path="/category//" component={Error}/>
              <Route path="/detail/:id" component={Detail} />
              <Route path="/detail//" component={Error}/>
              <Route path="/study/:id" component={Study} />
              <Route path="/study" component={Study}/>
              <Footer/>
              {/*출력 Test */}
            </div>
          </BrowserRouter>
        </AppContextProvider>
      </>
    );
  }
}

export default App;
