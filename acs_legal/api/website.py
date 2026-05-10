import json

import frappe


SERVICES = [
    {
        "slug": "litigation-arbitration",
        "title_ar": "الترافع والوساطة والتحكيم",
        "title_en": "Litigation, Mediation and Arbitration",
        "summary_ar": "تمثيل قانوني متكامل أمام المحاكم والهيئات القضائية مع حلول سريعة للنزاعات عبر الوساطة والتحكيم.",
        "summary_en": "Integrated legal representation before courts and judicial bodies, with dispute resolution through mediation and arbitration.",
        "points_ar": [
            "التمثيل أمام جميع المحاكم بمختلف درجات التقاضي",
            "إعداد المذكرات واللوائح الاعتراضية والطعون",
            "التحكيم والوساطة وتسوية المطالبات المالية",
        ],
        "icon": "scale",
    },
    {
        "slug": "contracts-advisory",
        "title_ar": "صياغة العقود والدراسات والاستشارات",
        "title_en": "Contracts, Studies and Advisory",
        "summary_ar": "صياغة ومراجعة العقود والاتفاقيات وتقديم استشارات قانونية متخصصة ودراسات قانونية شاملة.",
        "summary_en": "Drafting and reviewing contracts and agreements with specialized advisory and legal studies.",
        "points_ar": [
            "صياغة ومراجعة العقود والاتفاقيات",
            "إعداد الدراسات والتقارير القانونية",
            "تقييم الالتزامات التعاقدية وآثار النزاعات",
        ],
        "icon": "file-text",
    },
    {
        "slug": "corporate-legal-support",
        "title_ar": "الدعم القانوني المؤسسي",
        "title_en": "Corporate Legal Support",
        "summary_ar": "دعم قانوني لمجالس الإدارات والإدارة التنفيذية والسياسات الداخلية والحوكمة والامتثال.",
        "summary_en": "Legal support for boards, executive teams, internal policies, governance and compliance.",
        "points_ar": [
            "استشارات قانونية للإدارة التنفيذية ومجالس الإدارات",
            "إعداد ومراجعة اللوائح والسياسات الداخلية",
            "دعم شؤون الموظفين والعقود العمالية",
        ],
        "icon": "building-2",
    },
    {
        "slug": "business-setup",
        "title_ar": "تأسيس الشركات ودعم الأعمال",
        "title_en": "Business Setup and Growth",
        "summary_ar": "تأسيس الشركات واستخراج التراخيص وهيكلة الأعمال ودعم الشركات الناشئة والنمو النظامي.",
        "summary_en": "Company formation, licensing, legal structuring and startup support.",
        "points_ar": [
            "تأسيس الشركات بمختلف أنواعها",
            "استخراج التراخيص النظامية",
            "إعداد عقود التأسيس واتفاقيات الشركاء",
        ],
        "icon": "briefcase-business",
    },
    {
        "slug": "foreign-investment",
        "title_ar": "الاستثمار الأجنبي والإقامة المميزة",
        "title_en": "Foreign Investment and Premium Residency",
        "summary_ar": "دعم المستثمرين الأجانب في التراخيص وتأسيس الكيانات التجارية والتملك والإقامة المميزة.",
        "summary_en": "Supporting foreign investors with licensing, entity setup, ownership and premium residency.",
        "points_ar": [
            "استخراج تراخيص الاستثمار الأجنبي",
            "تأسيس الكيانات التجارية",
            "التقديم في برامج الإقامة المميزة",
        ],
        "icon": "landmark",
    },
    {
        "slug": "intellectual-property",
        "title_ar": "الملكية الفكرية",
        "title_en": "Intellectual Property",
        "summary_ar": "تسجيل وحماية العلامات التجارية وبراءات الاختراع وحقوق المؤلف وتمثيل منازعات الملكية الفكرية.",
        "summary_en": "Trademark, patent and copyright protection with IP dispute representation.",
        "points_ar": [
            "تسجيل العلامات التجارية وحمايتها",
            "تسجيل براءات الاختراع والنماذج الصناعية",
            "تمثيل العملاء في منازعات الملكية الفكرية",
        ],
        "icon": "badge-check",
    },
    {
        "slug": "sports-law",
        "title_ar": "القانون الرياضي",
        "title_en": "Sports Law",
        "summary_ar": "صياغة العقود الرياضية وتمثيل الرياضيين والأندية وتسوية النزاعات الرياضية محلياً ودولياً.",
        "summary_en": "Sports contracts, athlete and club representation, and local/international dispute resolution.",
        "points_ar": [
            "صياغة ومراجعة العقود الرياضية",
            "تمثيل الرياضيين والأندية والوكلاء",
            "التحكيم وتسوية النزاعات الرياضية",
        ],
        "icon": "trophy",
    },
    {
        "slug": "tax-foreign-companies",
        "title_ar": "الخدمات الضريبية للشركات الأجنبية",
        "title_en": "Tax Services for Foreign Companies",
        "summary_ar": "تمثيل نظامي أمام هيئة الزكاة والضريبة والجمارك وتقييم المخاطر والهياكل الضريبية.",
        "summary_en": "Representation before ZATCA and legal support for tax risks and cross-border structures.",
        "points_ar": [
            "التمثيل أمام هيئة الزكاة والضريبة والجمارك",
            "تقييم المخاطر والهياكل الضريبية",
            "دعم المعاملات العابرة للحدود",
        ],
        "icon": "receipt-text",
    },
    {
        "slug": "legal-tech",
        "title_ar": "الخدمات القانونية التقنية",
        "title_en": "Legal Tech",
        "summary_ar": "تنظيم الأعمال التقنية وأتمتة الذكاء الاصطناعي وحوكمة الأنظمة والبيانات وإدارة المخاطر.",
        "summary_en": "Legal support for technology, AI automation, data governance and digital transformation risks.",
        "points_ar": [
            "تنظيم الأعمال التقنية واتفاقيات الشركات التقنية",
            "حوكمة الأنظمة والبيانات",
            "إدارة المخاطر القانونية للمشاريع التقنية",
        ],
        "icon": "cpu",
    },
]


