import React, { Component } from 'react';
import NaviBar from './NaviBar';
import './css/AboutUs.css';

export default class AboutUs extends Component {
  constructor(){
    super();
    this.state = {

    }

    }

    render() {
      return (
        <main>
          <NaviBar />
          <div className='content-container'>

          <h1>About Us</h1>
          <hr />
          <p>
            This is a website created for a univerisity project at De Montfort Univerisity. The student is studying Computer Science and has decided to make this website to satisfy the need
            for a calorie intake counter system. The website has that, plus some extra features.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum maximus tellus sit amet consectetur. Nam et leo erat. Aliquam erat volutpat. Sed vel semper metus, pellentesque commodo nulla. Aenean orci elit, iaculis vitae sodales ut, ornare et tellus. Cras euismod semper tellus, ac tempus ligula sollicitudin ac. Aenean imperdiet tempor felis eget fringilla. Phasellus sed urna dui. Morbi vulputate tellus a tellus fermentum convallis. Duis maximus mauris leo, sed feugiat dolor malesuada vel. Integer quis lorem ac ex aliquet dictum. Praesent justo urna, consectetur non massa vitae, mollis aliquet tortor. In vitae eros ornare, vulputate velit eget, aliquet nulla. Aliquam mattis arcu sed rhoncus egestas. In porttitor sollicitudin maximus.
          </p>
          <p>
            Donec venenatis consectetur efficitur. Etiam imperdiet eu leo sed finibus. Nullam suscipit eget tellus ac mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In libero velit, consectetur ut dictum ut, facilisis non purus. Integer viverra fringilla nunc ac molestie. Vivamus viverra malesuada scelerisque. Sed vestibulum risus ac augue pellentesque, eget eleifend metus maximus. Proin ac mauris eu velit laoreet ultrices et non ligula. Fusce tincidunt consectetur nisi ac accumsan. In hac habitasse platea dictumst. Proin id dui lorem. Vivamus urna sapien, ullamcorper non leo ut, pulvinar faucibus sapien.
          </p>
          <p>
            Donec vestibulum sapien nibh, et hendrerit risus pellentesque id. Sed venenatis, neque quis tincidunt blandit, nisi lectus cursus arcu, et maximus diam lacus non nisl. Donec hendrerit magna sit amet nunc imperdiet, ut lacinia tortor dictum. Sed bibendum nulla quis augue porta, et pharetra massa dictum. Pellentesque ullamcorper congue dolor, id egestas nunc faucibus et. Integer volutpat bibendum diam at dictum. Pellentesque urna arcu, ultrices sit amet orci nec, tincidunt viverra libero. Aliquam eu lobortis tortor. Proin at accumsan erat. In malesuada cursus laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </p>
          <p>
            Nullam dignissim, tellus et efficitur maximus, magna ipsum ullamcorper purus, eget dapibus lectus velit ac lorem. Fusce eu mi id elit bibendum tincidunt et eu ex. Duis molestie lorem lacus, in porttitor quam consequat nec. Integer ac quam vitae quam dictum pharetra. Duis nec laoreet lacus, quis ullamcorper dui. Nam molestie vulputate libero, nec ornare nunc ultrices ut. In maximus lorem eu tellus consequat iaculis. Maecenas faucibus placerat feugiat. Phasellus lobortis luctus ligula, eu sodales diam pulvinar ut. Curabitur sollicitudin tortor et tortor venenatis fringilla ut sollicitudin leo.
          </p>

        </div>
        </main>
      )
    }

  }
