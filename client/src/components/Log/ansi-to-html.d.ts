interface params {
  fg?: string;
  bg?: string;
  newline?: boolean;
  escapeXML?: boolean;
  stream?: boolean;
  colors?: string[] | {
    [code: number]: string;
  };
}

declare module 'ansi-to-html' {
  class Convert {
    constructor(params: params)
    toHtml: (input: any) => string;
  }
  
  export = Convert;
}