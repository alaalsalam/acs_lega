from pathlib import Path

import frappe
from werkzeug.wrappers import Response


APP_DIR = Path(frappe.get_app_path("acs_legal"))
FRONTEND_INDEX = APP_DIR / "public" / "frontend" / "index.html"
STATIC_SHELL = APP_DIR / "www" / "acs-legal.html"

RESERVED_PREFIXES = {
    "api",
    "app",
    "assets",
    "files",
    "login",
    "logout",
    "private",
    "website_script.js",
    "website_theme.css",
}

SPA_PREFIXES = {"", "acs-legal", "en", "services", "articles", "contact"}


def resolve_path(path):
    clean_path = (path or "").strip("/")
    first_segment = clean_path.split("/", 1)[0] if clean_path else ""

    if first_segment in RESERVED_PREFIXES:
        return clean_path
    if first_segment in SPA_PREFIXES:
        return "acs-legal"
    return clean_path


class ACSLegalRenderer:
    def __init__(self, path=None, http_status_code=None):
        self.path = (path or "").strip("/")
        self.http_status_code = http_status_code or 200

    def can_render(self):
        return self.path == "acs-legal" or self.path.startswith("acs-legal/")

    def render(self):
        source = FRONTEND_INDEX if FRONTEND_INDEX.exists() else STATIC_SHELL
        html = source.read_text(encoding="utf-8")
        return Response(html, status=self.http_status_code, content_type="text/html; charset=utf-8")
