# Content
This document contains indication and comments about content generation and creation. Currently is just a recap of how the structure of the website is generated, starting from the information given. The section [Refactoring](#refactoring) below gives indication on how will evolve content generation.

## How content is generated
We use a four levels content organization within `materie` folder
1. *subject* is the short name of the subject
2. *year* is the school year (1 to 5) of the content
3. *module* refers to topics
4. *lecture* are for single lectures

Each of the above sections has content that is generated from the configuration file(s), which is currently represented by the `Subjects` object within the `site.config.ts`.

## Refactoring

- The actual slug of modules is not read from the `slug` property of the module, but is generated using model `id` (see in `getModuleParams` in `slugHelpers`). This is convenient and will be maintained, but the `slug` parameter should be removed from the configuration file and computed dynamically (it is currently used to fill links).
-  Move configuration into JSON file(s) instead of having a hardcoded object in `site.config.ts`.