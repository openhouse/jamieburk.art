"""Read-only artifact checks; requires pypdf. Does not grant visual approval.

Usage: python inspect-native-pdf.py MARKDOWN PDF APPROVED_IMAGE_SHA256
The approved hash is pypdf's decoded image-file bytes, not a private locator.
"""
import hashlib
import json
import re
import sys
import unicodedata
from pathlib import Path
from pypdf import PdfReader

markdown_path, pdf_path, approved_hash = sys.argv[1:]
markdown = Path(markdown_path).read_text()
reader = PdfReader(pdf_path)
links = set(re.findall(r"\]\(([^)]+)\)", markdown))
plain = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", markdown)
plain = re.sub(r"^#+ ", "", plain, flags=re.M).replace("**", "")
normalize = lambda text: re.sub(r"\s+", "", unicodedata.normalize("NFKC", text))
actual_links = set()
image_hashes = []
for page in reader.pages:
    for image in page.images:
        image_hashes.append(hashlib.sha256(image.data).hexdigest())
    for annotation in page.get("/Annots", []):
        action = annotation.get_object().get("/A", {})
        if "/URI" in action:
            actual_links.add(str(action["/URI"]))
checks = {
    "oneLetterPage": len(reader.pages) == 1 and list(reader.pages[0].mediabox) == [0, 0, 612, 792],
    "textMatchesMarkdown": normalize(plain) == normalize("\n".join(p.extract_text() for p in reader.pages)),
    "linksMatchMarkdown": actual_links == links,
    "onlyApprovedSignatureImage": image_hashes == [approved_hash],
    "nativeRenderer": "Google Docs Renderer" in str(reader.metadata.get("/Producer", "")),
    "underUploadLimit": Path(pdf_path).stat().st_size <= 10_000_000,
}
print(json.dumps({"pdf": Path(pdf_path).name, "checks": checks, "pass": all(checks.values())}))
sys.exit(0 if all(checks.values()) else 1)
