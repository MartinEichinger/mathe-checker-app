/* Props definition in App.js
this.propsNav = {
  imgSrc: "./images/...",
  items: [{
            name: 'tab1',
            link: "#innerLink1"
          },
        ]
  }
*/

import React from 'react';
import './Nav.scss';

import SwitchLabels from '../SwitchLabels/SwitchLabels';

function renderSortByItems(props) {
  return props.propsDiv.items.map((item, i) => {
    let navClass = 'navigation-'+i;
    return <a href={item.link} className={navClass} key={i}>{item.name}</a>;
  });
}

export function Nav(props) {
  const handleChange = (state) => {
    console.log(`Nav/handleChange: ${state}`);
    props.onChange(state);
  }

  return (
    <div className="headerBody">
      <div className="header">
        <div className="navigationLogo">
          <img src={props.propsDiv.img.src} alt="" />
          <h1>{props.propsDiv.img.txt}</h1>
        </div>
        <div className="navigation">
          <div className="nav-1">
            {renderSortByItems(props)}
          </div>
          <div className="nav-2">
            <SwitchLabels onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );

}
