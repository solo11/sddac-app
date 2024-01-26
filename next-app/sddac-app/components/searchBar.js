'use client'


import { useState } from 'react';

const token='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'

function Repositories() {
  const [repositories, setRepositories] = useState([]);
  const [query, setQuery] = useState("")
  const [selection, setSelection] = useState("Name")

  const [requestData, setReqData] = useState([])

  async function fetchRepositories() {
    const response = await fetch('https://api.github.com/search/repositories?q=topic:ens-asset',{
        headers : {
            'Authorization': 'Bearer '+token,
            'Accept': 'application/vnd.github+json'
        }
    });
    const data = await response.json();
    setReqData(data.items);
    console.log(repositories)
  }

  async function searchByName(name) {
    const response = await fetch("https://api.github.com/search/repositories?q="+name+" in:name topic:ens-asset", {
        headers : {
            'Authorization': 'Bearer '+token,
            'Accept': 'application/vnd.github+json'
        }
    })
    const data = await response.json();
    setReqData(data.items);
    console.log(requestData);
  }

  async function searchByTopics(topics) {

    const topics_arr = ['ens-asset']
    const topics_split = topics.split(',')
    topics_split.forEach(element => {
        element = element.replace(/ /g, '');
        topics_arr.push(element)
    });

    let st = ""
    let first = true
    topics_arr.forEach(element => {
        if(first) {
            st = st + 'topic:' + element
            first = false
        }else {
            st = st + ' topic:' + element
        }
    })

    const url_2 = "https://api.github.com/search/repositories?q="+st

    console.log(url_2)
    
    const response = await fetch(url_2, {
        headers : {
            'Authorization': 'Bearer '+token,
            'Accept': 'application/vnd.github+json'
        }
    })
    const data = await response.json();
    setReqData(data.items);
    console.log(requestData);
  }

  async function onSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.target)

    if(selection == "Name") {
            console.log('selected all');
            await searchByName(query)}
    else if(selection ==  "Topics") {
             searchByTopics(query);
    }
    console.log(query,selection);



  }



  return (
    <div style={{margin:'20px'}}>
        <div>
        <h1 style={{fontSize:'2em',fontWeight:'bold',padding:'10px'}} className="mb-2 mt-0 text-xl font-medium leading-tight text-primary text-center">Self describing asset catalog search
</h1>
        </div>
      

  

      <div>
      <form onSubmit={onSubmit} class="flex flex-col  gap-3 ">
    <div className='flex flex-row'>
        <input style={{width:'40vw', margin:'10px'}} type="text" placeholder="Search for the tool you like"
			class="md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
            value={query}
            onChange={e => setQuery(e.target.value)}
			/>
           <select style={{width:'10vw', margin:'10px'}} id="search" name="searchType"
           value={selection}
           onChange={e => {setSelection(e.target.value)}}
		class="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
		<option value="Name" selected="">Name</option>
		<option value="Topics">Topics</option>
	</select>
    </div>

    <br style={{clear: "both"}}/>
            <div style={{paddingLeft:'10px'}}x className='flex flex-col'>
            <button  type="submit" className="text-black rounded-r px-5 py-2 w-fit text-center self-center border">Search</button>
            </div>
</form>
<button style={{marginLeft:'10px'}} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-grey-500 hover:border-transparent rounded" onClick={fetchRepositories}>Fetch All Repositories</button>
<ul>
        {requestData.map((repository) => (
            
          <li key={repository.id}>
            <div style={{margin:'30px',marginLeft:'-2px'}} class="w-full rounded overflow-hidden shadow-lg">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{repository.full_name}</div>
    <a href={repository.html_url} class="text-gray-700 text-base mb-2">{repository.html_url}</a>
    <p class="text-gray-700 text-base mt-2">Updated: {repository.updated_at}</p>

  </div>
  <div class="px-6 pt-4 pb-2"> 
  <p class="font-bold text-sm">Topics: </p>
  {repository.topics.map((topic) => (
            // <li key={topic}>{topic}</li>
            <span key={topic} class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{topic}</span>
          ))}
   
  </div>
</div>
 </li>
        ))}
      </ul>
      </div>
      <footer style={{width:'100%'}}>
        <div style={{position:'fixed', bottom:'0', textAlign:'center', width:'100%',margin:'auto', left:'0', backgroundColor:'black',color:'white'}} className='bg-neutral-200 p-4 text-center dark:bg-neutral-700'>
            Github project : 
            <a href='https://github.com/ramchandra-ub/gh-digitalassets'>https://github.com/ramchandra-ub/gh-digitalassets</a>
            </div>
        </footer>
    </div>
  );
}

export default Repositories;
