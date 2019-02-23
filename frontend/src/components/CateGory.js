import React, { Component, Fragment } from 'react';
import './CateGory.css';
import axios from 'axios';
import {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['category'];

// import { ButtonToolbar, Button, Row, Col, Image } from 'react-bootstrap';
class CateGory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      boards: [],
      searchTerm: props.match.params.id,
    }
    // this.searchUpdated = this.searchUpdated.bind(this)
  
  }
  componentDidMount() {
  axios.get(`http://localhost:8080/api/contents/context/`+this.state.searchTerm)
    .then(res => {
      this.setState({
     boards : res.data,
    });
      console.log(this.state.boards);
    })
  };
  
  // searchUpdated (term) {
  //   if(term === ''){
  //     this.setState({searchTerm : 'ForExample'})
  //   }
  //   else {
  //     this.setState({searchTerm : term})
  //   }
  // }
  
    render() {
      const filter = this.state.boards.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
      console.log(this.state.searchTerm);
      return (
        <section className="infoma">
        <div>
          <div>
            <div className="info_search">정렬 기준 : 정확도 순</div>
            <div className="info_cate"> 
                  <div className = "info_category_1">
                  {filter.map((board, index) => {
                    return (
                      <div className = "info_divided" key={index}>
                            
                            <button className="info_button"><div className ="info_named"><img src ={`http://localhost:8080/`+board.imageUrl} alt ="Testing" width ="50%" height="50%"/></div></button>
                            <div className ="info_title">{board.title}</div>
                            <div className ="info_description">{board.description}</div>
                            <div className ="info_category">{board.category}</div>
                          </div>
                  )
                  })} 

                  </div>
            </div>                        
          </div>
        </div>
      </section>
      );
    }
}

export default CateGory;