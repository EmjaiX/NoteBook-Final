var observable = require("tns-core-modules/data/observable");
var frame = require("tns-core-modules/ui/frame").Frame;
var fileSystemService = require("../files/fileSystemService");
var camera = require("nativescript-camera");
var imageSource = require("../files/fileSystemService");
var geolocation = require("nativescript-geolocation");
var SocialShare = require("nativescript-social-share");
/// alote ot stufs
//way more stffs

exports.onLoaded = function(args) {
    var page = args.object;
    var notep = page.navigationContext.model.note;

    notep.text = notep.text;
    notep.title = notep.title;
    notep.image = notep.imageBase64;
    notep.onShareTap = () => {
        SocialShare.shareText(notep.title + " : " + notep.text);
    };

    notep.onDoneTap = () => {
        // if(fileSystemService.fileSystemService.nameTaken(notep.title)){
        //     notep.title
        // }
        // else{
        fileSystemService.fileSystemService.addNote(notep);
        frame.topmost().navigate({
            moduleName: "views/note-p",
        });
        // }
    };
    notep.del = () => {


        fileSystemService.fileSystemService.delNote(notep);
        frame.topmost().navigate({
            moduleName: "views/note-p",
        });
    }

    notep.onTakePicTap = () => {

        geolocation.isEnabled().then(function(enabled) {
            if (!enabled) {
                geolocation.enableLocationRequest();
            }
        });

        //getting permission before accessing the camera
        camera.requestPermissions();

        camera.takePicture({
            width: 80,
            height: 100,
            keepAspectRatio: true,
            saveToGallery: true
        }).then((picture) => {
            console.log("here")
            imageSource.fromAsset(picture).then(function(image) {
                notep.image = image;
            });
            console.log("here1211")

            // gelolocation.getCurrentLocation().then(function(location) {
            //     notep.lat = location.latitude;
            //     notep.lon = location.longitude;
            // });
        });

    };

    // Set the binding context of the page to the page that was selected from the list view
    page.bindingContext = notep;
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