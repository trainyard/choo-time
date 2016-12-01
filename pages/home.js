const html = require('choo/html')

const changeHistory = e => send('focus', idx)

module.exports = (state, prev, send) => html`
  <main>
    Explore History (${state.history.length})
    <div> 
      Actions
      <ul>
          ${state.history.map((item, idx) => {
            return html`<li><a href="#" onclick=${e => send('focus', idx)}>${idx} - ${JSON.stringify(item)}</a></li>`
          })}
      </ul>
    </div>
    <hr />
    <div>
      ${JSON.stringify(state.focusPayload)}
    </div>
  </main>
`
