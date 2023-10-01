import React from 'react';
import {
    Link
 } from "react-router-dom";
 
function Menu() {
  return (
    <div className="menu">      
    <ul>
        <li><Link to="/">Homepage</Link></li>
        <li><Link itemProp="url" to="/about">About</Link></li>
        <li><Link itemProp="url" to="/login">Login Here</Link></li> 
        {/* <li><a href="https://gmail.com">contact</a></li>    
        <li><a href="https://google.com" rel="noopener">Google</a></li> */}
        {/* <time datetime="2023-09-06">September 6, 2023</time>    */}
    </ul>
</div>
  );
}

export default Menu;


