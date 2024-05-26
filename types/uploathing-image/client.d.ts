import { F as FileRouter, i as inferEndpointInput } from './types-e8f81bbc.js';
import * as _uploadthing_shared from '@uploadthing/shared';
import { ExpandedRouteConfig } from '@uploadthing/shared';
import { ReactNode, CSSProperties } from 'react';
import { JSX } from 'solid-js/jsx-runtime';

/**
 * Shared helpers for our premade components that's reusable by multiple frameworks
 */
declare const generatePermittedFileTypes: (config?: ExpandedRouteConfig) => {
  fileTypes: _uploadthing_shared.FileRouterInputKey[];
  multiple: boolean;
};
declare const capitalizeStart: (str: string) => string;
declare const INTERNAL_doFormatting: (config?: ExpandedRouteConfig) => string;
declare const allowedContentTextLabelGenerator: (
  config?: ExpandedRouteConfig
) => string;
type AnyRuntime = 'react' | 'solid';
type MinCallbackArg = {
  __runtime: AnyRuntime;
};
type inferRuntime<T extends MinCallbackArg> = T['__runtime'] extends 'react'
  ? 'react'
  : 'solid';
type ElementEsque<TRuntime extends AnyRuntime> = TRuntime extends 'react'
  ? ReactNode
  : JSX.Element;
type CSSPropertiesEsque<TRuntime extends AnyRuntime> = TRuntime extends 'react'
  ? CSSProperties
  : JSX.CSSProperties;
type StyleField<
  CallbackArg extends MinCallbackArg,
  TRuntime extends AnyRuntime = inferRuntime<CallbackArg>,
> =
  | string
  | CSSPropertiesEsque<TRuntime>
  | ((
      arg: Omit<CallbackArg, '__runtime'>
    ) => string | CSSPropertiesEsque<TRuntime>);
type ContentField<
  CallbackArg extends MinCallbackArg,
  TRuntime extends AnyRuntime = inferRuntime<CallbackArg>,
> =
  | ElementEsque<TRuntime>
  | ((arg: Omit<CallbackArg, '__runtime'>) => ElementEsque<TRuntime>);
declare const styleFieldToClassName: <T extends MinCallbackArg>(
  styleField: StyleField<T, inferRuntime<T>> | undefined,
  args: T
) => string;
declare const styleFieldToCssObject: <T extends MinCallbackArg>(
  styleField: StyleField<T, inferRuntime<T>> | undefined,
  args: T
) => CSSPropertiesEsque<inferRuntime<T>>;
declare const contentFieldToContent: <T extends MinCallbackArg>(
  contentField: ContentField<T, inferRuntime<T>> | undefined,
  arg: T
) => ElementEsque<inferRuntime<T>> | null | undefined;

type UploadFilesOptions<TRouter extends FileRouter> = {
  [TEndpoint in keyof TRouter]: {
    endpoint: TEndpoint;
    onUploadProgress?: ({
      file,
      progress,
    }: {
      file: string;
      progress: number;
    }) => void;
    onUploadBegin?: ({ file }: { file: string }) => void;
    input?: inferEndpointInput<TRouter[TEndpoint]>;
    files: File[];
  };
}[keyof TRouter];
type UploadFileResponse = {
  /**
   * @deprecated
   * use `name` instead
   */
  fileName: string;
  name: string;
  /**
   * @deprecated
   * use `size` instead
   */
  fileSize: number;
  size: number;
  /**
   * @deprecated
   * use `key` instead
   */
  fileKey: string;
  key: string;
  /**
   * @deprecated
   * use `url` instead
   */
  fileUrl: string;
  url: string;
};
declare const DANGEROUS__uploadFiles: <TRouter extends FileRouter>(
  opts: UploadFilesOptions<TRouter>,
  config?: {
    url?: string;
  }
) => Promise<UploadFileResponse[]>;
declare const genUploader: <TRouter extends FileRouter>() => (
  opts: UploadFilesOptions<TRouter>,
  config?: {
    url?: string;
  }
) => Promise<UploadFileResponse[]>;
declare const classNames: (...classes: (string | boolean)[]) => string;
declare const generateMimeTypes: (fileTypes: string[]) => string[] | undefined;
declare const generateClientDropzoneAccept: (fileTypes: string[]) =>
  | {
      [k: string]: never[];
    }
  | undefined;

export {
  ContentField,
  DANGEROUS__uploadFiles,
  INTERNAL_doFormatting,
  StyleField,
  UploadFileResponse,
  allowedContentTextLabelGenerator,
  capitalizeStart,
  classNames,
  contentFieldToContent,
  genUploader,
  generateClientDropzoneAccept,
  generateMimeTypes,
  generatePermittedFileTypes,
  styleFieldToClassName,
  styleFieldToCssObject,
};
