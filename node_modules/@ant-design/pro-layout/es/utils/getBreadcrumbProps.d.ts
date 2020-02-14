import H from 'history';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/es/breadcrumb';
import { Settings } from '../defaultSettings';
import { MenuDataItem, MessageDescriptor } from '../typings';
export interface BreadcrumbProps {
    breadcrumbList?: {
        title: string;
        href: string;
    }[];
    home?: string;
    location?: H.Location | {
        pathname?: string;
    };
    menu?: Settings['menu'];
    breadcrumbMap?: Map<string, MenuDataItem>;
    formatMessage?: (message: MessageDescriptor) => string;
    breadcrumbRender?: (routers: AntdBreadcrumbProps['routes']) => AntdBreadcrumbProps['routes'];
    itemRender?: AntdBreadcrumbProps['itemRender'];
}
export declare const getBreadcrumb: (breadcrumbMap: Map<string, MenuDataItem>, url: string) => MenuDataItem;
export declare const getBreadcrumbFromProps: (props: BreadcrumbProps) => {
    location: H.Location<H.History.PoorMansUnknown> | {
        pathname?: string | undefined;
    } | undefined;
    breadcrumbMap: Map<string, MenuDataItem> | undefined;
};
export declare type BreadcrumbListReturn = Pick<AntdBreadcrumbProps, Extract<keyof AntdBreadcrumbProps, 'routes' | 'itemRender'>>;
/**
 * 将参数转化为面包屑
 * Convert parameters into breadcrumbs
 */
export declare const genBreadcrumbProps: (props: BreadcrumbProps) => import("antd/es/breadcrumb/Breadcrumb").Route[] | undefined;
export declare const getBreadcrumbProps: (props: BreadcrumbProps) => Pick<AntdBreadcrumbProps, "routes" | "itemRender">;
