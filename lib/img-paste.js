const path = require('path'),
    dirname = path.dirname,
    join = path.join;
const fs = require('fs');
const clipboard = require('clipboard');

function attachEvent() {
    let ws = atom.views.getView(atom.workspace);
    return ws.addEventListener('keyup', function (evt) {
        if ((evt.shiftKey && evt.altKey && evt.ctrlKey && evt.keyCode === 86 && !evt.metaKey) || (evt.shiftKey && evt.cmdKey && evt.ctrlKey && evt.keyCode === 86 && !evt.metaKey)) {
            let img = clipboard.readImage();
            if (!img.isEmpty()) {
                let cursor = atom.workspace.getActiveTextEditor();
                let timestamp = formatDate(new Date());
                let fileName = `img-paste-${timestamp}.png`;
                fs.writeFile(join(dirname(cursor.getPath()), fileName), img.toPNG(), function () {
                    return console.info('Ok! Image is saved');
                });
                return cursor.insertText("![" + timestamp + "](" + fileName + ")");
            }
        }
    });
}

function pad2(val) {
    return val < 10 ? '0' + val : val;
}

function formatDate(date) {
    let day, hour, minute, month, ms, second, year;
    year = date.getFullYear();
    month = pad2(date.getMonth() + 1);
    day = pad2(date.getDate());
    hour = pad2(date.getHours());
    minute = pad2(date.getMinutes());
    second = pad2(date.getSeconds());
    ms = pad2(date.getMilliseconds());
    return '' + year + month + day + hour + minute + second + ms;
}

module.exports = {
    activate: () => {
        attachEvent();
    }
};
