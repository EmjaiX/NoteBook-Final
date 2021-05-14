/*

<Button text="Delete" tap="del" />

exports.del = function (args) {
    var page = args.object;
    var bookPage = page.bindingContext;

    //something to refer to the function in FilesystemService
    fileSystemService.fileSystemService.delPage(bookPage);

    frame.topmost().navigate({
        moduleName: "home/home-page",
        animated: true,
        transition: {
            name: "slideright",
            duration: 500,
            curve: "easeIn" //transition
        }
    });
};

*/