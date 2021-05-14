var Observable = require("tns-core-modules/data/observable");
var frame = require("tns-core-modules/ui/frame").Frame;


exports.onLoaded = function(args) {
    var page = args.object;

    var notes = new Observable.Observable();
    //    pages: new observableArray.ObservableArray()

    notes.Back = () => {
        frame.topmost().navigate({
            moduleName: "views/notes",
        });
    };

    page.bindingContext = notes;
};