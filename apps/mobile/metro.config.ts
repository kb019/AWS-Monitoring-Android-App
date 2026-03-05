// Learn more https://docs.expo.io/guides/customizing-metro
import type {MetroConfig} from "expo/metro-config";
import type { PathLike, Dirent } from "fs";
import type PathType from "path";

const { getDefaultConfig } = require('expo/metro-config');
const path:typeof PathType = require('path');
const { mergeConfig } = require('metro-config');
const {readdirSync,existsSync} = require("fs");
const _walker = _interopRequireDefault(require("walker"));

const defaultConfig:MetroConfig = getDefaultConfig(__dirname);

function _interopRequireDefault(e:any) {
  return e && e.__esModule ? e : { default: e };
}

const getDirectories = (source:PathLike,shouldPackageJsonExsist:Boolean) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent:Dirent) => shouldPackageJsonExsist?dirent.isDirectory() && existsSync(path.resolve(source as string,dirent.name,"package.json")):dirent.isDirectory())
    .map((dirent:Dirent) => dirent.name)


function addDirectoriesUnderBuild(dir:string){
    return new Promise<void>((resolve,reject)=>{
            const walk = (0, _walker.default)(dir);
            walk.on("dir",(dir:string)=>{
                watchFolders.push(path.resolve(dir));
            }).on("error",(err:Error)=>reject(err))
            .on("end",()=>resolve());
    })
}

const workspaceRootNodeModules:PathLike=path.resolve(__dirname +'../../../node_modules');
const externalPackgesPath:PathLike = path.resolve(__dirname + '../../../packages');
const watchFolders:PathLike[] = []
const externalPackages:string[] = getDirectories(externalPackgesPath,true);

module.exports =(async ()=>{
    //add external Packages and their dependency to watch folder
    for(const externalPackage of externalPackages ){
        const externalPackageModulePath = path.resolve(workspaceRootNodeModules,externalPackage);
        if(existsSync(externalPackageModulePath)){
            watchFolders.push(path.resolve(workspaceRootNodeModules,externalPackage));
        }
        const packageJson = require(path.resolve(externalPackgesPath,externalPackage,"package.json"))
        const dependencies = packageJson.dependencies;
    
        for(const dependency in dependencies){
            const externalDependentPackagePath = path.resolve(workspaceRootNodeModules,dependency);
            if(existsSync(externalDependentPackagePath)){
                watchFolders.push(path.resolve(workspaceRootNodeModules,dependency));
            }
        }

        // //add all files under the build folder 
        const buildOutputFolder:string[] = (packageJson.main ?? packageJson.browser).split("/");
        const buildFolderPath:PathLike = path.resolve(externalPackageModulePath,buildOutputFolder[0]);
        await addDirectoriesUnderBuild(buildFolderPath);
   }

    const config ={
        watchFolders:watchFolders
        }
   return mergeConfig(defaultConfig,config);
    
})();
