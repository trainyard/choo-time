const choo = require('choo')
const html = require('choo/html')

const view = choo()
const completeHistory = []
const _isMinimized = true;
const buttonContainer = document.createElement('div')
let _focusPayload;
const hostWindow = window
let focusWasSet = false;
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
    update: (data, state) => {
      return { history: data }
    },
    focus: (data, state) => {
      _focusPayload = state.history[data]
      focusWasSet = false;
      hostWindow.dispatchEvent(new CustomEvent("UPDATE_HOST_STATE", { detail: true } ))
      return { focusPayload: state.history[data] } 
    }
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
    wrapReducers: (reducer) => (data, state) => {
      if (_focusPayload && !focusWasSet) {
        focusWasSet = true;
        return reducer(null, _focusPayload)
      }
      return reducer(data, state)
    },
    wrapSubscriptions: (subs) => (send, done) => {
      window.addEventListener('UPDATE_HOST_STATE', () => send('refresh', {}, done), false);
    },
    onAction: (args, state, name, route) => {
      console.log(`OnAction (${name}):`, { args, state, name, route })
    },
    onError: (err, state, send) => {
      console.error({err, state})
    },
    onStateChange: (args, state, data, name, send) => { 
      if (prev !== 'refresh') {
        completeHistory.push(state)
        window.dispatchEvent(new CustomEvent("UPDATE_STATE", { detail: { completeHistory } } ))
        console.log('onStateChange:', { args, state, data, prev, completeHistory } )
        buttonContainer.innerHTML = ''
        buttonContainer.appendChild(_isMinimized ? renderButton() : html`<div id="__choo"></div>`)
      }
    }
  }
}
const style = `
  padding: inherit;
  margin: inherit;
  display: inherit;
  background-color: #38818F;
  border-radius: 999em;
  border: inherit;
  min-width: 56px;
  height: 56px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  line-height: 1;
  color: white;
  bottom: 8px;
  right: 8px;
  position: fixed;
  z-index: 2;
  font-size: 18px;
  cursor: pointer;
  display: inline-block;
`

const renderButton = () => html`
  <button type="button" style="${style}" onclick=${popWindowOut}>${completeHistory.length ? completeHistory.length : ':)'}</button>
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
