const img_paste = require('../lib/img-paste');

describe("img_paste", function () {
    let activationPromise, workspaceElement, _ref;
    _ref = [];
    workspaceElement = _ref[0];
    activationPromise = _ref[1];

    beforeEach(function () {
        workspaceElement = atom.views.getView(atom.workspace);
        return activationPromise = atom.packages.activatePackage('img_paste');
    });
    return describe("when the img_paste:toggle event is triggered", function () {
        it("hides and shows the modal panel", function () {
            expect(workspaceElement.querySelector('.img_paste')).not.toExist();
            atom.commands.dispatch(workspaceElement, 'img_paste:toggle');
            waitsForPromise(function () {
                return activationPromise;
            });
            return runs(function () {
                let img_pasteElement, img_pastePanel;
                expect(workspaceElement.querySelector('.img_paste')).toExist();
                img_pasteElement = workspaceElement.querySelector('.img_paste');
                expect(img_pasteElement).toExist();
                img_pastePanel = atom.workspace.panelForItem(img_pasteElement);
                expect(img_pastePanel.isVisible()).toBe(true);
                atom.commands.dispatch(workspaceElement, 'img_paste:toggle');
                return expect(img_pastePanel.isVisible()).toBe(false);
            });
        });
        return it("hides and shows the view", function () {
            jasmine.attachToDOM(workspaceElement);
            expect(workspaceElement.querySelector('.img_paste')).not.toExist();
            atom.commands.dispatch(workspaceElement, 'img_paste:toggle');
            waitsForPromise(function () {
                return activationPromise;
            });
            return runs(function () {
                let img_pasteElement;
                img_pasteElement = workspaceElement.querySelector('.img_paste');
                expect(img_pasteElement).toBeVisible();
                atom.commands.dispatch(workspaceElement, 'img_paste:toggle');
                return expect(img_pasteElement).not.toBeVisible();
            });
        });
    });
});
