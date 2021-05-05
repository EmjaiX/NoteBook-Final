var observableModule = require("tns-core-modules/data/observable");  // load observable module
exports.onLoaded = function(args) {
    var page = args.object;
    var home = new observableModule.fromObject({
        header: "Note Book",
        footer: "CIS 288 2021"
    });
    page.bindingContext = home;
}

exports.onTap = function(args){
    var frame = require("tns-core-modules/ui/frame").Frame;
    frame.topmost().navigate("views/note-p");
}