ARTICLES = [
    {
        "slug": "investing-in-saudi-arabia",
        "title_ar": "دليل المستثمر الأجنبي لدخول السوق السعودي",
        "excerpt_ar": "نقاط نظامية أساسية قبل تأسيس الكيان التجاري والحصول على التراخيص.",
        "category_ar": "استثمار أجنبي",
        "published_on": "2026-01-15",
        "reading_time": 5,
    },
    {
        "slug": "contract-risk-review",
        "title_ar": "كيف تقرأ مخاطر العقد قبل التوقيع؟",
        "excerpt_ar": "مؤشرات عملية تساعد الإدارة على فهم الالتزامات والمسؤوليات.",
        "category_ar": "عقود",
        "published_on": "2026-02-02",
        "reading_time": 4,
    },
    {
        "slug": "governance-for-growing-businesses",
        "title_ar": "الحوكمة للشركات النامية: من أين تبدأ؟",
        "excerpt_ar": "خطوات مختصرة لبناء سياسات داخلية تحمي الشركة وتسرع القرار.",
        "category_ar": "حوكمة",
        "published_on": "2026-03-10",
        "reading_time": 6,
    },
]


def _settings():
    return {
        "brand_ar": "شركة معايير الامتثال المتقدمة",
        "brand_en": "ACS Legal",
        "tagline_ar": "حلول قانونية متكاملة للأعمال والاستثمار",
        "tagline_en": "Integrated legal solutions for business and investment",
        "email": "info@acslegal.sa",
        "phone": "+966 53 750 0382",
        "whatsapp": "+966537500382",
        "location_ar": "المملكة العربية السعودية",
        "domain": "https://acslegal.sa",
    }


@frappe.whitelist(allow_guest=True)
def get_site_data():
    return {
        "settings": _settings(),
        "services": SERVICES,
        "articles": ARTICLES,
        "stats": [
            {"label_ar": "منهجية قانونية", "value": "360"},
            {"label_ar": "مجالات خدمة", "value": "9"},
            {"label_ar": "استجابة أولية", "value": "24h"},
        ],
    }


@frappe.whitelist(allow_guest=True)
def submit_contact(data=None):
    payload = json.loads(data or "{}") if isinstance(data, str) else (data or {})
    full_name = (payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip()
    phone = (payload.get("phone") or "").strip()
    message = (payload.get("message") or "").strip()
    service = (payload.get("service") or "").strip()

    if not full_name or not phone:
        return {"success": False, "error": "الاسم ورقم الجوال مطلوبان"}

    if frappe.db.exists("DocType", "Lead"):
        lead = frappe.get_doc({
            "doctype": "Lead",
            "lead_name": full_name,
            "email_id": email,
            "mobile_no": phone,
            "source": "Website",
            "notes": f"Service: {service}\n\n{message}",
        })
        lead.insert(ignore_permissions=True)
    else:
        frappe.get_doc({
            "doctype": "Communication",
            "communication_type": "Communication",
            "communication_medium": "Website",
            "subject": f"ACS Legal inquiry from {full_name}",
            "content": f"Phone: {phone}<br>Email: {email}<br>Service: {service}<br><br>{message}",
            "sent_or_received": "Received",
        }).insert(ignore_permissions=True)

    frappe.db.commit()
    return {"success": True}
