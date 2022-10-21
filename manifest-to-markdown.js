import fs from 'fs';
import { customElementsManifestToMarkdown } from '@custom-elements-manifest/to-markdown';

const manifest = JSON.parse(fs.readFileSync('./custom-elements.json', 'utf-8'));
const markdown = customElementsManifestToMarkdown(manifest);

fs.writeFileSync('./custom-elements.md', markdown);
