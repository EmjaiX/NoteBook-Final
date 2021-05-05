var observable = require("tns-core-modules/data/observable");
var observableArray = require("tns-core-modules/data/observable-array");
var frame = require("tns-core-modules/ui/frame").Frame;
var fileSystemService = require("~/data/fileSystemService");

// create a model for the scrapbook page
function pageModel (id) { // require an id to create a page
    var model = new observable.Observable();

    model.id = id;
    return model;
}

exports.onLoaded = function(args) {
    var page = args.object;
    
    var scrapbook = new observable.fromObject({
            pages:new observableArray.ObservableArray()
    });

    // load the array of pages from file system
    var pages = fileSystemService.fileSystemService.getPages();

    if (pages.length !== 0){
        pages.forEach(function (item) {
            // create an observable object and set the properties
            var model = new pageModel(item.id);
            model.text = item.text;
            scrapbook.pages.push(model);
        });
    }

    page.bindingContext = notes;
};

// Implementation of the list item tap event handler
exports.onItemTap = function(args){
    var page= args.object;
    var notes = page.bindingContext;
    frame.topmost().navigate({
        moduleName: "views/notetake",
        // Pass the scrapbook model and index of the page we want 
        // to update to the page we are navigating to
        context: {model: notes.pages.getItem(args.index)} 
    });
};

// Implement the event handler for action item on tap
exports.onAddTap = function(args){
    var page=args.object;
    var notes = page.bindingContext;
    
    frame.topmost().navigate({
        moduleName: "views/notetake",
        //Pass data to the update page
        context: {model: new pageModel(notes.pages.length) } 
    });
};

exports.onClearTap = function (args) {
    var page = args.object;
    var addressbook = page.bindingContext;
    while (addressbook.pages.length !== 0) {
      addressbook.pages.pop();
    }
  
    fileSystemService.fileSystemService.clearPages();
  }

