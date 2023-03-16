import NodeAppService from "../../contexts/shared/infrastructure/services/NodeApp/NodeAppService";
import container from '../dependency-injection';

export default class NodeAppController {
    private service: NodeAppService;

    constructor() {
        this.service = container.get("service.NodeAppService");
    }

    cleanNodeApp( nodeApp : String) {
        console.log(`Trying to clean the app ${nodeApp}`);
        this.service.readNodeAppFile(nodeApp);
    }
}