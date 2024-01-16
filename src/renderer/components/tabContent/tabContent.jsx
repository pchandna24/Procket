/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './tabContent.css';
import WebSocket from 'ws';

const TabContent = () => {
  const [socketConnection, setsocketConnection] = useState('');
  const messages = useSelector((state) => state.message.root);
  if (messages !== '') {
    var protoName = Object.keys(messages.nested)[0];
    var messageNames = Object.keys(messages.nested[protoName].nested);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (document.getElementById('connectionHandler').value === 'Cancel') {
        setsocketConnection('');
        document.getElementById('url').disabled = false;
        return
      }
      const method = 'ws';
      const socketurl = document.getElementById('url').value;
      // document.getElementById('connectionHandler').value = 'Cancel';
      // const headers = document.getElementById('headers').value;
      // document.getElementById('headers').disabled = true;
      document.getElementById('url').disabled = true;
      const connection = new WebSocket(`${method}://${socketurl}`);
      setsocketConnection(connection);
      connection.onerror = function (error) {
        setsocketConnection('');
        document.getElementById('url').disabled = false;
        alert(`[error] ${error.message}`);
      };
    } catch (error) {
      // document.getElementById('headers').disabled = false;
      // setsocketConnection('');
      document.getElementById('url').disabled = false;
      alert('Some Error Occured. Please restart try again');
    }
  };

  const sendMessage = () => {
    try {
      document.getElementsByClassName('latency')[0].style.display = "hidden"
      const request = document.getElementById('request').value;
      const eventRequestMessage = `${protoName}.${document.getElementById('requestMessage').value
        }`;
      const eventResponseMessage = `${protoName}.${document.getElementById('responseMessage').value
        }`;
      const eventRequest = messages.lookupType(eventRequestMessage);
      const message = eventRequest.create(JSON.parse(request));
      const bb = eventRequest.encode(message).finish();
      socketConnection.send(bb);
      const startTime = Date.now();
      socketConnection.onmessage = function (event) {
        const latency = Date.now() - startTime;
        document.getElementsByClassName('latency')[0].style.display = "block"
        document.getElementById('latencyValue').innerHTML = `${latency}ms`
        const AwesomeMessage = messages.lookupType(eventResponseMessage);
        const decodedmessage = AwesomeMessage.decode(event.data);
        document.getElementById('response').value = JSON.stringify(
          decodedmessage,
          null,
          4
        );
      };
    } catch (error) {
      // document.getElementById('headers').disabled = false;
      document.getElementById('url').disabled = false;
      setsocketConnection('');
      // document.getElementById('connectionHandler').value = 'Connect';
      alert('Some Error Occured. Please try again');
    }
  };

  return (
    <>
      <div className="socketurl">
        <form onSubmit={handleSubmit}>
          <select disabled name="connectiontype">
            <option value="wss">wss</option>
            <option selected value="ws">
              ws
            </option>
          </select>
          <input id="url" type="text" name="url" size="111" />
          <input
            type="submit"
            value={socketConnection === '' ? 'Connect' : 'Cancel'}
            id="connectionHandler"
          />
        </form>
      </div>
      {/* <h4>Headers</h4>
      <textarea id="headers" name="headers" rows={12} cols={50} /> */}
      <div className="messageOption">
        <span>Expected Request:</span>
        <select className="search" id="requestMessage">
          {messageNames &&
            messageNames.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
        </select>
        <span>Expected Response:</span>
        <select className="search" id="responseMessage">
          {messageNames &&
            messageNames.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
        </select>
      </div>
      <div className="latency" >
        <p id="latencyValue" />
      </div>
      <div className="messagebox">
        <div className="reqres">
          <textarea
            id="request"
            name="headers"
            rows={55}
            cols={48}
            placeholder={`Example JSON:${JSON.stringify({
              essential_req: {
                limit: 2,
                installed_packages: [],
                language: '',
              },
            })}`}
          />
        </div>
        <div onClick={() => sendMessage()} className="playbtn">
          ▶️
        </div>
        <div className="reqres">
          <textarea id="response" name="headers" rows={55} cols={48} disabled />
        </div>
      </div>
    </>
  );
};

export default TabContent;
