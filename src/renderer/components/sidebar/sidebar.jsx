/* eslint-disable no-alert */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
// import path from 'path';
import { useSelector, useDispatch } from 'react-redux';
import path from 'path';
import { io } from 'socket.io-client';
import * as fs from 'fs';
import { updateMessages } from '../../../store/reducers/messages';
import './sidebar.css';

const protobuf = require('protobufjs');

const SideBar = () => {
  const messages = useSelector((state) => state.message.root);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = async () => {
    const baseRoot = new protobuf.Root();
    baseRoot.resolvePath = (origin, target) => {
      return target;
    };
    // const fs = require('fs');
    const data = fs.readFileSync(selectedFile.path, {
      encoding: 'utf8',
      flag: 'r',
    });
    const { root } = protobuf.parse(data, { keepCase: true });
    dispatch(updateMessages(root));
    alert('Selected File Parsed.');
  };
  return (
    <div className="sidenav">
      <input
        type="file"
        id="fileInput"
        name="file"
        accept=".proto"
        onChange={changeHandler}
      />
      {isFilePicked ? (
        <div>
          {/* <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>location: {selectedFile.path}</p>
          <p>
            lastModifiedDate:{' '}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p> */}
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <button onClick={handleSubmission} className="btn">
        {' '}
        Add Proto ✚
      </button>
    </div>
  );
};

export default SideBar;
