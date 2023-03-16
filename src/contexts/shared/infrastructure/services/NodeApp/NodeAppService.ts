const fs = require('fs/promises');

export default class NodeAppService {
    async readNodeAppFile( appFile: String):Promise<Object> {
        try {
            const fileUri = `${__dirname}/../../../resources/${appFile}`;
            const json = await fs.readFile(fileUri);
            const nodeAppOrig = JSON.parse(json);
            return nodeAppOrig;
        } catch (error: any) {
            throw new Error(`ERROR reading file:${appFile}`);
        }
    }

    async writeNodeAppFile (nodeApp: Object ):Promise<boolean> {
        try {
            await fs.writeFile(`${__dirname}/../../../resources/application-clean.json`, JSON.stringify(nodeApp), 'utf8');
            return true;
        } catch( error ) {
            throw new Error(`ERROR writing file`)
        }
    }

    async cleanNodeApp (nodeApp: any): Promise<Object> {
        try {
            let newversions: any[] = [];
            let nodeAppNew = JSON.parse(JSON.stringify(nodeApp));
            nodeApp.versions.map( (version: any) => {
                let newVersion = JSON.parse(JSON.stringify(version));
                let cleanObjects = this.cleanDuplicateObjects(version.objects, "fields", "identifier","key");
                let cleanScenes = this.cleanDuplicateObjects(version.scenes, "views", "key","key");
                newVersion.objects = cleanObjects;
                newVersion.scenes = cleanScenes;
                newversions.push(newVersion);
            });
            nodeAppNew.versions = newversions;
            return nodeAppNew;
        } catch (error) {
            throw new Error(`ERROR cleaning nodeApp:${(error as any).message}.`);
        }
    }

    cleanDuplicateObjects( objectArray:Array<any>, nestedAttribute: string, objectKey: string, nestedKey: string ):Array<Object>{
        try {
            let uniqueObjects = Array.from(new Set(objectArray.map(a => a[objectKey])))
                .map(id => {
                    return objectArray.find(a => a[objectKey] === id)
                });
            uniqueObjects.map( object => {
                const newFields = this.cleanDuplicageFields(object[nestedAttribute], nestedKey);
                object[nestedAttribute] = newFields;
            });
            return uniqueObjects;
        } catch (error) {
            throw new Error(`ERROR cleanDuplicates:${(error as any).message}.`);
        }
    }

    cleanDuplicageFields( fieldArray:Array<any>, objectKey: string ):Array<any>{
        let uniqueFields = Array.from(new Set(fieldArray.map(a => a[objectKey])))
                .map(id => {
                    return fieldArray.find(a => a[objectKey] === id)
                })
        return uniqueFields;
    }
}