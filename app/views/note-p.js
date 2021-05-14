var Observable = require("tns-core-modules/data/observable");
var observableArray = require("tns-core-modules/data/observable-array");
var frame = require("tns-core-modules/ui/frame").Frame;
var fileSystemService = require("../files/fileSystemService");

// create a model for the scrapbook page
function pageModel(id) { // require an id to create a page
    var model = new Observable.Observable();

    // model.id = id;
    console.log(id);
    return model;
}

exports.onLoaded = function(args) {
    var page = args.object;

    var notes = new Observable.Observable();
    //    pages: new observableArray.ObservableArray()


    // load the array of pages from file system
    notes.pages = fileSystemService.fileSystemService.getPages();
    // Implement the event handler for action item on tap
    notes.onAddTap = () => {
        frame.topmost().navigate({
            moduleName: "views/notetake",
            //Pass data to the update page
            context: { model: new pageModel(notes.pages.length) }
        });
    };

    notes.onClearTap = () => {
        while (addressbook.pages.length !== 0) {
            notes.pages.pop();
        }
        fileSystemService.fileSystemService.clearPages();
    }

    // Implementation of the list item tap event handler
    notes.onItemTap = () => {
        frame.topmost().navigate({
            moduleName: "views/notetake",
            // Pass the scrapbook model and index of the page we want 
            // to update to the page we are navigating to
            context: { model: notes.pages.getItem(args.index) }
        });
    };

    // if (notes.pages.length !== 0) {
    //     notes.pages.forEach(function(item) {
    //         // create an observable object and set the properties
    //         var model = new pageModel(item.id);
    //         model.text = item.text;
    //         notes.pages.push(model);
    //     });
    // }

    page.bindingContext = notes;
};



/*<!--
  Add a new note to the gallery :::: almost completed
  Remove a note from the gallery, :::: not completed
  Edit the content of a note, which may include text, images, and other content of your choice :::: almost completed
  Email/share a note :::: not completed
  Search a note :::: only implemented but not functional
  2 additional features: geolocation and a switch but i think we should add more to be safe
  The continue button is messed up
-->*/