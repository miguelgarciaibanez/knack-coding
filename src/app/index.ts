import container from './dependency-injection';

function cleanJson(){
    const nodeAppController = container.get("Controllers.NodeAppController");
    nodeAppController.cleanNodeApp("test file");
    console.log("cleaning JSON");
}


cleanJson();