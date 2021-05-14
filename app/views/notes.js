var Observable = require("tns-core-modules/data/observable"); // load observable module 123
var frame = require("tns-core-modules/ui/frame").Frame;

exports.onNavigatingTo = function(args) {
    var page = args.object;

    const home = new Observable.Observable();
    home.header = "Note Book";
    home.footer = "CIS 288 2021";
    home.Continue = () => {
        console.log("helloworld");
        frame.topmost().navigate({
            moduleName: "views/note-p",
            animated: true,
            transition: {
                name: "slideright",
                duration: 500,
                curve: "easeIn" //transition
            }
        });
    }
    home.About = () => {
        frame.topmost().navigate({
            moduleName: "views/note-p",
            animated: true,
            transition: {
                name: "slideright",
                duration: 500,
                curve: "easeIn" //transition
            }
        });
    }
    page.bindingContext = home;
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