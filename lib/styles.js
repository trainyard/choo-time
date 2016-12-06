const btnStyle = `
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


const popupStyle = `
/*
#1d1f20
#343436
#666
#ccc
*/

body {
  margin: 0;
  font-size: 12px;
  font-family: 'Monaco', courier, monospace;
}

.list-header {
  font-weight: bold;
  border-bottom: thin solid #333;
  padding: 6px 12px;
}
.list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}
.list li {
  border-bottom: thin solid #333;
  line-height: 1.2rem;
  margin: 0;
}
button {
  outline: none;
  background: inherit;
  font-size: inherit;
  line-height: inherit;
  text-align: inherit;
  color: inherit;
  border: none;
  display: inline-block;
  width: 100%;
  padding: 0;
  margin: 0;
  cursor: pointer;
  padding: 6px 12px;
  transition: 0.2s;
}


.list button:hover {
  background: #999;
  color: #333;
}
.list button:focus {
  font-style: oblique;
  text-decoration: underline;
  background: #444;
}
.list button:active {
  background: #eee;
}

.action-col {
  box-sizing: border-box;
  background: #1d1f20;
  color: #ccc;
  vertical-align: top;
  width: 33%;
  display: inline-block;
  overflow:hidden;
  padding: 5px;
  position:absolute;
  height: 100%;
}

.state-col {
  margin-left: 33%;
  box-sizing: border-box;
  vertical-align: top;
  width: 66%;
  display: inline-block;
  overflow:hidden;
}

.state-col textarea {
  padding: 0.5em;
  width: 100%;
  height: 100%;
  min-height: 420px;
  border: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  overflow: hidden;
}

.btn-control {
  background: #8c8c8c;
  color: #ffffff;
  padding: 4px 8px;
  display: inline-block;
  width: auto;
  border-radius: 8px;
  margin-left: 4px;
}
.btn-control:hover {
  color: #777;
  background: #eee;
}
`

module.exports = {
  popupStyle,
  btnStyle
}
