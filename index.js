const choo = require('choo')
const html = require('choo/html')
const view = choo()
const completeHistory = []
const _isMinimized = true;
const buttonContainer = document.createElement('div')

let timelineWindow = null; 
buttonContainer.id = '__history'
document.body.appendChild(buttonContainer)

const initialState = {
    history: completeHistory,
    focusPayload: completeHistory.length && completeHistory.slice(-1)[0] || {},
}
const leModel = {
  state: initialState,
  reducers: {
    update: (data, state) => ({ history: data }),
    focus: (data, state) => ({ focusPayload: state.history[data] })
  },
  subscriptions: [
    (send, done) => {
      window.addEventListener('UPDATE_STATE', function (e) {
        if (e && e.detail && e.detail.completeHistory) {
          send('update', e.detail.completeHistory, done)
        } else {
          done()
        }
      }, false);
    }
  ]
}

view.model(leModel)
view.router((route) => [
  route('/', require('./pages/home'))
])

function tardis () {
  buttonContainer.appendChild(_isMinimized ? renderButton() : html`<div id="__choo"></div>`)
  
  return {
    onAction: (args, state, name, route) => {
      console.log(`OnAction (${name}):`, { args, state, name, route })
    },
    onError: (err, state, send) => {
      console.error({err, state})
    },
    onStateChange: (args, state, data, prev, send) => { 
      completeHistory.push(state)
      window.dispatchEvent(new CustomEvent("UPDATE_STATE", { detail: { completeHistory } } ))
      console.log('onStateChange:', { args, state, data, prev, completeHistory } )
      buttonContainer.innerHTML = '';
      buttonContainer.appendChild(_isMinimized ? renderButton() : html`<div id="__choo"></div>`)
    }
  }
}

const renderButton = () => html`
  <button type="button" id="__choo" onclick=${popWindowOut}>${completeHistory.length ? completeHistory.length : '-'}</button>
`

function popWindowOut() {
  if (timelineWindow === null || timelineWindow.closed) {
    timelineWindow = window.open("<html><body></body></html>", "MsgWindow", "width=750,height=500");
    timelineWindow.document.write('Devtools')
    timelineWindow.document.body.appendChild(view.start())
    timelineWindow.focus()
  } else {
    timelineWindow.focus()
  }
}


module.exports = tardis
