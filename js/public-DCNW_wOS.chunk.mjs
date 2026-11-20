import { f as e } from "./NcActionRouter-Ca-mCYkz.chunk.mjs";
// node_modules/@nextcloud/sharing/dist/public.js
function t() {
	return e("files_sharing", "isPublic", null) ?? document.querySelector("input#isPublic[type=\"hidden\"][name=\"isPublic\"][value=\"1\"]") !== null;
}
function n() {
	return e("files_sharing", "sharingToken", null) ?? document.querySelector("input#sharingToken[type=\"hidden\"]")?.value ?? null;
}
export { t as n, n as t };
