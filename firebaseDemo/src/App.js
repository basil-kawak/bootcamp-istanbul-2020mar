import React from 'react';
import db from './firebaseConfig';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
     header: "",
     email: "",
     fullname: "",     
    };
  }
  async componentDidMount(){
    const res = await db.collection('header').doc('header').get()
    const data = res.data()
    this.setState({
      header: data.header,
    })
    const userRes = await db.collection('users').get();
    const usersData = userRes.docs.map(user=> user.data())
    console.log(usersData);
    
  }
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addUser = e => {
    e.preventDefault();
    db.collection('users').add({
      fullNmae: this.state.fullname,
      email: this.state.email,
    })
    this.setState({
      fullname: "",
      email: ""
    });
  };
  render() {
    return (
      <>
        <h1>{this.state.header}</h1>
        <form onSubmit={this.addUser}>
          <input
            type="text"
            name="fullname"
            placeholder="Full name"
            onChange={this.updateInput} 
            value={this.state.fullname}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={this.updateInput}
            value={this.state.email}
          />
          <button type="submit">Submit</button>
        </form>
        </>
        );
      }
    }
   export default App;
