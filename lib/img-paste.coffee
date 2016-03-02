{dirname, join} = require 'path'
fs = require 'fs'
clipboard = require 'clipboard'

module.exports =
  activate: (state)->
    attachEvent()

attachEvent = ->
  ws = atom.views.getView atom.workspace
  ws.addEventListener 'keydown', (evt)->
    if evt.metaKey and evt.altKey and evt.ctrlKey and evt.keyCode is 86 and not (evt.shiftKey)
      img = clipboard.readImage()
      if img.isEmpty()
        return
      else
        cursor = atom.workspace.getActiveTextEditor()
        fileName = "img-paste-#{formatDate(new Date())}.png"
        fs.writeFile join(dirname(cursor.getPath()), fileName), img.toPng(), ->
          console.info 'Ok! Image is saved'
        cursor.insertText "![#{fileName}](#{fileName})"

forceTwoDigits = (val) ->
  if val < 10
    return "0#{val}"
  return val

formatDate = (date) ->
  year = date.getFullYear()
  month = forceTwoDigits(date.getMonth()+1)
  day = forceTwoDigits(date.getDate())
  hour = forceTwoDigits(date.getHours())
  minute = forceTwoDigits(date.getMinutes())
  second = forceTwoDigits(date.getSeconds())
  ms = forceTwoDigits(date.getMilliseconds())
  return "#{year}#{month}#{day}#{hour}#{minute}#{second}#{ms}"
