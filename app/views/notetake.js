var observable = require("tns-core-modules/data/observable");
var frame = require("tns-core-modules/ui/frame").Frame;
var fileSystemService = require("~/data/fileSystemService");
var camera = require("nativescript-camera");
var imageSource = require("~/data/fileSystemService")
var geolocation = require("nativescript-geolocation")

exports.onLoaded = function(args){
    var page = args.object;
    
    var notep = page.navigationContext.model;

    // Set the binding context of the page to the page that was selected from the list view
    page.bindingContext = notep;
};

exports.onDoneTap = function(args){
    var page = args.object;
    var notep = page.bindingContext;
    fileSystemService.fileSystemService.savePage(notep);
    frame.topmost().navigate({
        moduleName: "views/note-p",
    });
};

exports.onTakePicTap = function (args){
    var page = args.object;
    var notep = page.bindingContext;

    geolocation.isEnabled().then(function (enabled){
        if(!enabled){
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
    }).then(function (picture){
        imageSource.fromAsset(picture).then(function (imageSource){
            notep.set("image",imageSource);
        });

        gelolocation.getCurrentLocation().then(function (location){
            notep.set("lat", location.latitude);
            notep.set("lon", location.longitude);
        });
    });

};