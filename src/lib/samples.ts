/**
 * Single source of truth for the template previews.
 *
 * The homepage grid, the /samples page and the smoke tests all read from here,
 * so a preview can never be linked to a file that does not exist.
 */
export interface SamplePreview {
  /** Matches the `work.projects.<key>` message key. */
  key: string;
  /** Matches the `samples.items.<key>` message key. */
  messageKey: string;
  /** Public path of the standalone preview document. */
  file: string;
  /** Public path of the thumbnail shown in the grids. */
  image: string;
}

export const samplePreviews: SamplePreview[] = [
  {
    key: "brutalist",
    messageKey: "hotel",
    file: "/samples/hotel-real.html",
    image: "/hotel-assets/banner.jpg",
  },
  {
    key: "monochrome",
    messageKey: "juicy",
    file: "/samples/juicy-real.html",
    image: "/juicy-assets/images/can/lemon.webp",
  },
  {
    key: "minimal",
    messageKey: "saaspro",
    file: "/samples/saaspro-real.html",
    image: "/saaspro-assets/banner.webp",
  },
  {
    key: "contrast",
    messageKey: "tech",
    file: "/samples/tech-real.html",
    image: "/tech-assets/banner.webp",
  },
];

export const getSampleByKey = (key: string) =>
  samplePreviews.find((sample) => sample.key === key);
