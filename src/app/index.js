const file = require('../contexts/shared/resources/mock_application.json');
import container from './dependency-injection/index.js';

function cleanJson(){
    const nodeAppController = container.get("Controllers.NodeAppControllerJS");
    //nodeAppController.cleanNodeApp("test file");
    console.log("cleaning JSON");
    console.log(file._id);
}


cleanJson();