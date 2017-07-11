import React from 'react';

export default class PostForm extends React.Component {
  render() {
    return(
      <div className="input-field col s12">
        <form method="post" action="#">
          <div>
            <textarea placeholder="Type in your message here" className="type-text" required >
            </textarea>
            <label for="textarea1"></label>
          </div>
          <div>
            <select>
              <option value="" selected>Choose your priority option</option>
              <option value="1">Normal</option>
              <option value="2">Urgent</option>
              <option value="3">Critical</option>
            </select>
          </div>
          <button className="btn waves-effect waves-light" type="submit" name="action">Post
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}
