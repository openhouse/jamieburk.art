export function allLayoutBPhotoApprovalsOpen(photos) {
  return Array.isArray(photos) &&
    photos.length === 6 &&
    photos.every((photo) => photo.productionApproval === "open");
}
