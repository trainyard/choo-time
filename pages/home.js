const html = require('choo/html')

const changeHistory = e => send('focus', idx)

module.exports = (state, prev, send) => html`
  <main>
    <div class="action-col"> 
      <header class="list-header">Actions</header>
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
