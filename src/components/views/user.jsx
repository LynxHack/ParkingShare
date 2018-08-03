require('./../../stylesheets/user.scss');
import React, { Component } from "react";

export default class userPage extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
    <div className='user'>
    <main>
  <input id="tab1" type="radio" name="tabs" checked/>
  <label htmlFor="tab1">User Info</label>
    
  <input id="tab2" type="radio" name="tabs"/>
  <label htmlFor="tab2">Your Reservations</label>
    
  <input id="tab3" type="radio" name="tabs"/>
  <label htmlFor="tab3">Your Vehicles</label>
    
  <input id="tab4" type="radio" name="tabs"/>
  <label htmlFor="tab4">Your Spots</label>
    
  <section id="content1">
  <p>
      Jerky jowl pork chop tongue, kielbasa shank venison. Capicola shank pig ribeye leberkas filet mignon brisket beef kevin tenderloin porchetta. Capicola fatback venison shank kielbasa, drumstick ribeye landjaeger beef kevin tail meatball pastrami prosciutto pancetta. Tail kevin spare ribs ground round ham ham hock brisket shoulder. Corned beef tri-tip leberkas flank sausage ham hock filet mignon beef ribs pancetta turkey.
    </p>
  </section>
    
  <section id="content2">

  </section>
    
  <section id="content3">

  </section>
    
  <section id="content4">

  </section>
    
</main>
</div>
    );
  }
}