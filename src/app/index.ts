import container from './dependency-injection';

async function cleanJson(){
    const nodeAppController = container.get("Controllers.NodeAppController");
    const res = await nodeAppController.cleanNodeApp("mock_application.json");
    console.log(res ? "cleaning JSON success" : "Failed cleaning JSON");
}


cleanJson();