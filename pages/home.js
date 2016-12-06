const html = require('choo/html')

const changeHistory = e => send('focus', idx)

function readFile(file, done) {
  var reader = new FileReader();
  reader.onload = e => done(e.target.result);
  reader.readAsText(file);
}

module.exports = (state, prev, send) => html`
  <main>
    <div class="action-col">
      <header class="list-header">
        <span>Actions</span>

        <button type="button" class="btn-control" onclick=${e => e.target.childNodes[1].click()}>
          Import
          <input id="import-file" style="display: none;" type="file" onchange=${(e) => {
            readFile(e.target.files[0], file => {
              send('import', file)
            });
          }}>
          </input>
        </button>
        <button class="btn-control" onclick=${_ => send('export')}>Export</button>
      </header>
      <ul class="list">
          ${state.history.map(({actionName, argsPassedToAction, resultingState}, idx) => {
            return html`
              <li>
                <button type="button" onclick=${e => send('focus', idx)}>
                  ${actionName} ${ argsPassedToAction ? '::' : '' } ${argsPassedToAction}
                </button>
              </li>`
          })}
      </ul>
    </div>
    <div class="state-col">
      <textarea>${JSON.stringify(state.focusPayload, null, 2)}</textarea>
    </div>
  </main>
`
