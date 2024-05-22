/**
 * A Resource Item is a media object like image, audio. It is used by the Resources class
 * during the preload phase of the engine loading.
 */

import { Component } from "./components";
import { Debug } from "./debug";

export type ResourceType = "image" | "audio";

/**
 * Arguments for  ResourceItem constructor
 */
export interface ResourceItemArgs {
  /**
   * url of the resource
   */
  url: string;

  /**
   * type of the resource
   */
  type: ResourceType;

  /**
   * name of the resource to use in the resources dictionary
   */
  name: string;
}

export class ResourceItem {
  /**
   * url of the resource
   */
  url: string;

  /**
   * type of the resource
   */
  type: ResourceType;

  /**
   * name of the resource to use in the resources dictionary
   */
  name: string;

  /**
   * buffer of the resource
   */
  buffer: any;

  /**
   * item of the resource
   */
  item: any;

  constructor(params: ResourceItemArgs) {
    Debug.validateParams("Resources.add", params, ["url", "type", "name"]);
    this.url = params.url;
    this.type = params.type;
    this.name = params.name;
    this.buffer = {};
    this.item = {};
  }

  /**
   * Load the resource
   * @returns Promise to load the resource
   */
  load = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(this.url);
      if (!response.ok) {
        Debug.error(`Error loading ${this.name}`);
        reject();
      }
      const blob = await response.blob();
      this.buffer = blob;
      this.item = new Image();
      this.item.onload = () => {
        resolve();
      };
      this.item.src = window.URL.createObjectURL(blob);
      Debug.info(`Success loading ${this.name}`);
    });
  };
}

/**
 * Resources component is set of the images and audio resources of the game.
 * It handles adding and getting the resources by a name and also the preload phase of the engine loading.
 */
export class Resources extends Component {
  items: Record<string, ResourceItem> = {};

  /**
   * Add a resource to the resources dictionary
   * @param params Arguments for the ResourceItem constructor
   */
  add(params: ResourceItemArgs) {
    if (typeof this.items[params.name] !== "undefined") {
      Debug.warn(`Resource ${params.name} is already defined`);
    }
    this.items[params.name] = new ResourceItem(params);
  }

  /**
   * Get a resource by name
   * @param name of the resource
   * @returns the resource
   */
  get(name: string): any {
    return this.items[name].item;
  }

  /**
   * Remove a resource by name
   * @param name of the resource
   */
  remove(name: string): void {
    delete this.items[name];
  }

  /**
   * Preload all resources
   */
  async preload() {
    Debug.groupStart("Preloading Resources");
    try {
      await Promise.all(Object.values(this.items).map((item) => item.load()));
    } catch (e: any) {
      Debug.error(e?.message);
    }
    Debug.groupEnd();
  }
}
