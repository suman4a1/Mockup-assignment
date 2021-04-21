import React from 'react'

const Pagenation=({itemsPerPage,totalList,paginate})=>{
    const pageNumbers=[];
    for(let i=1;i<=Math.ceil(totalList/itemsPerPage);i++){
        pageNumbers.push(i)
    }
    return(
       <nav>
           <ul>
               {
                   pageNumbers.map(item=>(
                       <li key={item} style={{display: 'inline'}}>
                           <a onClick={()=>paginate(item)} href='!#' >{item}</a>'
                       </li>
                   ))
               }
           </ul>
       </nav>
    )
}
export default Pagenation;