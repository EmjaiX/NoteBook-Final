const Observable = require("tns-core-modules/data/observable").Observable;

const createViewModel = require("./main-view-model").createViewModel;

function createViewModel() {
    const viewModel = new Observable();

    viewModel.onTap = () => {
        console.log("hello");
    };

    return viewModel;
}

function onNavigatingTo(args) {

    const page = args.object;


    page.bindingContext = createViewModel();
}


exports.onNavigatingTo = onNavigatingTo;