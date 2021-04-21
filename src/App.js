
import { useEffect, useState } from 'react';
import Pagenation from './Pagenation'
import axios from "axios"
import Moment from 'moment';
import './App.css';

function App() {
  const [list,setlist] = useState([])
  //const [loading,setLoading] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const mailFirstPartFun = firstname =>{
    let name;
    if(firstname.indexOf('_')!== -1){
       name = firstname.split('_')
    }else name = firstname.split('.')
    
    let upperCaseName=name.map(item=>{
      let itemname=item.split('');
      itemname[0] = itemname[0].toUpperCase();
      return itemname.join('')
    })
    return upperCaseName.join(' ');
  }

  useEffect(()=>{
    const fetchList = async ()=>{
      //setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/comments');
      let filterList = res.data.map(item=>{
        let mailFirstPart = mailFirstPartFun(item.email.split('@')[0])
        item.mailFirstPart = mailFirstPart+' <'+item.email+'>';
        item.date = Moment(new Date()).format('DD/MM/YYYY HH:MM');
        item.readmoreFlag = item.body.length>20 ? true:false;
        return item
      })
      setlist(filterList);
      //setLoading(false);
    }
    fetchList();
  },[])
  const date=new Date();
  const intdexOfLastItem = currentPage*itemsPerPage;
  const indexOfFirstItem = intdexOfLastItem - itemsPerPage;
  const currentList = list.slice(indexOfFirstItem,intdexOfLastItem);

  const paginate=(number)=> setCurrentPage(number)

  const myFunction=(id)=>{
    var dots = document.getElementById("dots-"+id);
    var moreText = document.getElementById("more-"+id);
    var btnText = document.getElementById("mybtn-"+id);

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
        btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }
  return (
    <div className="post">
      {currentList.map(item=>(
        <div key={item.id} className="listItem">
          <div className='section-block'>
            <div className='from'><b>{item.mailFirstPart.substr(0,1).toUpperCase()}</b></div>
            <div className='content'>
              <p>From: <b>{item.mailFirstPart}</b></p>
              <p>Subject: <b>{item.name}</b></p>
              {!item.readmoreFlag ? <p style={{display: 'inline-block'}}>{item.body}</p> : <p style={{display: 'inline-block'}}>{item.body.substr(0, 20)}<span id={`dots-${item.id}`}> ...</span><span id={`more-${item.id}`} style={{ display: 'none' }}>{item.body.substr(20, item.body.length)}</span></p>}
              <a href="#" onClick={() => myFunction(item.id)} id={`mybtn-${item.id}`}>read more</a>
              <p>{item.date}</p>
            </div>
            <div className='clearfix'></div>
          </div>
        </div>
      ))}
      <Pagenation itemsPerPage={itemsPerPage} totalList={list.length} paginate={paginate} />
    </div>
  );
}

export default App;
