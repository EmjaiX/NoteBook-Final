var observable = require("tns-core-modules/data/observable");
var frame = require("tns-core-modules/ui/frame").Frame;
var fileSystemService = require("../files/fileSystemService");
var camera = require("nativescript-camera");
var imageSource = require("../files/fileSystemService")
var geolocation = require("nativescript-geolocation")

exports.onLoaded = function(args) {
    var page = args.object;

    var notep = page.navigationContext.model;


    notep.onDoneTap = () => {
        fileSystemService.fileSystemService.savePage(notep);
        frame.topmost().navigate({
            moduleName: "views/note-p",
        });
    };

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
            imageSource.fromAsset(picture).then(function(imageSource) {
                notep.set("image", imageSource);
            });

            gelolocation.getCurrentLocation().then(function(location) {
                notep.set("lat", location.latitude);
                notep.set("lon", location.longitude);
            });
        });

    };

    // Set the binding context of the page to the page that was selected from the list view
    page.bindingContext = notep;
};

exports.onShareTap = function(args) 
{
    var page=args.object;
    var scrapbook = page.bindingContext;
    var image =scrapbook.image;

    var pic = imageSource.fromFile("~/images/animals.png");

    SocialShare.shareImage(image);
    SocialShare.shareText("Last week of class");
    SocialShare.shareUrl("http://www.google.com", "Google");

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