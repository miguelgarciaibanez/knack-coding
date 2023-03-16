import container from "../../dependency-injection";

describe("Controller TEST", ()=>{

    let nodeAppService: any;
    let nodeAppController: any;

    beforeAll(()=>{
        nodeAppService = container.get("service.NodeAppService")
        nodeAppController = container.get("Controllers.NodeAppController");
    });

    afterEach(()=>{
        jest.clearAllMocks();
    });

    it('Should return true', async()=>{
        jest.spyOn(nodeAppService,"readNodeAppFile").mockResolvedValueOnce({
            _id:"kmalñkdj"
        });
        jest.spyOn(nodeAppService,"cleanNodeApp").mockResolvedValueOnce({
            _id:"kmalñkdj"
        });
        jest.spyOn(nodeAppService,"writeNodeAppFile").mockResolvedValueOnce({
            _id:"kmalñkdj"
        });

        const result = await nodeAppController.cleanNodeApp("file");
        expect(result).toBe(true);
    });

    it('Should return error', async()=>{
        try {
            jest.spyOn(nodeAppService,"readNodeAppFile").mockImplementationOnce(()=>{
                return Promise.reject("readingNodeappfile");
            });
            await nodeAppController.cleanNodeApp("file");
        } catch (error: any){
            expect(error.message).toContain("readingNodeappfile");
        }
    })

})