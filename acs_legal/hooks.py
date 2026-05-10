app_name = "acs_legal"
app_title = "ACS Legal"
app_publisher = "Yemen Frappe"
app_description = "Premium legal website for ACS Legal"
app_email = "info@yemenfrappe.com"
app_license = "mit"
app_icon = "octicon octicon-law"
app_version = "0.1.0"
app_website = "https://acslegal.sa"

website_route_rules = [
    {"from_route": "/", "to_route": "acs-legal"},
    {"from_route": "/en", "to_route": "acs-legal"},
    {"from_route": "/services", "to_route": "acs-legal"},
    {"from_route": "/services/<path:slug>", "to_route": "acs-legal"},
    {"from_route": "/articles", "to_route": "acs-legal"},
    {"from_route": "/articles/<path:slug>", "to_route": "acs-legal"},
    {"from_route": "/contact", "to_route": "acs-legal"},
]

website_path_resolver = "acs_legal.renderer.resolve_path"

page_renderer = [
    "acs_legal.renderer.ACSLegalRenderer",
]
