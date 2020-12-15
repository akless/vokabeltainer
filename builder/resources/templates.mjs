/**
 * @overview HTML templates of ccm component for building a fill-in-the-blank text
 * @author André Kless <andre.kless@web.de> 2020
 */

import { html } from 'https://unpkg.com/lit-html';
import {repeat} from 'https://unpkg.com/lit-html/directives/repeat.js';

/**
 * returns the main HTML template
 * @param {Object} config - initial app configuration
 * @param {Object} builder - app builder instance
 * @returns {TemplateResult} main HTML template
 */
export function main( config, builder, onSubmit ) {
  return html`
    <form>
      <div class="accordion" id="cb-accordion">

        <!-- Vocabulary -->
        <div class="card">
          <div class="card-header p-1" id="cb-editor-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left" type="button" data-toggle="collapse" data-target="#cb-editor-collapse" aria-expanded="true" aria-controls="cb-editor-collapse">
                Vocabulary
              </button>
            </h2>
          </div>
          <div id="cb-editor-collapse" class="collapse show" aria-labelledby="cb-editor-heading" data-parent="#cb-accordion">
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Word</th>
                    <th scope="col">Translation</th>
                    <th scope="col">Created at</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  ${ repeat( config.vocabulary, entry => entry.key, ( { key, word, translation, created_at } ) => html`
                    <tr>
                      <th scope="row">${key}</th>
                      <td>${word}</td>
                      <td>${translation}</td>
                      <td>${moment( created_at ).fromNow()}</td>
                      <td></td>
                    </tr>
                  `) }
                </tbody>
              </table>
              <button type="button" class="btn btn-success" data-toggle="modal" data-target="#vocabulary-modal">Add Vocabulary</button>
            </div>
          </div>
        </div>
        
        <!-- General Settings -->
        <div class="card">
          <div class="card-header p-1" id="cb-general-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#cb-general-collapse" aria-expanded="false" aria-controls="cb-general-collapse">
                General Settings
              </button>
            </h2>
          </div>
          <div id="cb-general-collapse" class="collapse" aria-labelledby="cb-general-heading" data-parent="#cb-accordion">
            <div class="card-body">

              <!-- Layout -->
              <div class="form-group">
                <label for="cb-css">Layout</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-css" aria-expanded="false" aria-controls="cb-info-css">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-css">
                  <div class="bg-info text-light rounded p-2">
                    Choose between a layout format for your vocabulary trainer.
                  </div>
                </div>
                <select class="form-control" name="css" id="cb-css">
                  ${ Object.values( builder.ignore.css ).map( obj => html`<option value="${obj.key}" ?selected=${JSON.stringify(config.css) === JSON.stringify(obj.value)}>${obj.title}</option>` )}
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Finish Actions -->
        <div class="card">
          <div class="card-header p-1" id="cb-finish-heading">
            <h2 class="mb-0">
              <button class="btn btn-lg btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#cb-finish-collapse" aria-expanded="false" aria-controls="cb-finish-collapse">
                Finish Actions
              </button>
            </h2>
          </div>
          <div id="cb-finish-collapse" class="collapse" aria-labelledby="cb-finish-heading" data-parent="#cb-accordion">
            <div class="card-body">

              <!-- Enable Finish Actions -->
              <div class="form-group">
                <input type="checkbox" name="finish" id="cb-finish" ?checked=${config.onfinish}>
                <label class="form-check-label pl-1" for="cb-finish">
                  Enable Finish Actions
                </label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-finish" aria-expanded="false" aria-controls="cb-info-finish">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-finish">
                  <div class="bg-info text-light rounded p-2">
                    If enabled, there is a finish button for which individual actions such as saving solutions and displaying another app can be set.
                    If this option is enabled, the caption of the finish button can be adjusted via the lower input field.
                  </div>
                </div>
              </div>

              <!-- Caption of Finish Button -->
              <div class="form-group" ?hidden=${!config.onfinish}>
                <label for="cb-finish-btn">Caption of Finish Button</label>
                <input type="text" name="captions.finish" class="form-control" id="cb-finish-btn" value="${config.captions.finish}">
              </div>

              <!-- Save submitted Solutions -->
              <div class="form-group" ?hidden=${!config.onfinish}>
                <label for="cb-store">Save submitted Solutions</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-store" aria-expanded="false" aria-controls="cb-info-store">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-store">
                  <div class="bg-info text-light rounded p-2">
                    The results are stored on the server of the computer science department of the Bonn-Rhein-Sieg University of Applied Sciences.
                    <ul class="m-0 pl-4">
                      <li><b>Collective Solution:</b> Everyone is working on a common solution. When the app is started, the last submitted solution is restored.</li>
                      <li><b>User Specific:</b> Each user has their own solution that is restored when the app starts. Anyone can correct their submitted solution afterwards. A user must log in to submit a solution.</li>
                      <li><b>User Specific without Override:</b> The same as the previous option, except that each submitted solution is saved separately. Previously submitted solutions will not be overwritten. A user must log in to submit a solution.</li>
                    </ul>
                  </div>
                </div>
                <select class="form-control" name="store" id="cb-store">
                  <option value="" ?selected=${config.onfinish && !config.onfinish.store}>None</option>
                  <option value="collective" ?selected=${config.onfinish && config.onfinish.store === true && !config.onfinish.store.user}>Collective Solution</option>
                  <option value="user" ?selected=${config.onfinish && config.onfinish.store === true && config.data.user}>User Specific</option>
                  <option value="unique" ?selected=${config.onfinish && builder.ccm.helper.isObject( config.onfinish.store ) && config.onfinish.store.unique}>User Specific without Override</option>
                </select>
              </div>

              <!-- User Authentication -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.store || ( !config.data || !config.data.user ) && ( !builder.ccm.helper.isObject( config.onfinish.store ) || !config.onfinish.store.user )}>
                <label for="cb-user">User Authentication</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-user" aria-expanded="false" aria-controls="cb-info-user">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-user">
                  <div class="bg-info text-light rounded p-2">
                    Choose here how a user has to authenticate when submitting a solution.
                    <ul class="m-0 pl-4">
                      <li><b>Guest Mode:</b> The user can authenticate with any username and without a password.</li>
                      <li><b>Digital Makerspace Account:</b> The user must log in with a Digital Makerspace account.</li>
                      <li><b>H-BRS FB02 Account:</b> The user has to authenticate with a account from the Department of Computer Sciences at Hochschule Bonn-Rhein-Sieg University of Applied Sciences.</li>
                      <li><b>H-BRS FB02 Account with Pseudonym:</b> The same as the previous option, but the username is replaced with a pseudonym.</li>
                      <li><b>One-time Pseudonym:</b> The user is automatically logged in with a one-time pseudonym. Each login returns a different pseudonym.</li>
                    </ul>
                  </div>
                </div>
                <select class="form-control" name="user" id="cb-user">
                  ${ Object.values( builder.ignore.user ).map( obj => html`<option value="${obj.key}" ?selected=${JSON.stringify(config.user) === JSON.stringify(obj.value)}>${obj.title}</option>` )}
                </select>
              </div>

              <!-- Confirmation Dialog -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.store}>
                <label for="cb-confirm">Confirmation Dialog</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-confirm" aria-expanded="false" aria-controls="cb-info-confirm">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-confirm">
                  <div class="bg-info text-light rounded p-2">
                    If active, the user must explicitly confirm before saving a solution.
                    To activate this, specify the text that will be displayed to the user in the confirm dialog.
                  </div>
                </div>
                <input type="text" name="onfinish.confirm" placeholder="optional" class="form-control" id="cb-confirm" value="${config.onfinish && config.onfinish.confirm || ''}">
              </div>

              <!-- Success Message -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.store}>
                <label for="cb-success">Success Message</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-alert" aria-expanded="false" aria-controls="cb-info-alert">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-alert">
                  <div class="bg-info text-light rounded p-2">
                    Here you can specify a message that will be displayed to the user when the submitted solution has been saved successfully.
                  </div>
                </div>
                <input type="text" name="onfinish.alert" placeholder="optional" class="form-control" id="cb-success" value="${config.onfinish && config.onfinish.alert || ''}">
              </div>

              <!-- Next Content -->
              <div class="form-group" ?hidden=${!config.onfinish}>
                <label for="cb-render">Next Content</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-render" aria-expanded="false" aria-controls="cb-info-render">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-render">
                  <div class="bg-info text-light rounded p-2">
                    Specify which content should be displayed next after a solution has been submitted.
                  </div>
                </div>
                <select class="form-control" name="render" id="cb-render">
                  <option value="clear" ?selected=${config.onfinish && ( config.onfinish.clear || !config.onfinish.restart && !config.onfinish.render )}>Clear Content</option>
                  <option value="restart" ?selected=${config.onfinish && config.onfinish.restart}>Restart App</option>
                  <option value="app" ?selected=${config.onfinish && config.onfinish.render}>Show other App</option>
                </select>
              </div>

              <!-- Embed Code of the App -->
              <div class="form-group" ?hidden=${!config.onfinish || !config.onfinish.render}>
                <label for="cb-app">Embed Code of App</label>
                <span type="button" data-toggle="collapse" data-target="#cb-info-app" aria-expanded="false" aria-controls="cb-info-app">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill text-info mb-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>
                </span>
                <div class="collapse" id="cb-info-app">
                  <div class="bg-info text-light rounded p-2">
                    Enter the embed code of the app that should be displayed after submitting a solution.
                    The app must be an app created in the Digital Makerspace.
                  </div>
                </div>
                <input type="text" name="app" class="form-control" id="cb-app">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview Button -->
      <button type="button" class="btn btn-info btn-block mt-0" data-toggle="modal" data-target="#cb-preview" ?data-hidden=${!builder.preview}>${builder.preview}</button>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary btn-block mt-0" ?data-hidden=${!builder.onfinish || !builder.submit}>${builder.submit}</button>
    </form>

    <!-- Modal: Add Vocabulary -->
    <form class="p-3" id="vocabulary-form">
      <div class="modal fade" id="vocabulary-modal" tabindex="-1" aria-labelledby="vocabulary-label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="vocabulary-label">Define new Vocabulary</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="word-input" class="form-label">Word:</label>
                <input type="text" class="form-control" id="word-input" aria-describedby="word-help" required>
                <div id="word-help" class="form-text">This word is displayed on the front of the card.</div>
              </div>
              <div class="mb-3">
                <label for="translation-input" class="form-label">Translation:</label>
                <input type="text" class="form-control" id="translation-input" aria-describedby="translation-help" required>
                <div id="translation-help" class="form-text">The translation is on the back of the card.</div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Add Vocabulary</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    
    <!-- Modal: Preview -->
    <div class="modal fade" id="cb-preview" tabindex="-1" aria-labelledby="App Preview" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
  
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">App Preview</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
  
          <!-- Modal Body -->
          <div id="cb-preview-body" class="modal-body p-0">
            <div class="d-flex justify-content-center align-items-center spinner">
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
