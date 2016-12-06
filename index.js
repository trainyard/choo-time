const choo = require('choo')
const html = require('choo/html')
const fileSaver = require('FileSaver.js')
const { btnStyle, popupStyle } = require('./lib/styles')

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
    export: (_, state) => {
      let exportData = JSON.stringify({ history: state.history }, null, 2)
      let blob = new Blob([exportData], { type: "text/plain;charset=utf-8" })
      let x = new Date()
      let fileName = `${document.title}-${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}[${x.getHours()}.${x.getMinutes()}.${x.getSeconds()}]`
      fileSaver.saveAs(blob, `${fileName}.json`)
      return state
    },
    update: (data, state) => {
      return { history: data }
    },
    focus: (data, state) => {
      _focusPayload = state.history[data].resultingState
      let previousPayload = state.history[data -1]
      if (previousPayload) {

      }
      focusWasSet = false;
      hostWindow.dispatchEvent(new CustomEvent("UPDATE_HOST_STATE", { detail: true } ))
      return { focusPayload: state.history[data] }
    }
  },
  effects: {
    import: (data, state, send, done) => {
      const history = JSON.parse(data).history
      send('update', history, () => send('focus', history.length - 1, done))
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
    onStateChange: (args, state, data, prev, send) => {
      if (prev !== 'refresh') {
        completeHistory.push({ actionName: prev, argsPassedToAction: args, resultingState: state })
        window.dispatchEvent(new CustomEvent("UPDATE_STATE", { detail: { completeHistory } } ))
        console.log('onStateChange:', { args, state, data, prev, completeHistory } )
        buttonContainer.innerHTML = ''
        buttonContainer.appendChild(_isMinimized ? renderButton() : html`<div id="__choo"></div>`)
      }
    }
  }
}


const renderButton = () => html`
  <button type="button" style="${btnStyle}" onclick=${popWindowOut}>${completeHistory.length ? completeHistory.length : ':)'}</button>
`

function popWindowOut() {
  if (timelineWindow === null || timelineWindow.closed) {
    timelineWindow = window.open(``, "MsgWindow", "width=750,height=500");
    timelineWindow.document.write('-')
    timelineWindow.document.body.innerHTML = ''
    const styleElement = html`<style>${popupStyle}</style>`
    timelineWindow.document.body.appendChild(styleElement)
    timelineWindow.document.body.appendChild(view.start())
    timelineWindow.focus()
  } else {
    timelineWindow.focus()
  }
}


module.exports = tardis
