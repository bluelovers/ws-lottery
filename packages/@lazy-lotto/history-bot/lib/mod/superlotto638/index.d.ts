import PlaywrightBrowser, { EnumPlaywrightBrowserType } from 'playwright-class';
import Bluebird from 'bluebird';
export declare function doTask(pb?: PlaywrightBrowser): Bluebird<PlaywrightBrowser<EnumPlaywrightBrowserType.webkit>>;
declare const _default: Bluebird<PlaywrightBrowser<EnumPlaywrightBrowserType.webkit>>;
export default _default;
