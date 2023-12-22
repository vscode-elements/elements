import { generateVsCodeCustomElementData } from "custom-element-vs-code-integration";
import manifest from "../custom-elements.json" assert { type: "json" };

const options = {};

generateVsCodeCustomElementData(manifest, options);
