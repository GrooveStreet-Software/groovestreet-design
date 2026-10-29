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
  /** Public path or absolute URL of the standalone preview document. */
  file: string;
  /** Public path of the thumbnail shown in the grids. */
  image: string;
}

export const samplePreviews: SamplePreview[] = [
  {
    key: "brutalist",
    messageKey: "hotel",
    file: "https://hotel-groovestreet-live.netlify.app/",
    image: "/samples-shots/hotel.jpg",
  },
  {
    key: "feane",
    messageKey: "feane",
    file: "/samples/feane-real.html",
    image: "/samples-shots/feane.jpg",
  },
  {
    key: "sarab",
    messageKey: "sarab",
    file: "/samples/sarab-real.html",
    image: "/samples-shots/sarab.jpg",
  },
  {
    key: "minimal",
    messageKey: "saaspro",
    file: "/samples/saaspro-real.html",
    image: "/samples-shots/saaspro.jpg",
  },
  {
    key: "contrast",
    messageKey: "tech",
    file: "/samples/tech-real.html",
    image: "/samples-shots/tech.jpg",
  },
  {
    key: "dakatal",
    messageKey: "dakatal",
    file: "/samples/dakatal-real.html",
    image: "/samples-shots/dakatal.jpg",
  },
];


export const getSampleByKey = (key: string) =>
  samplePreviews.find((sample) => sample.key === key);
