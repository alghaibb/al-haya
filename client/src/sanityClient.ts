import { createClient } from "@sanity/client"

export default createClient({
  projectId: "ysf3fo80",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: true
});