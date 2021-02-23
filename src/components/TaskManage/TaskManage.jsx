import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function manageTaskPage() {

    const [styleInput, setStyleInput] = useState ('single')

  return (
      <>
    <div className="taskstyle">
      <h2>Task Style</h2>
      <input type="radio" name="style" value="single" defaultChecked onClick={() => setStyleInput('single')}/><label htmlFor="single">Single</label>
      <input type="radio" name="style" value="multiple" onClick={() => setStyleInput('multiple')}/><label htmlFor="multiple">Multiple</label>
      <hr />
    </div>
    <div>
        <h2>Task Design</h2>
        <input type="text" placeholder="Task Name"/>
    </div>
    <div>
        <h3>Image</h3>
        <FontAwesomeIcon icon={['fas', 'image']} size="5x"/>
    </div>
    <div>
        <p>icons go here</p>
    </div>
    <div>
        <label htmlFor="amount">Amount:</label><input type="text" name="amount" placeholder="ex: 20"/>
        <label htmlFor="unit">Unit:</label><input type="text" name="unit" placeholder="ex: push-ups"/>
        <input type="checkbox" id="special"/><label htmlFor="special">Special Instruction:</label><input type="text" name="special" placeholder="ex: take medicine"/>
    </div>
    <button>Cancel</button>
    <button>Submit</button>
    </>
  );
}

export default manageTaskPage;
