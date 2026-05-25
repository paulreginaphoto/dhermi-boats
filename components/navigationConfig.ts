export const navKeyByLabel: Record<string, string> = {
  Tours: "nav.tours",
  Photos: "nav.photos",
  Private: "nav.private",
  Destinations: "nav.destinations",
  FAQ: "nav.faq",
  Contact: "nav.contact"
};

export const navActivePathsByLabel: Record<string, string[]> = {
  Tours: ["/tours/", "/gjipe-boat-tour/", "/grama-bay-boat-tour/"],
  Photos: ["/boat-photos/"],
  Private: ["/private-boat-tour-albania/", "/sunset-boat-tour/", "/morning-fishing-tour/"],
  Destinations: ["/destinations/*"],
  FAQ: ["/faq/"],
  Contact: ["/contact/"]
};
