//import container from "../../../../../../app/dependency-injection";
import NodeAppService from "../NodeAppService";

jest.mock('fs', () => ({
    promises: {
      writeFile: jest.fn(),
      readFile: jest.fn()
    },
  }));

describe('Service Test',() => {
    let nodeAppService: any;

    beforeAll(()=>{
        nodeAppService = new NodeAppService;
    });

    afterEach(()=>{
        jest.clearAllMocks();
    });

    it('Should return an object for readfile', async ()=>{
        const res = await nodeAppService.readNodeAppFile("mock_application.json");
        expect(res._id).toBe("61e8666b010a37023e3d99a3");
    });

    it('Should return a unique object from simple object', ()=>{
        const duplicatedObjectArray = [{key:"1", value:"value1"}, {key:"1", value:"value2"}];
        const res = nodeAppService.cleanDuplicageFields(duplicatedObjectArray,"key");
        expect(res[0].value).toBe("value1");
    });

    
    it('Should return unique items and objects for nested object',()=>{
        const duplicatedObjectArray = [{key:"1", value:"value1"}, {key:"1", value:"value2"}];
        const nestedArray = [{
            parentID: "1", value:"1", objects:duplicatedObjectArray
        },{parentID: "1", value:"2", objects:duplicatedObjectArray}];
        const res = nodeAppService.cleanDuplicateObjects(nestedArray, "objects","parentID","key");
        expect(res[0].value).toBe("1");
    });

    it('Should cleanDuplicateObjects throw an error',()=>{
        try {
            jest.spyOn(nodeAppService,"cleanDuplicateObjects").mockImplementationOnce(()=>{
                throw new Error("Error cleaningDuplicate");
            });
            nodeAppService.cleanDuplicateObjects([], "objects","parentID","key");
        } catch (error: any){
            expect(error.message).toContain("Error cleaningDuplicate");
        }
    });

    it('Should cleanNodeApp throw an error',()=>{
        try {
            jest.spyOn(nodeAppService,"cleanNodeApp").mockImplementationOnce(()=>{
                throw new Error("Error cleanNodeApp");
            });
            nodeAppService.cleanNodeApp({});
        } catch (error: any){
            expect(error.message).toContain("Error cleanNodeApp");
        }
    });

    it('Should return a valid object', async ()=>{
        const arrObjects = [{identifier:"1", fields:[{key:"1",value:"1"},{key:"1",value:"2"},{key:"2",value:"2"}]}];
        const arrScenes = [{key:"1", views:[{key:"1",value:"1"},{key:"1",value:"2"},{key:"2",value:"2"}]}];;
        const nodeApp = {id:"nodeApp", versions:[{objects:arrObjects, scenes:arrScenes}]};
        const res = await nodeAppService.cleanNodeApp(nodeApp);
        expect(res.id).toBe('nodeApp');
        expect(res.versions[0].objects[0].identifier).toBe("1");
        expect(res.versions[0].objects[0].fields.length).toBe(2);
    });

    it('Should write a new object', async()=>{
        const arrObjects = [{identifier:"1", fields:[{key:"1",value:"1"},{key:"1",value:"2"},{key:"2",value:"2"}]}];
        const arrScenes = [{key:"1", views:[{key:"1",value:"1"},{key:"1",value:"2"},{key:"2",value:"2"}]}];;
        const nodeApp = {id:"nodeApp", versions:[{objects:arrObjects, scenes:arrScenes}]};
        const res = await nodeAppService.writeNodeAppFile(nodeApp);
        expect(res).toBe(true);
    });

    it('Should return an error trying to save the file', async()=>{
        try {
        jest.spyOn(nodeAppService,"writeNodeAppFile").mockImplementationOnce(()=>{
            return Promise.reject("writeNodeAppFile");
        });
            await nodeAppService.writeNodeAppFile({});
        } catch (error: any){
            expect(error).toContain("writeNodeAppFile");
        }
    })
})