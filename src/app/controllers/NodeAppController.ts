import NodeAppService from "../../contexts/shared/infrastructure/services/NodeApp/NodeAppService";
import container from '../dependency-injection';

export default class NodeAppController {
    private service: NodeAppService;

    constructor() {
        this.service = container.get("service.NodeAppService");
    }

    async cleanNodeApp( nodeApp : String): Promise<boolean> {
        try {
            const origNodeApp = await this.service.readNodeAppFile(nodeApp);
            const appCleant = await this.service.cleanNodeApp(origNodeApp);
            await this.service.writeNodeAppFile(appCleant);
            return true;
        } catch (error) {
            //console.error(`ERROR cleaning nodeApp:${(error as any).message}.`);
            return false;
        }
    }
}