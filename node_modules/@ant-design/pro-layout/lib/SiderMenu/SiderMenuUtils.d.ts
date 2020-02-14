import { MenuDataItem } from '../typings';
/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
export declare const getFlatMenuKeys: (menuData?: MenuDataItem[]) => string[];
/**
 * 获取打平的 menuData
 * 已 path 为key
 * @param menuData
 */
export declare const getFlatMenus: (menuData?: MenuDataItem[]) => {
    [key: string]: MenuDataItem;
};
/**
 * a-b-c
 * [
 *  "a",
 *  "a-b",
 *  "a-b-c"
 * ]
 * @param menuKey
 */
export declare const genKeysToArray: (menuKey: string) => string[];
export declare const getMenuMatches: (flatMenuKeys: string[] | undefined, path: string) => string | undefined;
export declare const getSelectedMenuKeys: (pathname: string, flatMenus: {
    [key: string]: MenuDataItem;
} | undefined, flatMenuKeys: string[]) => string[];
