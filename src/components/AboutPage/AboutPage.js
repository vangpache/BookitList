import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <p>
        Bookit List is a digital space for bookworms and learners everywhere. Flawlessly, plan reading circles centered around the book of 
        your choice and invite your friends to join in on the discussions in one easy application. Keep a running list of your past circles
        for your own records. Now go out and keep the learning alive!
      </p>
    </div>
  </div>
);

export default AboutPage;
