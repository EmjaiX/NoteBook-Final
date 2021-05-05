/* Each NativeScript app has common folders thatn we can access using the file system module - called known folders.  There are two different known folders: documents and temp.

Methods to input and output into text file:
- writeText() 
- readTextSync()

*/


// load the file system module
var fileSystem = require("tns-core-modules/file-system");
var imageSource = require("tns-core-modules/image-source");

var fileSystemService = function() {
    // Use the documents folder to store offline files that the app needs
    this.file = fileSystem.knownFolders.documents().getFile("notes.json");
};

/************************************************************************
 * getPages()
 * A method to retrieve the pages from the file system. It reads scrapbook 
 * data from the file system and parses it into an array of scrapbook pages.
 **************************************************************************/
fileSystemService.prototype.getPages = function () {
    var pages = [];

    if (this.file.readTextSync().length !== 0){
        // parsing the JSON into objects
        pages = JSON.parse(this.file.readTextSync()); 
    }
    pages.forEach(function(page){
        if(page.imageBase64 != null){
            page.image = imageSource.fromBase64(page.imageBase64);
        }
    })
    return pages;
}

/**********************************************************************
* savePage()
* A method to save pages to the file system. It saves a single scrapbook 
* page to the file system, and contains rudimentary business logic to 
* check if the page already exists to determine if the page is updated or added
************************************************************************/
fileSystemService.prototype.savePage = function(notes){
    var pages = this.getPages();

    // determine if the page already exists so we can update it
    // The findIndex() method returns the index of the first element 
    // in an array that pass a test (provided as a function).
    var index = pages.findIndex(function(element) {
        return element.id === notes.id;
    });
    if(index !== -1) {  // when page is found
        pages[index] = { // update the entry within the array
            text: notes.text
        };
    }
    else { // otherwise, add an entry for the page into the array.
        pages.push({
            text: notes.text
        });
    }
    // Convert objects to JSON and save to the file system
    var json = JSON.stringify(pages);
    this.file.writeTextSync(json);
};

exports.fileSystemService = new fileSystemService();