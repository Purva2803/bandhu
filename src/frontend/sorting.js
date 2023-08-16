
import './styles/sortings.css'
import React from 'react';


export const Sorting = ({ handleSortByDate, handleFilterByTrending }) => {
  return (


    
    <div className="sorting">
     
      <button onClick={handleSortByDate}>Sort by Date</button>
      <button onClick={handleFilterByTrending}>Filter by Trending</button>
    </div>
  );
};
