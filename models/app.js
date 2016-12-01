module.exports = {
  state: {
    history: window.completeHistory || [],
    focusPayload: window.completeHistory && window.completeHistory.length && window.completeHistory.slice(-1)[0] || {},
    isMinimized: false
  },
  reducers: {
    /* synchronous operations that modify state. Triggered by actions. Signature of (data, state). */
    update: (data, state) => ({ title: data.value }),
    toggle: (data, state) => ({ isMinimized: !state.isMinimized }),
    focus: (data, state) => ({ focusPayload: state.history[data] })
  },
  effects: {
    // asynchronous operations that don't modify state directly.
    // Triggered by actions, can call actions. Signature of (data, state, send, done)
    /*
    myEffect: (data, state, send, done) => {
      // do stuff
    }
    */
  },
  subscriptions: [
    // asynchronous read-only operations that don't modify state directly.
    // Can call actions. Signature of (send, done).
    /*
    (send, done) => {
      // do stuff
    }
    */
  ]
}
