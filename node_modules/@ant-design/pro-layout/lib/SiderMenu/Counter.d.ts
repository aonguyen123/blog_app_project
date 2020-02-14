/// <reference types="react" />
import { MenuDataItem } from '../typings';
declare const MenuCounter: import("unstated-next").Container<{
    flatMenus: {
        [key: string]: MenuDataItem;
    } | undefined;
    setFlatMenus: import("react").Dispatch<import("react").SetStateAction<{
        [key: string]: MenuDataItem;
    } | undefined>>;
    flatMenuKeys: string[];
    setFlatMenuKeys: import("react").Dispatch<import("react").SetStateAction<string[]>>;
}, void>;
export default MenuCounter;
