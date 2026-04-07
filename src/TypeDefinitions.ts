export interface ReferenceSlide {
  /** Path to the image */
  image: string;
  /** Optional name of the person (displayed as a heading above the caption). */
  personName?: string;
  /** Optional text displayed below the person name.
   *  Use a string array for multiple lines. */
  text?: string | string[];
}
