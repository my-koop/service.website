
function getModuleDefinitions(
  options: {
    searchNodeModules: boolean;
    excludes: string[];
  },
  callback: (err: Error, modulesDefinitions: mykoop.ModuleDefinition[]) => void
) {
  var modules = require("../../modules.json5");
  callback(null, modules.modules);
}
export = getModuleDefinitions;
