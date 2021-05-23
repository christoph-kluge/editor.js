/**
 * Tool onPaste configuration object
 */
export interface PasteConfig {
  /**
   * Array of tags Tool can substitute
   * @type string[]
   */
  tags?: string[];

  /**
   * Object of string patterns Tool can substitute.
   * Key is your internal key and value is RegExp
   *
   * @type {{[key: string]: Regexp}}
   */
  patterns?: {[key: string]: RegExp};

  /**
   * Object of string patterns this Tool can substitute for the whole "paste"
   * Key is your internal key and the should be a RegExp-Object
   *
   * @type {{[key: string]: Regexp}}
   */
  plainPatterns?: {[key: string]: RegExp};

  /**
   * Object with arrays of extensions and MIME types Tool can substitute
   */
  files?: {extensions?: string[], mimeTypes?: string[]};
}
