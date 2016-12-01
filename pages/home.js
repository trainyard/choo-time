const html = require('choo/html')

const changeHistory = e => send('focus', idx)

module.exports = (state, prev, send) => html`
  <main>
    Explore History (${state.history.length})
    <div> 
      Actions
      <ul>
          ${state.history.map(({actionName, argsPassedToAction, resultingState}, idx) => {
            return html`
              <li onclick=${e => send('focus', idx)}>
                  ${actionName} ${argsPassedToAction}
              </li>`
          })}
      </ul>
    </div>
    <hr />
    <div>
      ${JSON.stringify(state.focusPayload)}
    </div>
  </main>
`
