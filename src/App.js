import React from "react";
import './App.css'; 
const { connect, createLocalTracks } = require('twilio-video');


function App() {
  
  
  const handlebutton =() =>{
  var TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzA2ZGRmMTQ2M2M5NjM2MzZhMDdhMDg5NWE1NThkNjQ2LTE2MTMyODU4MTciLCJpc3MiOiJTSzA2ZGRmMTQ2M2M5NjM2MzZhMDdhMDg5NWE1NThkNjQ2Iiwic3ViIjoiQUMwZjAwODhmZTFiMTM1ZDE1ZGJkMjU5ODZlM2JjZDZmMSIsImV4cCI6MTYxMzI4OTQxNywiZ3JhbnRzIjp7ImlkZW50aXR5IjoiMTIzIiwidmlkZW8iOnsicm9vbSI6InRlc3QifX19.t3DZba-R-R8wNH-K57azbwAlkJXnOHxsU3jDk_eM0G4"
  connect(TOKEN , { name:'my-new-room' }).then(room => {
  console.log(`Successfully joined a Room: ${room}`);
  room.on('participantConnected', participant => {
    console.log(`A remote Participant connected: ${participant}`);
    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        const track = publication.track;
        document.getElementById('remote-media-div').appendChild(track.attach());
      }
    });
  
    participant.on('trackSubscribed', track => {
      document.getElementById('remote-media-div').appendChild(track.attach());
    });
    

  });
}, error => {
  console.error(`Unable to connect to Room: ${error.message}`); 
});
    

  }

const handleJoin = ()=>{
  var tokenJoin = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzA2ZGRmMTQ2M2M5NjM2MzZhMDdhMDg5NWE1NThkNjQ2LTE2MTMyODM1NDgiLCJpc3MiOiJTSzA2ZGRmMTQ2M2M5NjM2MzZhMDdhMDg5NWE1NThkNjQ2Iiwic3ViIjoiQUMwZjAwODhmZTFiMTM1ZDE1ZGJkMjU5ODZlM2JjZDZmMSIsImV4cCI6MTYxMzI4NzE0OCwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiNDU2NyIsInZpZGVvIjp7InJvb20iOiJ0ZXN0In19fQ.EKWDHWGDDbYXIei9FpIWGkz1-e0V8JKa6XSQMem_H6U"
    
  connect(tokenJoin, { name: 'my-new-room' }).then(room => {
  console.log(`Successfully joined a Room: ${room}`);
  room.on('participantConnected', participant => {
  console.log(`A remote Participant connected: ${participant}`);
  createLocalTracks({
    audio: true,
    video: { width: 640 }
  }).then(localTracks => {
    return connect(tokenJoin, {
      name: 'my-room-name',
      tracks: localTracks
    });
  }).then(room => {
    console.log(`Connected to Room: ${room.name}`);
  });
  
  });
}, error => {
  console.error(`Unable to connect to Room: ${error.message}`);
});
  }
  
  return (
    
    <div className="app">
      <header>
        <h1>Video call with Twilio</h1>
        <div id="remote-media-div">Screen</div>
      </header>
      
      <footer>
      
      <button onClick={handlebutton}>Connect</button>
      <button onClick={handleJoin}>Join Now</button>
        <p>
          Made with{' '}
          <span role="img" aria-label="React">
            ⚛️
          </span>{' '}
           <p>by anupriya</p>
        </p>
      </footer>
    </div>
  );
}

export default App;
