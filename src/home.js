import React,{useState} from 'react';
import './home.css';
import git from './git.jpg';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
          ling: '',
          user: '',
          start: 0,
          end: 0
        }
    }
    
    updateVar = (e)=>{
      e.preventDefault()
      this.setState({
        [e.target.id]:e.target.value
      })
    }

    clear=()=>{
        const divResult=document.getElementById("divResult")
        while(divResult.firstChild)
          divResult.removeChild(divResult.firstChild)
    }

    getStars=async(e)=>{
      this.clear();
      e.preventDefault();
      
      const divResult=document.getElementById("divResult")
      const start=this.state.start;
      const start1=start.toString();
      const end=this.state.end;
      const end1=end.toString();

      var url="https://api.github.com/search/repositories?q=stars:"
      url=url.concat(start1);
      url=url.concat("..");
      url=url.concat(end1);
      console.log(url)
      const response = await fetch(url)
      const result= await response.json()
      console.log(result)
      

      result.items.forEach(i=>{
          //divResult.appendChild(document.createTextNode(i.full_name))
          const img=document.createElement("img")
          img.src=i.owner.avatar_url;
          img.className="rez"
          const anchor=document.createElement("a")
          anchor.href= i.html_url;
          anchor.textContent=i.full_name;
          divResult.appendChild(img)
          divResult.appendChild(anchor)
          divResult.appendChild(document.createElement("br"))
      })
      //divResult.appendChild(document.createTextNode(url))
    }

    getRepos=async(e)=>{
      this.clear();
      e.preventDefault();
      const divResult=document.getElementById("divResult")
      const user=this.state.user;

      var url="https://api.github.com/search/repositories?q="
      url=url.concat(user)
      //url=url.concat("/repos")
      const response = await fetch(url)
      const result= await response.json()
      console.log(result)
      
      
      if(result.items.length==0)
       divResult.appendChild(document.createTextNode("No Repos with given username found"))
      result.items.forEach(i=>{
          //divResult.appendChild(document.createTextNode(i.full_name))
          const img=document.createElement("img")
          img.src=i.owner.avatar_url;
          img.className="rez"
          const anchor=document.createElement("a")
          anchor.href= i.html_url;
          anchor.textContent=i.full_name;
          divResult.appendChild(img)
          divResult.appendChild(anchor)
          divResult.appendChild(document.createElement("br"))
      })
    }


    getIssues=async(e)=>{
      this.clear();
      e.preventDefault();
      const divResult=document.getElementById("divResult")
      const user=this.state.user;

      var url="https://api.github.com/search/issues?q=author:"
      url=url.concat(user)
      url=url.concat(" type:issue")
      const response = await fetch(url)
      const result= await response.json()
      console.log(result)
    

      if(result.items.length==0)
       divResult.appendChild(document.createTextNode("No Issues with given username found"))
      result.items.forEach(i=>{
          const anchor=document.createElement("a")
          anchor.href= i.html_url;
          anchor.textContent=i.title;
          divResult.appendChild(anchor)
          divResult.appendChild(document.createElement("br"))
      })
    }
    
    getLang=async(e)=>{
      this.clear();
      e.preventDefault();
      const ling=this.state.ling;
      const divResult=document.getElementById("divResult")

      var url="https://api.github.com/search/repositories?q=language:"
      url=url.concat(ling);
      console.log(url)
      const response = await fetch(url)
      const result= await response.json()
      console.log(result)
      var message=result.message
      console.log(message)

      if(message==="Validation Failed")
       divResult.appendChild(document.createTextNode("No items found"))
      else{ 
       result.items.forEach(i=>{
          //divResult.appendChild(document.createTextNode(i.full_name))
          const img=document.createElement("img")
          img.src=i.owner.avatar_url;
          img.className="rez"
          const anchor=document.createElement("a")
          anchor.href= i.html_url;
          anchor.textContent=i.full_name;
          divResult.appendChild(img)
          divResult.appendChild(anchor)
          divResult.appendChild(document.createElement("br"))
       })
      }
      //divResult.appendChild(document.createTextNode(url))
    }


    render(){
        return(
            <>
            <img src={git} alt="img" className="img"></img>
            
            <center>
            <div className='container'>
            <center className="h1">Github Recommender</center>
            Enter the stars starting and ending range&nbsp;
            <input id='start' type='number' onChange={this.updateVar}/>&nbsp;
            <input id='end' type='number' onChange={this.updateVar}/>
            &nbsp;<button id='starbtn' className='btn' onClick={this.getStars}>Search by Star count</button>
            <br></br>
            Enter username to search issues
            &nbsp;<input id='user' type="text" onChange={this.updateVar}/>
            &nbsp;<button id='repobtn'  className='btn' onClick={this.getRepos}>Search Repo</button>
            &nbsp;<button id='issuesbtn' className='btn' onClick={this.getIssues}>Search by issues</button>
            <br></br>
            Enter any language/domain
            &nbsp;<input id='ling' type="text" onChange={this.updateVar}/>
            &nbsp;<button id='lingbtn' className='btn' onClick={this.getLang}>Search by language</button>
            </div>
            </center>
            &nbsp; &nbsp; &nbsp;
            <div id='divResult' className='res'>
              
            </div>
            
            </>
            
        )
    }
}

export default Home;