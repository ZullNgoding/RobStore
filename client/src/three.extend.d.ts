declare module "three/examples/jsm/loaders/GLTFLoader" {
    import { Loader } from "three";
    import { Group } from "three";
  
    export class GLTFLoader extends Loader {
      load(
        url: string,
        onLoad: (gltf: GLTF) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
      ): void;
    }
  
    export interface GLTF {
      scene: Group;
      scenes: Group[];
      animations: any[];
      asset: object;
    }
  }