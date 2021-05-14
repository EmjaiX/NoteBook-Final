var observableModule = require("tns-core-modules/data/observable"); // load observable module
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

/*<!--
  Add a new note to the gallery :::: almost completed
  Remove a note from the gallery, :::: not completed
  Edit the content of a note, which may include text, images, and other content of your choice :::: almost completed
  Email/share a note :::: not completed
  Search a note :::: only implemented but not functional
  2 additional features: geolocation and a switch but i think we should add more to be safe
  The continue button is messed up
-->*/