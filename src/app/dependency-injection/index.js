import { ContainerBuilder, YamlFileLoader} from "node-dependency-injection";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log("Dirname:", __dirname);

const container = new ContainerBuilder();

const loader = new YamlFileLoader(container);

loader.load(`${__dirname}/application.yaml`);

export default container;