export interface ReferenceSlide {
  /** Path to the image */
  image: string;
  /** Optional overlay caption displayed at the bottom-right corner.
   *  Use a string array for multiple lines. */
  caption?: string | string[];
}
