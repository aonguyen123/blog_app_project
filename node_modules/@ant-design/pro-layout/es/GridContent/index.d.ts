import './GridContent.less';
import React, { CSSProperties } from 'react';
import { Settings } from '../defaultSettings';
interface GridContentProps {
    contentWidth?: Settings['contentWidth'];
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
}
/**
 * This component can support contentWidth so you don't need to calculate the width
 * contentWidth=Fixed, width will is 1200
 * @param props
 */
declare const GridContent: React.SFC<GridContentProps>;
export default GridContent;
