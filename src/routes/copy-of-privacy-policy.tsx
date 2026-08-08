import { createFileRoute } from "@tanstack/react-router";
import { legacyRedirect } from "@/lib/legacy-redirect";

// Legacy Wix URL — Wix auto-generates a "copy-of-<slug>" URL whenever a page
// is duplicated in the editor, and this one was never renamed before the
// site was migrated off Wix. Permanently redirects to the real page so
// Google drops the 404 and transfers any ranking signal instead.
export const Route = createFileRoute("/copy-of-privacy-policy")(legacyRedirect("/privacy-policy"));
